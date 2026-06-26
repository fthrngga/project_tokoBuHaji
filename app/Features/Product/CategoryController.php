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
            ->with(['children', 'parent'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Ambil ID kategori ini dan semua anak-anaknya (sub-kategori)
        $categoryIds = $category->children->pluck('id')->push($category->id);

        $products = Product::query()
            ->whereIn('category_id', $categoryIds)
            ->where('is_published', true)
            ->with(['images', 'category', 'variants'])
            ->latest()
            ->paginate(12)
            ->withQueryString();

        // Jika ini adalah subkategori, kita mungkin ingin menampilkan anak dari parentnya
        $siblings = [];
        if ($category->parent_id) {
            $siblings = Category::where('parent_id', $category->parent_id)->get();
        }

        return Inertia::render('Features/Category/Show', [
            'category' => $category,
            'products' => $products,
            'siblings' => $siblings,
        ]);
    }
}
