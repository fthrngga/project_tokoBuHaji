<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Features\Order\Order;

class TrackOrderController extends Controller
{
    public function index()
    {
        return Inertia::render('TrackOrder');
    }

    public function search(Request $request)
    {
        $request->validate([
            'order_id' => 'required|numeric',
            'phone' => 'required|string',
        ]);

        $orderId = $request->order_id;
        $phone = $request->phone;

        // Cari pesanan berdasarkan ID
        $order = Order::with(['items.product', 'items.variant', 'user.customer'])
            ->where('id', $orderId)
            ->first();

        if (!$order) {
            return back()->withErrors(['order_id' => 'Pesanan tidak ditemukan.']);
        }

        // Cek apakah nomor HP cocok
        $customerPhone = null;
        if ($order->user && $order->user->customer) {
            $customerPhone = $order->user->customer->phone_number;
        }

        // Hapus karakter non-digit untuk perbandingan
        $cleanInputPhone = preg_replace('/[^0-9]/', '', $phone);
        $cleanCustomerPhone = preg_replace('/[^0-9]/', '', $customerPhone ?? '');

        if (!$cleanCustomerPhone || $cleanInputPhone !== $cleanCustomerPhone) {
            return back()->withErrors(['phone' => 'Nomor HP tidak sesuai dengan data pesanan.']);
        }

        return Inertia::render('TrackOrder', [
            'orderData' => $order
        ]);
    }
}
