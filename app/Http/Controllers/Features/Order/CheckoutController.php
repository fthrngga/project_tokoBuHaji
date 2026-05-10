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
            ->with(['product.images'])
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Tidak ada item yang dipilih untuk checkout.');
        }

        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
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
            ->with('product')
            ->get(); // Should add check for user ownership here ideally

        $totalAmount = $cartItems->sum(fn($item) => $item->quantity * $item->product->price);

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
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);
            }

            // Delete cart items
            \App\Features\Cart\CartItem::destroy($ids);

            return $order;
        });

        return redirect()->route('orders.show', $order);
    }
}
