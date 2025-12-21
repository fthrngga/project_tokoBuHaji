<?php

use App\Features\Finance\FinanceController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin/finance')->name('finance.')->group(function () {
    Route::get('/credit-monitoring', [FinanceController::class, 'creditMonitoring'])->name('payment-monitoring');
    Route::put('/payment/{id}/terms', [FinanceController::class, 'updateCreditTerms'])->name('payment.terms.update');
    Route::put('/payment/{id}/verify', [FinanceController::class, 'verifyCashPayment'])->name('payment.verify');
    Route::put('/payment-log/{id}/verify', [FinanceController::class, 'verifyPaymentLog'])->name('payment-log.verify');
    Route::get('/installments', [FinanceController::class, 'installmentPayment'])->name('payment.manual');
    Route::post('/installments', [FinanceController::class, 'storeInstallment'])->name('payment.store-installment');
    Route::get('/reports', [FinanceController::class, 'reports'])->name('reports');
});
