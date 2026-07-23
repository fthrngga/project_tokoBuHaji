<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$transactions = \DB::table('financial_transactions')
    ->where('category', 'restock')
    ->get();

foreach ($transactions as $txn) {
    $restock = \DB::table('restock_requests')->where('id', $txn->related_id)->first();
    if ($restock && $restock->requested_quantity > 0) {
        $unitPrice = $txn->amount / $restock->requested_quantity;
        $product = \DB::table('products')->where('id', $restock->product_id)->first();
        $variant = $restock->product_variant_id ? \DB::table('product_variants')->where('id', $restock->product_variant_id)->first() : null;
        
        echo "Txn Amount: {$txn->amount} | Qty: {$restock->requested_quantity} | Unit Price: {$unitPrice}\n";
        if ($variant) {
            echo "=> Variant ID: {$variant->id} | Name: {$product->name} (Variant) | Current DB Price: {$variant->price}\n";
        } else if ($product) {
            echo "=> Product ID: {$product->id} | Name: {$product->name} | Current DB Price: {$product->price}\n";
        }
        echo "-----------------------\n";
    }
}
