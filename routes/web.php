<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WelcomeController;

use Inertia\Inertia;

Route::get('/', WelcomeController::class)->name('home');

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('dashboard', [WelcomeController::class, 'dashboard'])->name('dashboard');

    Route::resource('admin/orders', \App\Http\Controllers\Admin\OrderController::class)->names('admin.orders');
    
    Route::get('admin/pos', [\App\Http\Controllers\Admin\POSController::class, 'index'])->name('admin.pos.index');
    Route::post('admin/pos', [\App\Http\Controllers\Admin\POSController::class, 'store'])->name('admin.pos.store');
});

Route::middleware(['auth', 'verified', 'role:customer'])->group(function () {
    Route::get('/profil-saya', function () {
        return Inertia::render('Customer/Profile');
    })->name('profile');


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

foreach (glob(base_path('routes/features/*.php')) as $route) {
    require $route;
}
