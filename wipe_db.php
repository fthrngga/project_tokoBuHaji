<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

DB::statement('SET FOREIGN_KEY_CHECKS=0;');
DB::table('cart_items')->truncate();
DB::table('order_items')->truncate();
DB::table('financial_transactions')->truncate();
DB::table('payment_logs')->truncate();
DB::table('payments')->truncate();
DB::table('orders')->truncate();
DB::table('product_returns')->truncate();
DB::table('restock_requests')->truncate();
DB::table('product_images')->truncate();
DB::table('product_variants')->truncate();
DB::table('products')->truncate();
DB::statement('SET FOREIGN_KEY_CHECKS=1;');

echo "Database cleaned!\n";
