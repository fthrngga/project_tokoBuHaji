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

    Route::resource('admin/returns', \App\Http\Controllers\Admin\ProductReturnController::class)
        ->only(['index', 'update'])
        ->names('admin.returns');

    Route::resource('admin/defective-products', \App\Http\Controllers\Admin\DefectiveProductController::class)
        ->only(['index', 'update'])
        ->names('admin.defective_products');
    
    Route::post('admin/defective-products/{defectiveProduct}/sell', [\App\Http\Controllers\Admin\DefectiveProductController::class, 'sellRepossessed'])
        ->name('admin.defective_products.sell');
});

Route::middleware(['auth', 'verified', 'role:customer'])->group(function () {
    Route::get('/profil-saya', function () {
        $user = auth()->user();
        $customer = \App\Features\Customer\Customer::where('user_id', $user->id)->first();
        $addresses = \App\Models\Address::where('user_id', $user->id)->get();
        
        return Inertia::render('Customer/Profile', [
            'customer' => $customer,
            'addresses' => $addresses,
            'mustVerifyEmail' => $user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail(),
            'status' => session('status'),
        ]);
    })->name('profile');


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::get('/track', [\App\Http\Controllers\TrackOrderController::class, 'index'])->name('track.index');
Route::post('/track', [\App\Http\Controllers\TrackOrderController::class, 'search'])->name('track.search');

Route::middleware('auth')->group(function () {
    Route::post('/notifications/mark-all-read', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifications.markAllRead');
    Route::get('/notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
});

foreach (glob(base_path('routes/features/*.php')) as $route) {
    require $route;
}
