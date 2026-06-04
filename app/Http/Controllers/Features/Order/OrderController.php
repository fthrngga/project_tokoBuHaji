<?php

namespace App\Http\Controllers\Features\Order;

use App\Http\Controllers\Controller;
use App\Models\Features\Order\Order;
use App\Models\Features\Product\Product;
use App\Models\Payment;
use App\Models\PaymentLog;
use App\Services\MidtransService;
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
            ->with(['items.product.images', 'items.variant', 'items.returns', 'messages.user', 'payment.paymentLogs'])
            ->findOrFail($id);

        return \Inertia\Inertia::render('Features/Order/Show', [
            'order' => $order
        ]);
    }

    public function storePayment(Request $request, string $id)
    {
        $order = \App\Models\Features\Order\Order::where('user_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'payment_method' => 'required|in:cash,credit,cash_gantung',
            'cash_type' => 'nullable|required_if:payment_method,cash|in:transfer,direct',
            'down_payment' => 'nullable|numeric|min:0',
        ]);

        if (in_array($validated['payment_method'], ['credit', 'cash_gantung']) && $order->total_amount < 1000000) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'payment_method' => 'Minimal total belanja untuk metode kredit atau cash gantung adalah Rp 1.000.000'
            ]);
        }

        // Auto Calculate Credit Terms
        $status = 'ongoing';
        $durationMonths = null;
        $installmentAmount = null;

        if ($validated['payment_method'] === 'credit') {
            $durationMonths = 10;
            $dp = $validated['down_payment'] ?? 0;
            $totalCredit = $order->total_amount * 1.5;
            $installmentAmount = ($totalCredit - $dp) / $durationMonths;
        } elseif ($validated['payment_method'] === 'cash_gantung') {
            $durationMonths = 10;
            $dp = $validated['down_payment'] ?? 0;
            $installmentAmount = ($order->total_amount - $dp) / $durationMonths;
        }

        $payment = \App\Models\Payment::create([
            'order_id' => $order->id,
            'customer_id' => auth()->user()->customer->id,
            'payment_method' => $validated['payment_method'],
            'cash_type' => $validated['cash_type'] ?? null,
            'down_payment' => $validated['down_payment'] ?? 0,
            'duration_months' => $durationMonths,
            'installment_amount' => $installmentAmount,
            'status' => $status,
        ]);

        if ($validated['payment_method'] === 'cash' && $validated['cash_type'] === 'direct') {
            $order->update(['status' => 'processing']);
        }

        return back()->with('success', 'Metode pembayaran berhasil disimpan.');
    }

    public function uploadProof(Request $request, string $id)
    {
        \Illuminate\Support\Facades\Log::info('Upload Proof hit for Order ID: ' . $id);

        $order = \App\Models\Features\Order\Order::where('user_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'proof_of_payment' => 'required|image|max:2048', // Max 2MB
            'months_paid' => 'nullable|integer|min:1',
            'amount' => 'nullable|numeric|min:0',
        ]);

        $isDpUpload = false;
        if ($order->payment && $order->payment->payment_method === 'credit') {
            $hasDp = $order->payment->down_payment && $order->payment->down_payment > 0;
            $dpVerifiedOrPending = $order->payment->paymentLogs()
                ->where('type', 'down_payment')
                ->whereIn('status', ['pending', 'verified'])
                ->exists();
            if ($hasDp && !$dpVerifiedOrPending) {
                $isDpUpload = true;
            }
        }

        if ($order->payment && $order->payment->payment_method === 'credit' && $request->has('amount') && !$isDpUpload) {
            $minAmount = $order->payment->installment_amount / 2;
            if ($request->amount < $minAmount && !$request->has('dp_override')) {
                return back()->withErrors(['amount' => 'Minimal pembayaran adalah Rp ' . number_format($minAmount, 0, ',', '.')]);
            }
        }

        if ($request->hasFile('proof_of_payment')) {
            \Illuminate\Support\Facades\Log::info('File present.');
            
            try {
                $path = $request->file('proof_of_payment')->store('payment-proofs', 'public');
                \Illuminate\Support\Facades\Log::info('File stored at: ' . $path);
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('File upload failed: ' . $e->getMessage());
                return back()->withErrors(['proof_of_payment' => 'Gagal mengupload file: ' . $e->getMessage()]);
            }
            
            if ($order->payment) {
                \Illuminate\Support\Facades\Log::info('Payment found. ID: ' . $order->payment->id);
                // Determine type: DP or Installment
                // If payment method is Credit
                if ($order->payment->payment_method === 'credit') {
                    $hasDp = $order->payment->down_payment && $order->payment->down_payment > 0;
                    
                    // Check if DP is already verified or pending
                    $dpLog = $order->payment->paymentLogs()
                        ->where('type', 'down_payment')
                        ->whereIn('status', ['pending', 'verified'])
                        ->first();

                    if ($hasDp && !$dpLog) {
                        \Illuminate\Support\Facades\Log::info('Creating DP Log (Auto Verified).');
                        // This is a DP upload
                        $log = $order->payment->paymentLogs()->create([
                            'type' => 'down_payment',
                            'amount' => $order->payment->down_payment,
                            'proof_path' => $path,
                            'status' => 'verified',
                            'paid_at' => now(),
                        ]);

                        \App\Models\FinancialTransaction::create([
                            'transaction_date' => now(),
                            'type' => 'income',
                            'category' => 'down_payment',
                            'amount' => $log->amount,
                            'description' => "Pembayaran down payment (Order #{$order->id})",
                            'payment_method' => 'transfer',
                            'related_id' => $log->id,
                            'related_type' => \App\Models\PaymentLog::class,
                        ]);

                    } else {
                        \Illuminate\Support\Facades\Log::info('Processing Installment Log (Auto Verified).');
                        // This is an installment upload
                        $nextInstallment = ($order->payment->installments_paid ?? 0) + 1;
                        $monthsPaid = $request->input('months_paid', 1);

                        $totalAmount = $request->input('amount') ?? ($order->payment->installment_amount * $monthsPaid);
                        
                        $log = $order->payment->paymentLogs()->create([
                            'type' => 'installment',
                            'installment_number' => $nextInstallment,
                            'amount' => $totalAmount,
                            'proof_path' => $path,
                            'status' => 'verified',
                            'paid_at' => now(),
                            'months_paid' => $monthsPaid,
                        ]);

                        $order->payment->increment('installments_paid');
                        
                        // If paid == duration, mark as paid_off
                        if ($order->payment->fresh()->installments_paid >= $order->payment->duration_months) {
                            $order->payment->update(['status' => 'paid_off']);
                        }

                        \App\Models\FinancialTransaction::create([
                            'transaction_date' => now(),
                            'type' => 'income',
                            'category' => 'installment',
                            'amount' => $log->amount,
                            'description' => "Pembayaran installment (Order #{$order->id})",
                            'payment_method' => 'transfer',
                            'related_id' => $log->id,
                            'related_type' => \App\Models\PaymentLog::class,
                        ]);
                    }

                    // Update order status if it's the first financial commitment completed
                    if ($order->status === 'awaiting_payment') {
                        $order->update(['status' => 'processing']);
                    }
                } else {
                    // CASH Payment
                    \Illuminate\Support\Facades\Log::info('Updating Cash Payment proof (Auto Verified).');
                    $order->payment->update([
                        'proof_of_payment_path' => $path,
                        'status' => 'paid_off'
                    ]);

                    $order->update(['status' => 'processing']);

                    \App\Models\FinancialTransaction::create([
                        'transaction_date' => now(),
                        'type' => 'income',
                        'category' => 'cash_sale',
                        'amount' => $order->total_amount,
                        'description' => "Penjualan Cash (Order #{$order->id})",
                        'payment_method' => $order->payment->cash_type ?? 'transfer',
                        'related_id' => $order->payment->id,
                        'related_type' => \App\Models\Payment::class,
                    ]);
                }
            }
        }

        return back()->with('success', 'Pembayaran berhasil diproses otomatis.');
    }

    public function generateSnapToken(Request $request, string $id, MidtransService $midtrans)
    {
        $order = Order::where('user_id', auth()->id())->findOrFail($id);
        $payment = $order->payment;

        if (!$payment) {
            return response()->json(['message' => 'Metode pembayaran belum dipilih'], 400);
        }

        $isDpUpload = false;
        $amount = 0;
        $paymentType = 'full_payment';
        $installmentNumber = null;
        $monthsPaid = null;

        if (in_array($payment->payment_method, ['credit', 'cash_gantung'])) {
            $hasDp = $payment->down_payment && $payment->down_payment > 0;
            $dpVerified = $payment->paymentLogs()
                ->where('type', 'down_payment')
                ->where('status', 'verified')
                ->exists();
                
            if ($hasDp && !$dpVerified) {
                $isDpUpload = true;
                $amount = $payment->down_payment;
                $paymentType = 'down_payment';
            } else {
                // Instalment
                $nextInstallment = ($payment->installments_paid ?? 0) + 1;
                $monthsPaid = (float) $request->input('months_paid', 1);
                $amount = $request->input('amount') ?? ($payment->installment_amount * $monthsPaid);
                $paymentType = 'installment';
                $installmentNumber = $nextInstallment;
            }
        } else {
            // Cash
            $amount = $order->total_amount;
        }

        // Create a pending payment log first to get an ID for midtrans
        $paymentLog = $payment->paymentLogs()
            ->where('type', $paymentType)
            ->where('installment_number', $installmentNumber)
            ->where('status', 'pending')
            ->first();

        if ($paymentLog) {
            $paymentLog->update([
                'amount' => $amount,
                'months_paid' => $monthsPaid,
            ]);
        } else {
            $paymentLog = $payment->paymentLogs()->create([
                'type' => $paymentType,
                'installment_number' => $installmentNumber,
                'amount' => $amount,
                'status' => 'pending',
                'months_paid' => $monthsPaid,
            ]);
        }
        
        $orderId = 'PAYLOG-' . $paymentLog->id . '-' . time();

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => (int) round($amount),
            ],
            'customer_details' => [
                'first_name' => auth()->user()->name,
                'email' => auth()->user()->email,
            ],
        ];

        try {
            $snapToken = $midtrans->createSnapToken($params);
            $paymentLog->update(['snap_token' => $snapToken]);
            return response()->json(['token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menghubungi Midtrans'], 500);
        }
    }
}
