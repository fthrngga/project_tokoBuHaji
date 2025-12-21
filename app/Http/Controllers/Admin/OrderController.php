<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Features\Order\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user')->latest()->get();
        return Inertia::render('Admin/Order/Index', [
            'orders' => $orders
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['items.product.images', 'messages.user', 'user']);

        return Inertia::render('Admin/Order/Show', [
            'order' => $order
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'shipping_cost' => 'nullable|numeric|min:0',
            'status' => 'required|string|in:pending,negotiation,awaiting_payment,processing,completed,cancelled',
        ]);

        $data = $request->only('status');

        if ($request->has('shipping_cost')) {
            $shippingCost = $request->shipping_cost;
            $itemsTotal = $order->items->sum(fn($item) => $item->quantity * $item->price);

            $data['shipping_cost'] = $shippingCost;
            $data['total_amount'] = $itemsTotal + $shippingCost;
        }

        $order->update($data);

        return back();
    }
}
