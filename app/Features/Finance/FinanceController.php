<?php

namespace App\Features\Finance;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function creditMonitoring()
    {
        $credits = \App\Models\Payment::with(['order', 'customer.user', 'order.items.product', 'paymentLogs'])
            ->where('payment_method', 'credit')
            ->latest()
            ->get()
            ->map(function ($credit) {
                // Kalkulasi Tunggakan Waktu Nyata berdasarkan umur kredit (Bulan)
                $monthsElapsed = min($credit->duration_months, $credit->created_at->diffInMonths(now()));
                
                // Pada bulan 0, ekspektasi bayar = 0 (karena baru DP)
                $expectedTotal = $monthsElapsed * $credit->installment_amount;
                $actualVerified = $credit->paymentLogs->where('type', 'installment')->where('status', 'verified')->sum('amount');
                
                $tunggakan_amount = max(0, $expectedTotal - $actualVerified);
                $tunggakan_months = $credit->installment_amount > 0 ? floor($tunggakan_amount / $credit->installment_amount) : 0;
                
                $credit->tunggakan_amount = $tunggakan_amount;
                $credit->tunggakan_months = $tunggakan_months;
                $credit->is_kritis = $tunggakan_months >= 3;
                
                return $credit;
            });

        $cashPayments = \App\Models\Payment::with(['order', 'customer.user', 'order.items.product'])
            ->where('payment_method', 'cash')
            ->latest()
            ->get();

        return Inertia::render('Features/Finance/PaymentMonitoring', [
            'credits' => $credits,
            'cashPayments' => $cashPayments,
            'pageParams' => [
                'title' => 'Monitoring Pembayaran',
            ]
        ]);
    }

    public function arrearsMonitoring()
    {
        $credits = \App\Models\Payment::with(['order', 'customer.user', 'order.items.product', 'paymentLogs'])
            ->where('payment_method', 'credit')
            ->where('status', 'ongoing')
            ->latest()
            ->get()
            ->map(function ($credit) {
                // Kalkulasi Tunggakan Waktu Nyata berdasarkan umur kredit (Bulan)
                $monthsElapsed = min($credit->duration_months, $credit->created_at->diffInMonths(now()));
                
                $expectedTotal = $monthsElapsed * $credit->installment_amount;
                $actualVerified = $credit->paymentLogs->where('type', 'installment')->where('status', 'verified')->sum('amount');
                
                $tunggakan_amount = max(0, $expectedTotal - $actualVerified);
                $tunggakan_months = $credit->installment_amount > 0 ? floor($tunggakan_amount / $credit->installment_amount) : 0;
                
                $credit->tunggakan_amount = $tunggakan_amount;
                $credit->tunggakan_months = $tunggakan_months;
                $credit->is_kritis = $tunggakan_months >= 3;
                
                return $credit;
            })
            // Only return those with tunggakan
            ->filter(function ($credit) {
                return $credit->tunggakan_months > 0;
            })
            ->values();

        return Inertia::render('Features/Finance/ArrearsMonitoring', [
            'credits' => $credits,
            'pageParams' => [
                'title' => 'Monitoring Tunggakan',
            ]
        ]);
    }

    public function updateCreditTerms(\Illuminate\Http\Request $request, $id)
    {
        $payment = \App\Models\Payment::with('order')->findOrFail($id);

        // Auto Calculate Installment Amount with Fixed 10 Months
        $orderTotal = $payment->order->total_amount;
        $totalCredit = $orderTotal * 1.5;
        $remainingCredit = max(0, $totalCredit - $payment->down_payment);
        
        $durationMonths = 10;
        $installmentAmount = $remainingCredit / $durationMonths;

        $payment->update([
            'installment_amount' => $installmentAmount,
            'duration_months' => $durationMonths,
            'status' => 'ongoing',
        ]);

        // Auto-update order status to processing
        $payment->order->update(['status' => 'processing']);

        return back()->with('success', 'Ketentuan kredit berhasil diperbarui dan status pesanan diperbarui menjadi diproses.');
    }

    public function pelunasanDini(\Illuminate\Http\Request $request, $id)
    {
        $payment = \App\Models\Payment::findOrFail($id);

        if ($payment->status !== 'ongoing') {
            return back()->with('error', 'Kredit tidak dalam status berjalan.');
        }

        $remainingMonths = $payment->duration_months - ($payment->installments_paid ?? 0);
        
        if ($remainingMonths <= 0) {
            return back()->with('error', 'Kredit ini sudah lunas.');
        }

        $remainingDebt = $remainingMonths * $payment->installment_amount;

        \Illuminate\Support\Facades\DB::transaction(function () use ($payment, $remainingMonths, $remainingDebt) {
            // 1. Buat log pembayaran diverifikasi
            \App\Models\PaymentLog::create([
                'payment_id' => $payment->id,
                'type' => 'installment',
                'installment_number' => ($payment->installments_paid ?? 0) + 1, // Anggap sebagai angsuran gabungan terakhir
                'amount' => $remainingDebt,
                'status' => 'verified',
                'paid_at' => now(),
            ]);

            // 2. Catat pemasukan di laporan keuangan
            \App\Models\FinancialTransaction::create([
                'type' => 'income',
                'category' => 'installment',
                'amount' => $remainingDebt,
                'description' => 'Pelunasan Dini Kredit - Order #' . $payment->order_id . ' (Sisa ' . $remainingMonths . ' bln)',
                'transaction_date' => now(),
                'related_type' => 'App\Models\Payment',
                'related_id' => $payment->id,
            ]);

            // 3. Update status pembayaran menjadi lunas
            $payment->update([
                'installments_paid' => $payment->duration_months,
                'status' => 'paid_off',
            ]);
            
            // 4. Update status order menjadi completed jika perlu
            $payment->order->update(['status' => 'completed']);
        });

        return back()->with('success', 'Pelunasan dini berhasil diproses. Nominal Rp ' . number_format($remainingDebt, 0, ',', '.') . ' telah tercatat di Laporan Keuangan.');
    }

    public function verifyPaymentLog(\Illuminate\Http\Request $request, $id)
    {
        $log = \App\Models\PaymentLog::with('payment.order')->findOrFail($id);
        
        $validated = $request->validate([
            'action' => 'required|in:accept,reject',
            'actual_amount' => 'nullable|numeric|min:0',
        ]);

        if ($validated['action'] === 'accept') {
            $log->update([
                'status' => 'verified',
                'paid_at' => now(),
                'amount' => $validated['actual_amount'] ?? $log->amount,
            ]);

            // Logic to update main Payment status/counters
            $payment = $log->payment;

            if ($log->type === 'down_payment') {
                // DP verified.
                // Status remains 'ongoing' (set during terms update), OR if it was pending DP...
                // Actually status is set to 'ongoing' when Admin updates terms.
                // So here we don't strictly change status unless we want to track 'dp_paid'?
                // But installments_paid remains 0.
            } elseif ($log->type === 'installment') {
                // Installment verified.
                $payment->increment('installments_paid');
                
                // If paid == duration, mark as paid_off
                if ($payment->installments_paid >= $payment->duration_months) {
                    $payment->update(['status' => 'paid_off']);
                }
            }

            // AUTO-LOG to Financial Transactions
            \App\Models\FinancialTransaction::create([
                'transaction_date' => now(),
                'type' => 'income',
                'category' => $log->type, // 'down_payment' or 'installment'
                'amount' => $log->amount,
                'description' => "Pembayaran " . str_replace('_', ' ', $log->type) . " (Order #{$payment->order_id})",
                'payment_method' => 'transfer', // Assumed transfer for proof uploads
                'related_id' => $log->id,
                'related_type' => \App\Models\PaymentLog::class,
            ]);

            $message = 'Pembayaran berhasil diverifikasi.';
            $type = 'success';
        } else {
            $log->update(['status' => 'rejected']);
            $message = 'Pembayaran ditolak.';
            $type = 'error';
        }

        return back()->with($type, $message);
    }

    public function verifyCashPayment(\Illuminate\Http\Request $request, $id)
    {
        $payment = \App\Models\Payment::findOrFail($id);
        
        $validated = $request->validate([
            'action' => 'required|in:accept,reject',
        ]);

        if ($validated['action'] === 'accept') {
            $payment->update(['status' => 'paid_off']);
            $payment->order->update(['status' => 'processing']);

            // AUTO-LOG to Financial Transactions (Cash Sale)
            \App\Models\FinancialTransaction::create([
                'transaction_date' => now(),
                'type' => 'income',
                'category' => 'cash_sale',
                'amount' => $payment->order->total_amount,
                'description' => "Penjualan Cash (Order #{$payment->order_id})",
                'payment_method' => $payment->cash_type ?? 'cash', // 'cash' or 'transfer' if stored
                'related_id' => $payment->id,
                'related_type' => \App\Models\Payment::class,
            ]);

            $message = 'Pembayaran berhasil diverifikasi. Pesanan diproses.';
            $type = 'success';
        } else {
            $payment->update(['status' => 'rejected']);
            // Should we cancel order or just reject payment? 
            // Usually if payment rejected, order might go back to awaiting_payment or cancelled.
            // For now let's just update credit status. Order status remains awaiting_payment.
            $message = 'Pembayaran ditolak.';
            $type = 'error'; // Flash message type
        }

        return back()->with($type, $message);
    }



    public function installmentPayment(\Illuminate\Http\Request $request)
    {
        // Filter Date (Default Today)
        $date = $request->input('date', now()->format('Y-m-d'));

        $activeCredits = \App\Models\Payment::with(['customer.user', 'order', 'paymentLogs'])
            ->where('payment_method', 'credit')
            ->whereIn('status', ['ongoing', 'pending_approval']) 
            ->get()
            ->map(function ($credit) {
                $expectedTotal = $credit->installments_paid * $credit->installment_amount;
                $actualVerified = $credit->paymentLogs->where('type', 'installment')->where('status', 'verified')->sum('amount');
                $tunggakan = max(0, $expectedTotal - $actualVerified);

                return [
                    'id' => $credit->id, // Payment ID
                    'customer_name' => $credit->customer->user->name,
                    'customer_address' => $credit->order->address_detail ?? 'Alamat tidak tersedia',
                    'total_installments' => $credit->duration_months,
                    'current_installment' => $credit->installments_paid + 1,
                    'remaining_months' => max(0, $credit->duration_months - $credit->installments_paid),
                    'installment_amount' => $credit->installment_amount,
                    'tunggakan' => $tunggakan,
                ];
            });

        // 2. Fetch Daily Logs
        $history = \App\Models\PaymentLog::with(['payment.customer.user'])
            ->where('type', 'installment')
            ->where('status', 'verified')
            ->whereDate('paid_at', $date)
            ->latest('paid_at')
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'created_at' => $log->created_at->format('H:i'), 
                    'paid_at' => $log->paid_at->format('H:i'), 
                    'customer_name' => $log->payment->customer->user->name ?? 'Unknown',
                    'installment_number' => $log->installment_number,
                    'amount' => $log->amount,
                    'notes' => $log->admin_notes,
                    'months_paid' => $log->months_paid, 
                ];
            });

        return Inertia::render('Features/Finance/InstallmentPayment', [
            'customers' => $activeCredits,
            'history' => $history,
            'filters' => [
                'date' => $date
            ],
            'pageParams' => [
                'title' => 'Input Pembayaran Angsuran',
            ]
        ]);
    }

    public function storeInstallment(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'payment_id' => 'required|exists:payments,id',
            'amount' => 'required|numeric|min:0',
            'months_paid' => 'required|integer|min:1',
            'payment_date' => 'required|date',
            'payment_method' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $payment = \App\Models\Payment::findOrFail($validated['payment_id']);

        // 1. Create Payment Log (Verified)
        $log = $payment->paymentLogs()->create([
            'type' => 'installment',
            'installment_number' => $payment->installments_paid + 1,
            'amount' => $validated['amount'],
            'proof_path' => null,
            'status' => 'verified',
            'paid_at' => $validated['payment_date'],
            'months_paid' => $validated['months_paid'],
            'admin_notes' => $validated['notes'],
        ]);

        // 2. Update Payment Status / Counter
        $payment->increment('installments_paid', $validated['months_paid']);
        
        if ($payment->installments_paid >= $payment->duration_months) {
            $payment->update(['status' => 'paid_off']);
        }

        // 3. Auto-Log Financial Transaction
        \App\Models\FinancialTransaction::create([
            'transaction_date' => $validated['payment_date'],
            'type' => 'income',
            'category' => 'installment',
            'amount' => $validated['amount'],
            'description' => "Pembayaran Angsuran Manual (Order #{$payment->order_id}) - " . ($validated['notes'] ?? ''),
            'payment_method' => $validated['payment_method'],
            'related_id' => $log->id,
            'related_type' => \App\Models\PaymentLog::class,
        ]);

        return back()->with('success', 'Pembayaran angsuran berhasil disimpan.');
    }

    public function reports(\Illuminate\Http\Request $request)
    {
        // 1. Get Filters
        $startDate = $request->input('start_date', now()->startOfMonth()->format('Y-m-d'));
        $endDate = $request->input('end_date', now()->endOfMonth()->format('Y-m-d'));
        $category = $request->input('category', 'all');

        // 2. Base Query
        $query = \App\Models\FinancialTransaction::query()
            ->whereBetween('transaction_date', [$startDate, $endDate]);

        if ($category !== 'all') {
            $query->where('category', $category);
        }

        // 3. Clone query for summary to avoid resetting bindings if we just get()
        // Actually, better to run separate aggregations or use the same base if simple.
        
        // Income
        $totalIncome = (clone $query)->where('type', 'income')->sum('amount');
        
        // Expense
        $totalExpense = (clone $query)->where('type', 'expense')->sum('amount');
        
        // Net Profit
        $netProfit = $totalIncome - $totalExpense;

        // 4. Get Transactions List
        $transactions = $query->latest('transaction_date')
            ->latest('created_at')
            ->get()
            ->map(function ($t) {
                return [
                    'id' => $t->id,
                    'date' => $t->transaction_date->format('d M Y'),
                    'desc' => $t->description,
                    'category' => ucfirst($t->category),
                    'type' => ucfirst($t->type), // Income/Expense
                    'amount' => $t->amount,
                    'original_type' => $t->type, // For color coding
                ];
            });

        return \Inertia\Inertia::render('Features/Finance/Reports', [
            'summary' => [
                'income' => $totalIncome,
                'expense' => $totalExpense,
                'profit' => $netProfit,
            ],
            'transactions' => $transactions,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'category' => $category,
            ]
        ]);
    }

    public function storeExpense(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => 'required|date',
            'category' => 'required|in:operational,salary,other',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            'description' => 'required|string',
        ]);

        \App\Models\FinancialTransaction::create([
            'transaction_date' => $validated['transaction_date'],
            'type' => 'expense',
            'category' => $validated['category'],
            'amount' => $validated['amount'],
            'description' => $validated['description'],
            'payment_method' => $validated['payment_method'],
        ]);

        return back()->with('success', 'Pengeluaran berhasil dicatat ke dalam Laporan Keuangan.');
    }

    public function restockApproval()
    {
        $requests = \App\Models\RestockRequest::with(['product.category', 'user'])
            ->latest()
            ->get();
            
        return Inertia::render('Features/Finance/RestockApproval', [
            'restockRequests' => $requests
        ]);
    }

    public function approveRestock(\Illuminate\Http\Request $request, \App\Models\RestockRequest $restockRequest)
    {
        if ($restockRequest->status !== 'pending') return back();

        $restockRequest->update(['status' => 'approved']);
        $restockRequest->product->increment('stock', $restockRequest->requested_quantity);
        
        return back()->with('success', 'Restock disetujui, stok produk otomatis bertambah!');
    }

    public function rejectRestock(\Illuminate\Http\Request $request, \App\Models\RestockRequest $restockRequest)
    {
        if ($restockRequest->status !== 'pending') return back();
        
        $restockRequest->update(['status' => 'rejected']);
        return back()->with('success', 'Permintaan restock ditolak.');
    }
}
