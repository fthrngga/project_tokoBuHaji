<?php

namespace App\Features\Product;

use App\Http\Controllers\Controller;
use App\Features\Product\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Menampilkan halaman produk berdasarkan kategori.
     */
    public function show(string $slug)
    {
        $category = Category::query()
            ->where('slug', $slug)
            ->firstOrFail();

        $products = $category->products()
            ->where('is_published', true)
            ->with(['images', 'category'])
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Features/Category/Show', [
            'category' => $category,
            'products' => $products,
        ]);
    }
}
