<?php

namespace App\Http\Controllers\Features\Order;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderMessageController extends Controller
{
    public function store(Request $request, \App\Models\Features\Order\Order $order)
    {
        // Ensure user owns the order or is admin
        if ($order->user_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $order->messages()->create([
            'user_id' => auth()->id(),
            'message' => $request->message,
            'is_read' => false,
        ]);

        return back(); // Inertia will handle the reload
    }
}
