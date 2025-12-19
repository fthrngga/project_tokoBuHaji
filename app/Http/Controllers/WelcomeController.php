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
            ->with('images', 'category') // Eager load gambar pertama untuk efisiensi
            ->latest() // Ambil yang terbaru
            ->take(4)   // Batasi hanya 4 produk
            ->get();

        // Kirim data produk unggulan ke komponen React 'Welcome.tsx'
        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
        ]);
    }
}

