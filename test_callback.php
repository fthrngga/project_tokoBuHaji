<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$log = \App\Models\PaymentLog::find(31); 
$controller = app(\App\Http\Controllers\Features\Finance\PaymentCallbackController::class); 
$reflection = new \ReflectionMethod($controller, 'recordFinancialTransaction'); 
$reflection->setAccessible(true); 
try {
    $reflection->invoke($controller, $log); 
    echo 'done';
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage();
}
