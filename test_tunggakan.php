<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$payment = \App\Models\Payment::with(['order.items.product', 'paymentLogs'])->where('id', 5)->first();
$monthsElapsed = min($payment->duration_months, $payment->created_at->diffInMonths(now()));
$expectedTotal = $monthsElapsed * $payment->installment_amount;
$actualVerifiedAmount = $payment->paymentLogs->where('type', 'installment')->where('status', 'verified')->sum('amount');
$tunggakan = max(0, $expectedTotal - $actualVerifiedAmount);
$tunggakan_months = $payment->installment_amount > 0 ? floor($tunggakan / $payment->installment_amount) : 0;

dump([
    'installment_amount' => $payment->installment_amount,
    'monthsElapsed' => $monthsElapsed,
    'expectedTotal' => $expectedTotal,
    'actualVerifiedAmount' => $actualVerifiedAmount,
    'tunggakan' => $tunggakan,
    'tunggakan_months' => $tunggakan_months,
]);
