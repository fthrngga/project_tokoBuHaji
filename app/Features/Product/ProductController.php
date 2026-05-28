<?php

namespace App\Features\Product;

use App\Http\Controllers\Controller;
use App\Features\Product\Category;
use App\Features\Product\ProductImage;
use App\Features\Product\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()->with('category');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($catQuery) use ($search) {
                        $catQuery->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $sortBy = $request->input('sort_by', 'created_at');
        $sortDir = $request->input('sort_dir', 'desc');
        $query->orderBy($sortBy, $sortDir);

        return Inertia::render('Features/Product/Index', [
            'products' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'sort_by', 'sort_dir']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Features/Product/FormPage', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|max:255|unique:products,sku',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'weight' => 'required|integer|min:0',
            'specifications' => 'required|json',
            'is_featured' => 'required|boolean',
            'is_published' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'custom_options' => 'nullable|array',
            'custom_options.*.name' => 'required_with:custom_options|string|max:255',
            'custom_options.*.options' => 'required_with:custom_options|array|min:1',
            'variants' => 'nullable|array',
            'variants.*.id' => 'nullable|exists:product_variants,id',
            'variants.*.sku' => 'nullable|string|max:255',
            'variants.*.price' => 'nullable|numeric|min:0',
            'variants.*.stock' => 'required_with:variants|integer|min:0',
            'variants.*.options' => 'required_with:variants|array',
        ]);

        // Hitung total stok dari varian jika ada
        if (!empty($validated['variants'])) {
            $validated['stock'] = collect($validated['variants'])->sum('stock');
        }

        // Dekode specifications sebelum membuat model
        if (isset($validated['specifications']) && is_string($validated['specifications'])) {
            $validated['specifications'] = json_decode($validated['specifications'], true);
        }

        $product = Product::create($validated + ['slug' => Str::slug($validated['name'])]);

        // Proses unggah gambar jika ada
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('products', 'public');
                $product->images()->create(['image_path' => $path]);
            }
        }

        // Simpan varian jika ada
        if (!empty($validated['variants'])) {
            foreach ($validated['variants'] as $variantData) {
                $product->variants()->create($variantData);
            }
        }

        // Redirect ke halaman index setelah produk berhasil dibuat
        return redirect()->route('products.index')->with('message', 'Produk baru berhasil ditambahkan.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Features/Product/FormPage', [
            'item' => $product->load(['images', 'variants']),
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|max:255|unique:products,sku,' . $product->id,
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'weight' => 'required|integer|min:0',
            'specifications' => 'required|json',
            'is_featured' => 'required|boolean',
            'is_published' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'custom_options' => 'nullable|array',
            'custom_options.*.name' => 'required_with:custom_options|string|max:255',
            'custom_options.*.options' => 'required_with:custom_options|array|min:1',
            'variants' => 'nullable|array',
            'variants.*.id' => 'nullable|exists:product_variants,id',
            'variants.*.sku' => 'nullable|string|max:255',
            'variants.*.price' => 'nullable|numeric|min:0',
            'variants.*.stock' => 'required_with:variants|integer|min:0',
            'variants.*.options' => 'required_with:variants|array',
        ]);

        // Hitung total stok dari varian jika ada
        if (!empty($validated['variants'])) {
            $validated['stock'] = collect($validated['variants'])->sum('stock');
        }

        // Dekode specifications jika itu adalah string JSON (karena casts 'array' di model)
        if (isset($validated['specifications']) && is_string($validated['specifications'])) {
            $validated['specifications'] = json_decode($validated['specifications'], true);
        }

        $product->update($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('products', 'public');
                $product->images()->create(['image_path' => $path]);
            }
        }

        // Sinkronisasi varian
        if (isset($validated['variants'])) {
            $existingVariantIds = [];
            foreach ($validated['variants'] as $variantData) {
                if (!empty($variantData['id'])) {
                    $variant = $product->variants()->find($variantData['id']);
                    if ($variant) {
                        $variant->update($variantData);
                        $existingVariantIds[] = $variant->id;
                    }
                } else {
                    $newVariant = $product->variants()->create($variantData);
                    $existingVariantIds[] = $newVariant->id;
                }
            }
            $product->variants()->whereNotIn('id', $existingVariantIds)->delete();
        } else {
            $product->variants()->delete();
        }

        return redirect()->route('products.index')->with('message', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $product->delete();
        return redirect()->route('products.index')->with('message', 'Produk berhasil dihapus.');
    }

    public function destroyImage(ProductImage $image)
    {
        Storage::disk('public')->delete($image->image_path);
        $image->delete();

        return redirect()->back()->with('message', 'Gambar berhasil dihapus.');
    }

    /**
     * Menampilkan halaman detail produk (Public).
     */
    public function show(string $slug)
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->with(['images', 'category', 'variants'])
            ->firstOrFail();

        return Inertia::render('Features/Product/Show', [
            'product' => $product,
        ]);
    }

    public function requestRestock(\Illuminate\Http\Request $request, Product $product)
    {
        $request->validate([
            'requested_quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string'
        ]);

        \App\Models\RestockRequest::create([
            'product_id' => $product->id,
            'user_id' => auth()->id(),
            'requested_quantity' => $request->requested_quantity,
            'notes' => $request->notes,
            'status' => 'pending'
        ]);

        return back()->with('success', 'Permintaan restock berhasil dikirim ke Finance.');
    }

}

