<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('data-warehouse')->name('datawarehouse.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('DataWarehouse/Index');
    })->name('index');
});
