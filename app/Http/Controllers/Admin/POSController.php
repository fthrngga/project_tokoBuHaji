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
            'payment_method' => 'required|string', // cash, transfer
            'amount_paid' => 'required|numeric|min:0',
        ]);

        return DB::transaction(function () use ($request) {
            $userId = $request->customer_id;
            
            // Handle Walk-in Customer
            if (!$userId) {
                // Find or create walk-in generic user if we don't want to spam users table,
                // but since order requires user_id, let's create a specific walk-in user account if it doesn't exist.
                // Or even better, create a new user for this new customer.
                // Let's create a new generic user for walk-ins if it doesn't exist
                $walkInEmail = 'walkin_' . time() . '@haji-elektronik.local';
                $user = User::create([
                    'name' => $request->customer_name,
                    'email' => $walkInEmail,
                    'password' => bcrypt(str()->random(16)),
                    'role' => 'customer'
                ]);
                
                Customer::create([
                    'user_id' => $user->id,
                    'phone_number' => $request->customer_phone ?? '-',
                    'address' => 'Pembelian di Toko',
                    'city' => 'Toko',
                    'province' => 'Toko'
                ]);

                $userId = $user->id;
            }

            // Calculate total and prepare items
            $totalAmount = 0;
            $orderItemsData = [];
            foreach ($request->items as $item) {
                $product = Product::lockForUpdate()->findOrFail($item['id']);
                
                if ($product->stock < $item['quantity']) {
                    return back()->withErrors(['error' => "Stok tidak mencukupi untuk {$product->name}"]);
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

            // Create Order
            $order = Order::create([
                'user_id' => $userId,
                'status' => 'completed', // Direct purchase is completed immediately
                'total_amount' => $totalAmount,
                'province' => 'Toko',
                'city' => 'Toko',
                'district' => 'Toko',
                'village' => 'Toko',
                'address_detail' => 'Pembelian Langsung (POS)',
                'notes' => 'Kasir: ' . auth()->user()->name,
            ]);

            // Create Order Items
            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            // Create Payment record for the cash purchase
            $payment = Payment::create([
                'order_id' => $order->id,
                'customer_id' => $userId, 
                'payment_method' => 'cash',
                'cash_type' => $request->payment_method, // tunai / transfer
                'down_payment' => 0,
                'installment_amount' => 0,
                'duration_months' => 0,
                'status' => 'paid_off', // Immediately paid off
                'proof_of_payment_path' => null, // POS maybe no proof needed
                'installments_paid' => 0,
            ]);
            
            // Add initial payment log
            $payment->paymentLogs()->create([
                'type' => 'down_payment', // Use down_payment to mean immediate full payment or we can just use down_payment
                'amount' => $totalAmount,
                'status' => 'verified', // Automatically verified
            ]);

            return redirect()->route('admin.pos.index')->with('success', 'Transaksi berhasil disimpan!');
        });
    }
}
