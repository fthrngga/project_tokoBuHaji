<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Features\Inventory\DefectiveProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DefectiveProductController extends Controller
{
    public function index()
    {
        $defectiveProducts = DefectiveProduct::with(['product', 'variant', 'source'])
            ->latest()
            ->get();

        return Inertia::render('Admin/DefectiveProduct/Index', [
            'defectiveProducts' => $defectiveProducts
        ]);
    }

    public function update(Request $request, DefectiveProduct $defectiveProduct)
    {
        $request->validate([
            'status' => 'required|in:in_warehouse,sent_to_agent,repaired,written_off',
        ]);

        $oldStatus = $defectiveProduct->status;

        $defectiveProduct->update([
            'status' => $request->status
        ]);

        // Jika barang ditandai sebagai 'Selesai Diperbaiki' (repaired) dan sebelumnya bukan repaired
        if ($request->status === 'repaired' && $oldStatus !== 'repaired') {
            // Kembalikan stok ke stok utama
            if ($defectiveProduct->product_variant_id) {
                $defectiveProduct->variant->increment('stock', $defectiveProduct->quantity);
            } else {
                $defectiveProduct->product->increment('stock', $defectiveProduct->quantity);
            }
        }

        return back()->with('success', 'Status barang di Gudang Isolasi berhasil diperbarui.');
    }
}
