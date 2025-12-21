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
        $cart = Cart::with(['items.product.images', 'items.product.category'])
            ->where('user_id', Auth::id())
            ->first();

        // Format items untuk frontend jika cart ada
        $items = $cart ? $cart->items : collect([]);

        // Hitung total harga
        $total = $items->sum(function ($item) {
            return $item->quantity * $item->product->price;
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
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        // Cari atau buat keranjang untuk user
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $product = Product::findOrFail($request->product_id);

        // Cek stok produk
        if ($product->stock < $request->quantity) {
            return redirect()->back()->withErrors(['quantity' => 'Stok produk tidak mencukupi']);
        }

        // Cek apakah item sudah ada di keranjang
        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            // Jika ada, tambahkan quantity
            $newQuantity = $cartItem->quantity + $request->quantity;
            if ($newQuantity > $product->stock) {
                return redirect()->back()->withErrors(['quantity' => 'Total stok produk tidak mencukupi']);
            }
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            // Jika belum ada, buat item baru
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
            ]);
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
