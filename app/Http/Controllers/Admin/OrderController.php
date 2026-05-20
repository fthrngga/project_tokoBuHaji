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
        $order->load(['items.product.images', 'items.variant', 'items.returns', 'messages.user', 'user']);

        return Inertia::render('Admin/Order/Show', [
            'order' => $order
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $statusHierarchy = [
            'negotiation' => 1,
            'awaiting_payment' => 2,
            'processing' => 3,
            'completed' => 4,
            'cancelled' => 5,
        ];

        $currentStatusLevel = $statusHierarchy[$order->status];
        $newStatusLevel = $statusHierarchy[$request->status];

        // 1. Cegah perubahan jika status sudah 'completed' atau 'cancelled'
        if ($currentStatusLevel >= 4) {
            return back()->withErrors(['status' => 'Pesanan yang sudah selesai atau dibatalkan tidak dapat diubah lagi.']);
        }

        // 2. Cegah kembali ke status sebelumnya
        if ($newStatusLevel < $currentStatusLevel) {
            return back()->withErrors(['status' => 'Tidak dapat mengembalikan status ke tahap sebelumnya.']);
        }

        // 3. Validasi input
        $request->validate([
            'status' => 'required|string',
            'shipping_cost' => 'nullable|numeric',
            'cancel_reason' => 'required_if:status,cancelled|string|nullable',
        ]);

        // 4. Update data order
        $order->update([
            'status' => $request->status,
            'shipping_cost' => $request->shipping_cost ?? $order->shipping_cost,
        ]);

        // 5. Jika dibatalkan, kirim pesan otomatis ke chat
        if ($request->status === 'cancelled' && $request->cancel_reason) {
            $order->messages()->create([
                'user_id' => auth()->id(),
                'message' => "🛑 PESANAN DIBATALKAN OLEH ADMIN. Alasan: " . $request->cancel_reason,
            ]);
        }

        return back()->with('success', 'Status pesanan berhasil diperbarui.');
    }
}
