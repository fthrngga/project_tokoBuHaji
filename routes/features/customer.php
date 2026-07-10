<?php

use Illuminate\Support\Facades\Route;
use App\Features\Customer\CustomerController;

Route::resource('customers', CustomerController::class)->middleware(['auth', 'verified', 'role:admin']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/installments', [\App\Http\Controllers\Features\Customer\InstallmentController::class, 'index'])->name('customer.installments.index');
    Route::get('/installments/receipt/{id}', [\App\Http\Controllers\Features\Customer\InstallmentController::class, 'downloadReceipt'])->name('customer.installments.receipt');
});
