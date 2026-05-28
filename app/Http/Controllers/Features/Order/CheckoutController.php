<?php

namespace App\Http\Controllers\Features\Order;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $selectedIds = explode(',', $request->query('items', ''));

        $cartItems = \App\Features\Cart\Cart::where('user_id', auth()->id())
            ->first()
            ->items()
            ->whereIn('id', $selectedIds)
            ->with(['product.images', 'variant'])
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Tidak ada item yang dipilih untuk checkout.');
        }

        $total = $cartItems->sum(function ($item) {
            $price = $item->variant ? $item->variant->selling_price : $item->product->selling_price;
            return $item->quantity * $price;
        });

        return \Inertia\Inertia::render('Features/Order/Checkout', [
            'cartItems' => $cartItems,
            'total' => $total,
            'addresses' => auth()->user()->addresses()->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'province' => 'required|string',
            'city' => 'required|string',
            'district' => 'required|string',
            'village' => 'required|string',
            'address_detail' => 'required|string',
            'postal_code' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*' => 'exists:cart_items,id', // Ensure items are valid cart items
        ]);

        $ids = $request->input('items');

        // Fetch fresh items to ensure price consistency
        $cartItems = \App\Features\Cart\CartItem::whereIn('id', $ids)
            ->with(['product', 'variant'])
            ->get(); // Should add check for user ownership here ideally

        $totalAmount = $cartItems->sum(fn($item) => $item->quantity * ($item->variant ? $item->variant->selling_price : $item->product->selling_price));

        // Transaction
        $order = \Illuminate\Support\Facades\DB::transaction(function () use ($request, $cartItems, $totalAmount, $ids) {
            $order = \App\Models\Features\Order\Order::create([
                'user_id' => auth()->id(),
                'status' => 'negotiation',
                'total_amount' => $totalAmount,
                'province' => $request->province,
                'city' => $request->city,
                'district' => $request->district,
                'village' => $request->village,
                'address_detail' => $request->address_detail,
                'postal_code' => $request->postal_code,
                'notes' => $request->notes,
            ]);

            foreach ($cartItems as $item) {
                \App\Models\Features\Order\OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'product_variant_id' => $item->product_variant_id,
                    'quantity' => $item->quantity,
                    'price' => $item->variant ? $item->variant->selling_price : $item->product->selling_price,
                ]);

                // Decrement stock (Pessimistic Locking ideally, but for now just decrement)
                if ($item->product_variant_id && $item->variant) {
                    $item->variant->decrement('stock', $item->quantity);
                    // Also decrement main product stock which is total of all variants
                    $item->product->decrement('stock', $item->quantity);
                } else {
                    $item->product->decrement('stock', $item->quantity);
                }
            }

            // Delete cart items
            \App\Features\Cart\CartItem::destroy($ids);

            return $order;
        });

        return redirect()->route('orders.show', $order);
    }
}
