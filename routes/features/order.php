<?php

use App\Http\Controllers\Features\Order\CheckoutController;
use App\Http\Controllers\Features\Order\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::resource('orders', OrderController::class)->only(['index', 'show']);
    Route::post('/orders/{order}/messages', [App\Http\Controllers\Features\Order\OrderMessageController::class, 'store'])->name('orders.messages.store');
    Route::post('/orders/{order}/payment', [OrderController::class, 'storePayment'])->name('orders.payment.store');
    Route::post('/orders/{order}/payment/proof', [OrderController::class, 'uploadProof'])->name('orders.payment.proof');
    Route::post('/orders/{order}/payment/snap', [OrderController::class, 'generateSnapToken'])->name('orders.payment.snap');

    Route::post('/orders/{order}/returns', [\App\Http\Controllers\Features\Order\ProductReturnController::class, 'store'])->name('orders.returns.store');
});
