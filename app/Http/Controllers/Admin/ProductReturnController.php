<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Features\Order\ProductReturn;
use Inertia\Inertia;

class ProductReturnController extends Controller
{
    public function index()
    {
        $returns = ProductReturn::with(['order', 'orderItem.product', 'user'])
            ->latest()
            ->get();

        return Inertia::render('Admin/Return/Index', [
            'returns' => $returns
        ]);
    }

    public function update(Request $request, ProductReturn $return)
    {
        $request->validate([
            'status' => 'required|in:processing,completed,rejected',
        ]);

        $return->update([
            'status' => $request->status
        ]);

        $statusText = match ($request->status) {
            'processing' => 'SEDANG DIPROSES',
            'completed' => 'SELESAI (Diganti)',
            'rejected' => 'DITOLAK',
            default => strtoupper($request->status)
        };

        // Kirim notifikasi chat otomatis ke order messages
        $return->order->messages()->create([
            'user_id' => auth()->id(),
            'message' => "ℹ️ [Admin] Status Pengajuan Return untuk barang " . $return->orderItem->product->name . " diperbarui menjadi: " . $statusText,
        ]);

        return back()->with('success', 'Status pengembalian berhasil diperbarui.');
    }
}
