<?php

namespace App\Features\Cart;

use App\Http\Controllers\Controller;
use App\Features\Product\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Menampilkan isi keranjang belanja user.
     */
    public function index()
    {
        $cart = Cart::with(['items.product.images', 'items.product.category', 'items.variant'])
            ->where('user_id', Auth::id())
            ->first();

        // Format items untuk frontend jika cart ada
        $items = $cart ? $cart->items : collect([]);

        // Hitung total harga
        $total = $items->sum(function ($item) {
            $price = $item->variant ? $item->variant->selling_price : $item->product->selling_price;
            return $item->quantity * $price;
        });

        return Inertia::render('Features/Cart/Index', [
            'cartItems' => $items,
            'total' => $total,
        ]);
    }

    /**
     * Menambahkan item ke keranjang.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        // Cari atau buat keranjang untuk user
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $product = Product::findOrFail($request->product_id);
        
        // Cek stok (Varian atau Produk Utama)
        $variant = null;
        if ($request->product_variant_id) {
            $variant = $product->variants()->find($request->product_variant_id);
            if (!$variant) {
                return redirect()->back()->withErrors(['product_variant_id' => 'Varian produk tidak valid']);
            }
            // Pre-order diizinkan, jadi jika stok varian < quantity dan == 0, itu pre-order. 
            // Jika stok > 0 tapi < quantity, mungkin tidak valid, namun kita biarkan stok menjadi negatif saat pre-order.
            // Namun, untuk sederhana, mari kita biarkan masuk keranjang berapapun quantity-nya.
        } else {
            if ($product->stock < $request->quantity && $product->stock !== 0) { // Jika 0 dianggap pre-order
                return redirect()->back()->withErrors(['quantity' => 'Stok produk tidak mencukupi']);
            }
        }

        // Cek apakah item sudah ada di keranjang
        $cartItem = $cart->items()
            ->where('product_id', $product->id)
            ->where('product_variant_id', $request->product_variant_id)
            ->first();

        if ($cartItem) {
            // Jika ada, tambahkan quantity
            $newQuantity = $cartItem->quantity + $request->quantity;
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            // Jika belum ada, buat item baru
            $cartItem = $cart->items()->create([
                'product_id' => $product->id,
                'product_variant_id' => $request->product_variant_id,
                'quantity' => $request->quantity,
            ]);
        }

        if ($request->boolean('buy_now')) {
            return redirect()->route('checkout.index', ['items' => $cartItem->id]);
        }

        return redirect()->back()->with('message', 'Produk berhasil ditambahkan ke keranjang.');
    }

    /**
     * Memperbarui jumlah item di keranjang.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::findOrFail($id);

        // Pastikan item milik user yang login
        if ($cartItem->cart->user_id !== Auth::id()) {
            abort(403);
        }

        // Cek stok
        if ($cartItem->product->stock < $request->quantity) {
            return redirect()->back()->with('error', 'Stok tidak mencukupi');
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return redirect()->back();
    }

    /**
     * Menghapus item dari keranjang.
     */
    public function destroy($id)
    {
        $cartItem = CartItem::findOrFail($id);

        if ($cartItem->cart->user_id !== Auth::id()) {
            abort(403);
        }

        $cartItem->delete();

        return redirect()->back()->with('message', 'Item dihapus dari keranjang.');
    }
}
