<?php

namespace App\Http\Controllers\Features\Search;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q');

        // Simpan history pencarian jika user login dan query tidak kosong
        if ($query && auth()->check()) {
            \App\Models\Features\Search\UserSearchHistory::create([
                'user_id' => auth()->id(),
                'query' => $query
            ]);
        }

        $products = [];
        if ($query) {
            $products = \App\Features\Product\Product::with(['category', 'images', 'variants'])
                ->where('name', 'like', "%{$query}%")
                ->orWhere('description', 'like', "%{$query}%")
                ->get();
        }

        return \Inertia\Inertia::render('Features/Search/Index', [
            'results' => $products,
            'query' => $query
        ]);
    }
}
