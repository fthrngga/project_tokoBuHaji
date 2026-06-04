<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Features\Order\Order;
use App\Models\Payment;
use App\Models\PaymentLog;
use App\Models\FinancialTransaction;
use App\Features\Product\Product;
use Illuminate\Support\Facades\DB;
use App\Features\Customer\Customer;

try {
    DB::transaction(function () {
        $userId = null;
        $customerTableId = null;
        
        $walkInEmail = 'walkin_' . time() . '@haji-elektronik.local';
        $user = User::create([
            'name' => 'Walkin Test',
            'email' => $walkInEmail,
            'password' => bcrypt(str()->random(16)),
            'role' => 'customer'
        ]);
        
        $customer = Customer::create([
            'user_id' => $user->id,
            'phone_number' => '-',
            'address' => 'Pembelian di Toko (POS)',
            'city' => 'Pekanbaru',
            'province' => 'Riau'
        ]);

        $userId = $user->id;
        $customerTableId = $customer->id;

        $product = Product::first();
        if (!$product) throw new Exception("No product");

        $totalAmount = $product->selling_price;

        $orderItemsData = [];
        $orderItemsData[] = [
            'product_id' => $product->id,
            'product_variant_id' => null,
            'quantity' => 1,
            'price' => $product->selling_price,
            'subtotal' => $product->selling_price,
        ];

        $order = Order::create([
            'user_id' => $userId,
            'status' => 'completed',
            'total_amount' => $totalAmount,
            'province' => 'Riau',
            'city' => 'Pekanbaru',
            'district' => 'Toko',
            'village' => 'Toko',
            'address_detail' => 'Pembelian Langsung di Toko (Walk-in/POS)',
            'notes' => 'Kasir: Test',
        ]);

        foreach ($orderItemsData as $itemData) {
            $order->items()->create($itemData);
        }

        $payment = Payment::create([
            'order_id' => $order->id,
            'customer_id' => $customerTableId, 
            'payment_method' => 'cash',
            'cash_type' => 'tunai', 
            'down_payment' => $totalAmount, 
            'installment_amount' => 0,
            'duration_months' => 0,
            'status' => 'paid_off', 
            'proof_of_payment_path' => null, 
            'installments_paid' => 0,
        ]);
        
        $paymentLog = $payment->paymentLogs()->create([
            'type' => 'down_payment',
            'amount' => $totalAmount,
            'status' => 'verified', 
        ]);

        FinancialTransaction::create([
            'transaction_date' => now(),
            'type' => 'income',
            'category' => 'cash_sale',
            'amount' => $totalAmount,
            'description' => "Penjualan Langsung POS (Order #{$order->id})",
            'payment_method' => 'tunai',
            'related_id' => $paymentLog->id,
            'related_type' => PaymentLog::class,
        ]);

        echo "Success! Order ID: " . $order->id . "\n";
    });
} catch (\Exception $e) {
    echo "Failed: " . $e->getMessage() . "\n" . $e->getTraceAsString();
}
