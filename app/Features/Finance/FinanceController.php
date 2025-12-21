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
            ->get();

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

    public function updateCreditTerms(\Illuminate\Http\Request $request, $id)
    {
        $payment = \App\Models\Payment::findOrFail($id);
        
        $validated = $request->validate([
            'installment_amount' => 'required|numeric|min:0',
            'duration_months' => 'required|integer|min:1',
        ]);

        $payment->update([
            'installment_amount' => $validated['installment_amount'],
            'duration_months' => $validated['duration_months'],
            'status' => 'ongoing',
        ]);

        // Auto-update order status to processing
        $payment->order->update(['status' => 'processing']);

        return back()->with('success', 'Ketentuan kredit berhasil diperbarui dan status pesanan diperbarui menjadi diproses.');
    }

    public function verifyPaymentLog(\Illuminate\Http\Request $request, $id)
    {
        $log = \App\Models\PaymentLog::with('payment.order')->findOrFail($id);
        
        $validated = $request->validate([
            'action' => 'required|in:accept,reject',
        ]);

        if ($validated['action'] === 'accept') {
            $log->update([
                'status' => 'verified',
                'paid_at' => now(),
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



    public function installmentPayment()
    {
        // Fetch customers with active credits (payment_method = credit)
        // We need the Payment ID to attach the log to.
        // Let's get Payments directly, filtered by credit.
        $activeCredits = \App\Models\Payment::with(['customer.user', 'order'])
            ->where('payment_method', 'credit')
            ->whereIn('status', ['ongoing', 'pending_approval']) // Adjust status as needed
            ->get()
            ->map(function ($credit) {
                return [
                    'id' => $credit->id, // Payment ID
                    'customer_name' => $credit->customer->user->name,
                    'customer_address' => $credit->order->address_detail ?? 'Alamat tidak tersedia',
                    'total_installments' => $credit->duration_months,
                    'current_installment' => $credit->installments_paid + 1,
                    'remaining_months' => max(0, $credit->duration_months - $credit->installments_paid),
                    'installment_amount' => $credit->installment_amount,
                ];
            });

        return Inertia::render('Features/Finance/InstallmentPayment', [
            'customers' => $activeCredits,
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
            'months_paid' => 'required|integer|min:1', // New field
            'payment_date' => 'required|date',
            'payment_method' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $payment = \App\Models\Payment::findOrFail($validated['payment_id']);

        // 1. Create Payment Log (Verified)
        // Note: installment_number tracks the STARTING installment of this batch
        $log = $payment->paymentLogs()->create([
            'type' => 'installment',
            'installment_number' => $payment->installments_paid + 1,
            'amount' => $validated['amount'],
            'proof_path' => null,
            'status' => 'verified',
            'paid_at' => $validated['payment_date'],
            'admin_notes' => $validated['notes'] . ($validated['months_paid'] > 1 ? " (Bayar {$validated['months_paid']} Bulan)" : ""),
        ]);

        // 2. Update Payment Status / Counter based on how many months paid
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

    public function reports()
    {
        return \Inertia\Inertia::render('Features/Finance/Reports');
    }
}
