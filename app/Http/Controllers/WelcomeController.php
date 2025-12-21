<?php

namespace App\Http\Controllers;

use App\Features\Product\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Menangani request yang masuk untuk halaman utama.
     * Method __invoke() ini akan otomatis dipanggil oleh rute.
     */
    public function __invoke(): Response
    {
        // Ambil 4 produk yang ditandai sebagai 'featured' dan 'published'
        $featuredProducts = Product::query()
            ->where('is_featured', true)
            ->where('is_published', true)
            ->with(['images', 'category'])
            ->latest()
            ->take(4)
            ->get();

        // Logika Produk Rekomendasi
        $recommendedProducts = collect();

        if (auth()->check()) {
            // Cek history pencarian terakhir user
            $lastSearch = \App\Models\Features\Search\UserSearchHistory::where('user_id', auth()->id())
                ->latest()
                ->first();

            if ($lastSearch) {
                // Cari produk berdasarkan query terakhir
                $recommendedProducts = Product::query()
                    ->where('is_published', true)
                    ->where(function ($q) use ($lastSearch) {
                        $q->where('name', 'like', "%{$lastSearch->query}%")
                            ->orWhere('description', 'like', "%{$lastSearch->query}%");
                    })
                    ->with('images', 'category')
                    ->take(4)
                    ->get();
            }
        }

        // Jika tidak ada rekomendasi (guest atau tidak ada history/match), ambil random produk
        if ($recommendedProducts->isEmpty()) {
            $recommendedProducts = Product::query()
                ->where('is_published', true)
                ->inRandomOrder()
                ->with('images', 'category')
                ->take(4)
                ->get();
        }

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
            'recommendedProducts' => $recommendedProducts,
        ]);
    }
}

