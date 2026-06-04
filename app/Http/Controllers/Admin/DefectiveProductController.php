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
        $defectiveProducts = DefectiveProduct::with(['product', 'variant', 'source.order'])
            ->latest()
            ->get();

        $customers = \App\Features\Customer\Customer::with('user')->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'name' => $c->user->name,
                'phone_number' => $c->phone_number,
            ];
        });

        return Inertia::render('Admin/DefectiveProduct/Index', [
            'defectiveProducts' => $defectiveProducts,
            'customers' => $customers
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

    public function sellRepossessed(Request $request, DefectiveProduct $defectiveProduct)
    {
        $request->validate([
            'buyer_id' => 'required|exists:customers,id',
            'sale_type' => 'required|in:cash,continue_credit,new_credit',
            'agreed_price' => 'nullable|numeric|min:0',
            'down_payment' => 'nullable|numeric|min:0',
            'installment_amount' => 'nullable|numeric|min:0',
            'duration_months' => 'nullable|integer|min:1',
        ]);

        if ($defectiveProduct->status === 'sold') {
            return back()->with('error', 'Barang ini sudah terjual.');
        }

        $customer = \App\Features\Customer\Customer::with('user')->findOrFail($request->buyer_id);

        \Illuminate\Support\Facades\DB::transaction(function () use ($request, $defectiveProduct, $customer) {
            // Create Order
            $order = \App\Models\Features\Order\Order::create([
                'user_id' => $customer->user_id,
                'status' => 'completed',
                'total_amount' => $request->sale_type === 'cash' ? ($request->agreed_price ?? 0) : 0,
                'province' => 'N/A',
                'city' => 'N/A',
                'district' => 'N/A',
                'village' => 'N/A',
                'address_detail' => 'Pembelian Barang Tarikan (Offline/Toko)',
            ]);

            \App\Models\Features\Order\OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $defectiveProduct->product_id,
                'product_variant_id' => $defectiveProduct->product_variant_id,
                'quantity' => $defectiveProduct->quantity,
                'price' => 0, 
            ]);

            if ($request->sale_type === 'cash') {
                $order->update(['status' => 'completed']);
                
                \App\Models\FinancialTransaction::create([
                    'type' => 'income',
                    'category' => 'sale',
                    'amount' => $request->agreed_price ?? 0,
                    'description' => "Penjualan Barang Tarikan (Cash) - Order #{$order->id}",
                    'payment_method' => 'cash',
                ]);
                
            } elseif ($request->sale_type === 'continue_credit') {
                $oldPayment = \App\Models\Payment::findOrFail($defectiveProduct->source_id);
                $remainingMonths = max(0, $oldPayment->duration_months - ($oldPayment->installments_paid ?? 0));
                
                $order->update([
                    'status' => 'completed',
                    'total_amount' => $oldPayment->installment_amount * $remainingMonths
                ]);

                \App\Models\Payment::create([
                    'order_id' => $order->id,
                    'customer_id' => $customer->id,
                    'payment_method' => 'credit',
                    'down_payment' => 0,
                    'installment_amount' => $oldPayment->installment_amount,
                    'duration_months' => $remainingMonths,
                    'status' => 'ongoing',
                    'installments_paid' => 0,
                ]);

            } elseif ($request->sale_type === 'new_credit') {
                $order->update([
                    'status' => 'completed',
                    'total_amount' => ($request->down_payment ?? 0) + (($request->installment_amount ?? 0) * ($request->duration_months ?? 1))
                ]);

                $payment = \App\Models\Payment::create([
                    'order_id' => $order->id,
                    'customer_id' => $customer->id,
                    'payment_method' => 'credit',
                    'down_payment' => $request->down_payment ?? 0,
                    'installment_amount' => $request->installment_amount ?? 0,
                    'duration_months' => $request->duration_months ?? 1,
                    'status' => 'ongoing',
                    'installments_paid' => 0,
                ]);

                if (($request->down_payment ?? 0) > 0) {
                    \App\Models\FinancialTransaction::create([
                        'type' => 'income',
                        'category' => 'down_payment',
                        'amount' => $request->down_payment,
                        'description' => "DP Penjualan Barang Tarikan (Kredit Baru) - Order #{$order->id}",
                        'payment_method' => 'cash',
                        'related_type' => \App\Models\Payment::class,
                        'related_id' => $payment->id,
                    ]);
                }
            }

            $saleMethod = $request->sale_type === 'cash' ? 'Cash' : ($request->sale_type === 'continue_credit' ? 'Lanjutkan Kredit' : 'Kredit Baru');
            $newNotes = $defectiveProduct->notes . " | Terjual ke: {$customer->name} (Order #{$order->id}) via {$saleMethod}";
            $defectiveProduct->update(['status' => 'sold', 'notes' => $newNotes]);
        });

        return back()->with('success', 'Barang tarikan berhasil dijual kembali.');
    }
}
