<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Features\Product\Product;
use App\Models\User;
use App\Features\Customer\Customer;
use App\Models\Features\Order\Order;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class POSController extends Controller
{
    public function index()
    {
        $products = Product::with(['images', 'category', 'variants'])
            ->where('is_published', true)
            ->get();
            
        $customers = User::where('role', 'customer')
            ->with('customer')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->customer ? $user->customer->phone_number : null,
                ];
            });

        return Inertia::render('Admin/POS/Index', [
            'products' => $products,
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'nullable|exists:users,id',
            'customer_name' => 'required_without:customer_id|string|max:255',
            'customer_phone' => 'nullable|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:products,id',
            'items.*.product_variant_id' => 'nullable|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_type' => 'required|in:cash,credit,cash_gantung',
            'payment_method' => 'required|string', 
            'amount_paid' => 'nullable|numeric|min:0',
            'down_payment' => 'nullable|numeric|min:0',
            'duration_months' => 'nullable|integer|min:1',
            'installment_type' => 'nullable|in:fixed,flexible',
        ]);

        // Menggunakan DB::transaction agar jika terjadi error di tengah jalan, 
        // semua perubahan (termasuk potong stok) dibatalkan secara otomatis.
        return DB::transaction(function () use ($request) {
            $userId = $request->customer_id;
            $customerTableId = null; // Menyimpan ID spesifik dari tabel `customers`
            
            // 1. Tangani Data Pelanggan
            if (!$userId) {
                $walkInEmail = 'walkin_' . time() . '@haji-elektronik.local';
                $user = User::create([
                    'name' => $request->customer_name,
                    'email' => $walkInEmail,
                    'password' => bcrypt(str()->random(16)),
                    'role' => 'customer'
                ]);
                
                $customer = Customer::create([
                    'user_id' => $user->id,
                    'phone_number' => $request->customer_phone ?? '-',
                    'address' => 'Pembelian di Toko (POS)',
                    'city' => 'Pekanbaru',
                    'province' => 'Riau'
                ]);

                $userId = $user->id;
                $customerTableId = $customer->id;
            } else {
                // Jika pelanggan lama, cari data 'customer' mereka
                $customerRecord = Customer::where('user_id', $userId)->first();
                $customerTableId = $customerRecord ? $customerRecord->id : null;
            }

            // 2. Kalkulasi Total & Kurangi Stok (Pessimistic Locking)
            $totalAmount = 0;
            $orderItemsData = [];
            $hasPreorder = false;
            
            foreach ($request->items as $item) {
                // lockForUpdate mencegah bentrok (race condition)
                $product = Product::lockForUpdate()->findOrFail($item['id']);
                
                $variant = null;
                $currentStock = 0;
                
                if (!empty($item['product_variant_id'])) {
                    $variant = $product->variants()->lockForUpdate()->find($item['product_variant_id']);
                    if (!$variant) {
                        throw ValidationException::withMessages([
                            'error' => "Varian tidak ditemukan untuk produk '{$product->name}'"
                        ]);
                    }
                    $currentStock = $variant->stock;
                    $variant->decrement('stock', $item['quantity']);
                } else {
                    $currentStock = $product->stock;
                }

                $product->decrement('stock', $item['quantity']);
                
                $preorderQty = max(0, $item['quantity'] - max(0, $currentStock));
                if ($preorderQty > 0) {
                    $hasPreorder = true;
                }

                $price = $variant ? $variant->selling_price : $product->selling_price;
                $subtotal = $price * $item['quantity'];
                $totalAmount += $subtotal;

                $orderItemsData[] = [
                    'product_id' => $product->id,
                    'product_variant_id' => $item['product_variant_id'] ?? null,
                    'quantity' => $item['quantity'],
                    'preorder_quantity' => $preorderQty,
                    'price' => $price,
                    'subtotal' => $subtotal,
                ];
            }

            // 3. Validasi Uang Diterima & Kredit
            if ($request->payment_type === 'cash') {
                if ($request->amount_paid < $totalAmount) {
                    throw ValidationException::withMessages([
                        'error' => "Uang yang diterima (Rp " . number_format($request->amount_paid, 0, ',', '.') . ") kurang dari Total Belanja (Rp " . number_format($totalAmount, 0, ',', '.') . ")."
                    ]);
                }
            } else {
                // Untuk kredit
                $dp = $request->down_payment ?? 0;
                if ($dp < 0) {
                    throw ValidationException::withMessages([
                        'error' => "Uang muka tidak boleh negatif."
                    ]);
                }
            }

            // 4. Buat Order & Detail Items
            $orderStatus = $request->payment_type === 'credit' || $hasPreorder ? 'processing' : 'completed';
            $orderNotes = 'Kasir: ' . auth()->user()->name;
            if ($hasPreorder) {
                $orderNotes .= ' | MENGANDUNG BARANG PRE-ORDER (Menunggu Restok)';
            }

            $order = Order::create([
                'user_id' => $userId,
                'status' => $orderStatus,
                'total_amount' => $request->payment_type === 'credit' ? ($totalAmount * 1.5) : $totalAmount,
                'province' => 'Riau',
                'city' => 'Pekanbaru',
                'district' => 'Toko',
                'village' => 'Toko',
                'address_detail' => 'Pembelian Langsung di Toko (Walk-in/POS)',
                'notes' => $orderNotes,
            ]);

            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            // 5. Simpan Payment (Kredit, Cash, atau Cash Gantung)
            $isCredit = $request->payment_type === 'credit';
            $isCashGantung = $request->payment_type === 'cash_gantung';
            
            $durationMonths = 0;
            $dp = $totalAmount;
            $installmentAmount = 0;
            $installmentType = null;
            $status = 'paid_off';
            
            if ($isCredit) {
                $durationMonths = 10;
                $dp = $request->down_payment ?? 0;
                $totalCredit = $totalAmount * 1.5;
                $installmentAmount = ($totalCredit - $dp) / $durationMonths;
                $status = 'ongoing';
            } elseif ($isCashGantung) {
                $durationMonths = (int) ($request->duration_months ?? 1);
                $dp = $request->down_payment ?? 0;
                $totalGantung = $totalAmount * 1.15;
                $installmentType = $request->installment_type ?? 'fixed';
                
                if ($installmentType === 'fixed') {
                    $installmentAmount = ($totalGantung - $dp) / $durationMonths;
                } else {
                    $installmentAmount = 0; // flexible
                }
                $status = 'ongoing';
            }
            
            $payment = Payment::create([
                'order_id' => $order->id,
                'customer_id' => $customerTableId, 
                'payment_method' => $request->payment_type, // 'cash', 'credit', 'cash_gantung'
                'cash_type' => $request->payment_method, // tunai / transfer / qris
                'installment_type' => $installmentType,
                'down_payment' => $dp,
                'installment_amount' => $installmentAmount,
                'duration_months' => $durationMonths,
                'status' => $status, 
                'proof_of_payment_path' => null, 
                'installments_paid' => 0,
            ]);
            
            // 6. Buat Log Pembayaran & Transaksi Keuangan
            if ($isCredit || $isCashGantung) {
                if ($dp > 0) {
                    $paymentLog = $payment->paymentLogs()->create([
                        'type' => 'down_payment',
                        'amount' => $dp,
                        'status' => 'verified', 
                    ]);

                    \App\Models\FinancialTransaction::create([
                        'transaction_date' => now(),
                        'type' => 'income',
                        'category' => 'down_payment',
                        'amount' => $dp,
                        'description' => "DP Penjualan POS (Order #{$order->id})",
                        'payment_method' => $request->payment_method ?? 'cash',
                        'related_id' => $paymentLog->id,
                        'related_type' => \App\Models\PaymentLog::class,
                    ]);
                }
            } else {
                $paymentLog = $payment->paymentLogs()->create([
                    'type' => 'down_payment', // Walau cash, dicatat sbg initial payment lunas
                    'amount' => $totalAmount,
                    'status' => 'verified', 
                ]);

                \App\Models\FinancialTransaction::create([
                    'transaction_date' => now(),
                    'type' => 'income',
                    'category' => 'cash_sale',
                    'amount' => $totalAmount,
                    'description' => "Penjualan Langsung POS (Order #{$order->id})",
                    'payment_method' => $request->payment_method ?? 'cash',
                    'related_id' => $paymentLog->id,
                    'related_type' => \App\Models\PaymentLog::class,
                ]);
            }

            return redirect()->route('admin.pos.index')->with('success', 'Transaksi berhasil disimpan!');
        });
    }
}