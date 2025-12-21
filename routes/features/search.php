<?php

use App\Http\Controllers\Features\Search\SearchController;
use Illuminate\Support\Facades\Route;

Route::get('/search', [SearchController::class, 'index'])->name('search.index');
