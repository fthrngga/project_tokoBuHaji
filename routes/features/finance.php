<?php

use App\Features\Finance\FinanceController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin/finance')->name('finance.')->group(function () {
    Route::get('/credit-monitoring', [FinanceController::class, 'creditMonitoring'])->name('payment-monitoring');
    Route::get('/arrears-monitoring', [FinanceController::class, 'arrearsMonitoring'])->name('arrears');
    Route::put('/payment/{id}/terms', [FinanceController::class, 'updateCreditTerms'])->name('payment.terms.update');
    Route::put('/payment/{id}/pelunasan-dini', [FinanceController::class, 'pelunasanDini'])->name('payment.pelunasan-dini');
    Route::post('/payment/{id}/tarik', [FinanceController::class, 'tarikBarang'])->name('payment.tarik');
    Route::put('/payment/{id}/verify', [FinanceController::class, 'verifyCashPayment'])->name('payment.verify');
    Route::put('/payment-log/{id}/verify', [FinanceController::class, 'verifyPaymentLog'])->name('payment-log.verify');
    Route::get('/installments', [FinanceController::class, 'installmentPayment'])->name('payment.manual');
    Route::post('/installments', [FinanceController::class, 'storeInstallment'])->name('payment.store-installment');
    Route::get('/reports', [FinanceController::class, 'reports'])->name('reports');
    Route::post('/expenses', [FinanceController::class, 'storeExpense'])->name('expenses.store');
    Route::get('/restock', [FinanceController::class, 'restockApproval'])->name('restock.index');
});

Route::post('/api/midtrans/callback', [\App\Http\Controllers\Features\Finance\PaymentCallbackController::class, 'handleCallback']);

Route::get('/restock-approval', [FinanceController::class, 'restockApproval'])->name('restock-approval');
Route::patch('/restock-approval/{restockRequest}/approve', [FinanceController::class, 'approveRestock'])->name('restock.approve');
Route::patch('/restock-approval/{restockRequest}/reject', [FinanceController::class, 'rejectRestock'])->name('restock.reject');