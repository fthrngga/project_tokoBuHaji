<?php

namespace App\Http\Controllers\Features\Order;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Features\Order\Order;
use App\Models\Features\Order\OrderItem;
use App\Models\Features\Order\ProductReturn;
use Illuminate\Support\Facades\Storage;

class ProductReturnController extends Controller
{
    public function store(Request $request, $orderId)
    {
        $order = Order::where('user_id', auth()->id())->findOrFail($orderId);
        
        // Cek apakah pesanan bisa direturn (misal: harus sudah diproses/selesai)
        // Kita izinkan jika statusnya sudah di atas 'awaiting_payment'
        if (in_array($order->status, ['negotiation', 'awaiting_payment', 'cancelled'])) {
            return back()->withErrors(['message' => 'Pesanan ini belum dapat direturn.']);
        }

        $request->validate([
            'order_item_id' => 'required|exists:order_items,id',
            'reason' => 'required|string|min:10',
            'proof_image' => 'required|image|max:2048', // Diwajibkan
        ]);

        $item = $order->items()->findOrFail($request->order_item_id);

        // Cek apakah sudah pernah direturn dan masih aktif
        $existingReturn = ProductReturn::where('order_item_id', $item->id)
            ->whereIn('status', ['pending', 'processing'])
            ->first();

        if ($existingReturn) {
            return back()->withErrors(['message' => 'Item ini sudah memiliki pengajuan return yang sedang diproses.']);
        }

        $path = null;
        if ($request->hasFile('proof_image')) {
            $path = $request->file('proof_image')->store('returns', 'public');
        }

        ProductReturn::create([
            'order_id' => $order->id,
            'order_item_id' => $item->id,
            'user_id' => auth()->id(),
            'reason' => $request->reason,
            'proof_image_path' => $path,
            'status' => 'pending',
        ]);

        // Kirim notifikasi chat otomatis ke order messages
        $order->messages()->create([
            'user_id' => auth()->id(),
            'message' => "⚠️ [Sistem] Mengajukan pengembalian (Return) untuk barang: " . $item->product->name . ". Alasan: " . $request->reason,
        ]);

        return back()->with('success', 'Pengajuan pengembalian produk berhasil dikirim.');
    }
}
