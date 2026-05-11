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
        $products = Product::with(['images', 'category'])
            ->where('is_published', true)
            ->where('stock', '>', 0)
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
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|string', 
            'amount_paid' => 'required|numeric|min:0',
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
            
            foreach ($request->items as $item) {
                // lockForUpdate mencegah bentrok (race condition) jika ada pembeli online 
                // membeli barang yang sama persis di detik yang sama.
                $product = Product::lockForUpdate()->findOrFail($item['id']);
                
                if ($product->stock < $item['quantity']) {
                    // Wajib melempar Exception agar DB::transaction ter-rollback!
                    throw ValidationException::withMessages([
                        'error' => "Stok tidak mencukupi untuk '{$product->name}'. Sisa stok: {$product->stock}"
                    ]);
                }

                $product->decrement('stock', $item['quantity']);

                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $orderItemsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $subtotal,
                ];
            }

            // 3. Validasi Uang Diterima
            if ($request->amount_paid < $totalAmount) {
                throw ValidationException::withMessages([
                    'error' => "Uang yang diterima (Rp " . number_format($request->amount_paid, 0, ',', '.') . ") kurang dari Total Belanja (Rp " . number_format($totalAmount, 0, ',', '.') . ")."
                ]);
            }

            // 4. Buat Order & Detail Items
            $order = Order::create([
                'user_id' => $userId,
                'status' => 'completed', // Transaksi tunai POS langsung selesai
                'total_amount' => $totalAmount,
                'province' => 'Riau',
                'city' => 'Pekanbaru',
                'district' => 'Toko',
                'village' => 'Toko',
                'address_detail' => 'Pembelian Langsung di Toko (Walk-in/POS)',
                'notes' => 'Kasir: ' . auth()->user()->name,
            ]);

            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            // 5. Catat Pembayaran (Menyelesaikan Error Foreign Key 1452)
            $payment = Payment::create([
                'order_id' => $order->id,
                'customer_id' => $customerTableId, 
                'payment_method' => 'cash',
                'cash_type' => $request->payment_method, // tunai / transfer / qris
                'down_payment' => $totalAmount, // <--- UBAH INI: Set DP sama dengan Total Harga
                'installment_amount' => 0,
                'duration_months' => 0,
                'status' => 'paid_off', 
                'proof_of_payment_path' => null, 
                'installments_paid' => 0,
            ]);
            
            // 6. Buat Log Pembayaran
            $payment->paymentLogs()->create([
                'type' => 'down_payment', // <--- UBAH INI: Gunakan 'down_payment' agar sesuai dengan ENUM database
                'amount' => $totalAmount,
                'status' => 'verified', 
            ]);

            return redirect()->route('admin.pos.index')->with('success', 'Transaksi berhasil disimpan!');
        });
    }
}