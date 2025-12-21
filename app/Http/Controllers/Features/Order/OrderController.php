<?php

namespace App\Http\Controllers\Features\Order;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = \App\Models\Features\Order\Order::where('user_id', auth()->id())
            ->latest()
            ->get();

        return \Inertia\Inertia::render('Features/Order/Index', [
            'orders' => $orders
        ]);
    }

    public function show(string $id)
    {
        $order = \App\Models\Features\Order\Order::where('user_id', auth()->id())
            ->with(['items.product.images', 'messages.user'])
            ->findOrFail($id);

        return \Inertia\Inertia::render('Features/Order/Show', [
            'order' => $order
        ]);
    }
}
