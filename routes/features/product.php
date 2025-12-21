<?php

use Illuminate\Support\Facades\Route;
use App\Features\Product\ProductController;

Route::get('/produk/{slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/kategori/{slug}', [\App\Features\Product\CategoryController::class, 'show'])->name('categories.show');

Route::resource('products', ProductController::class)
    ->middleware(['auth', 'verified', 'role:admin'])
    ->except(['show']);

// Rute untuk menghapus gambar produk
Route::delete('/products/images/{image}', [App\Features\Product\ProductController::class, 'destroyImage'])
    ->name('products.images.destroy');
