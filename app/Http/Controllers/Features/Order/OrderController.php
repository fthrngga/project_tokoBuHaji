<?php

namespace App\Http\Controllers\Features\Order;

use App\Http\Controllers\Controller;
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
            ->with(['items.product.images', 'messages.user', 'payment.paymentLogs'])
            ->findOrFail($id);

        return \Inertia\Inertia::render('Features/Order/Show', [
            'order' => $order
        ]);
    }

    public function storePayment(Request $request, string $id)
    {
        $order = \App\Models\Features\Order\Order::where('user_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'payment_method' => 'required|in:cash,credit',
            'cash_type' => 'nullable|required_if:payment_method,cash|in:transfer,direct',
            'down_payment' => 'nullable|numeric|min:0',
        ]);

        $payment = \App\Models\Payment::create([
            'order_id' => $order->id,
            'customer_id' => auth()->user()->customer->id, // Assuming user is customer and has this relation
            'payment_method' => $validated['payment_method'],
            'cash_type' => $validated['cash_type'] ?? null,
            'down_payment' => $validated['down_payment'] ?? 0,
            'status' => 'pending_approval',
        ]);

        // Update order status if needed, e.g. to 'processing' or stay 'awaiting_payment' until approved?
        // Plan didn't specify strict status change here, but implies flow moves forward.
        // Let's keep it awaiting_payment or change to a new status 'payment_submitted'?
        // For now, let's keep order status as is or update to 'processing' if cash?
        // User said: "Monitoring Kredit" -> Admin inputs Installment.
        // So probably wait for Admin.

        return back()->with('success', 'Metode pembayaran berhasil disimpan.');
    }

    public function uploadProof(Request $request, string $id)
    {
        \Illuminate\Support\Facades\Log::info('Upload Proof hit for Order ID: ' . $id);

        $order = \App\Models\Features\Order\Order::where('user_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'proof_of_payment' => 'required|image|max:2048', // Max 2MB
            'months_paid' => 'nullable|integer|min:1',
        ]);

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
                        \Illuminate\Support\Facades\Log::info('Creating DP Log.');
                        // This is a DP upload
                        $order->payment->paymentLogs()->create([
                            'type' => 'down_payment',
                            'amount' => $order->payment->down_payment,
                            'proof_path' => $path,
                            'status' => 'pending',
                        ]);
                    } else {
                        \Illuminate\Support\Facades\Log::info('Processing Installment Log.');
                        // This is an installment upload
                        $nextInstallment = ($order->payment->installments_paid ?? 0) + 1;
                        $monthsPaid = $request->input('months_paid', 1);

                        // Amount should be installment_amount * months_paid?
                        // Usually proof upload just shows amount transferred. 
                        // But strictly in system, we might want to record the full amount expected?
                        // Let's store amount * months_paid.
                        $totalAmount = $order->payment->installment_amount * $monthsPaid;
                        
                        // Prevent duplicate pending for same installment
                        $pendingLog = $order->payment->paymentLogs()
                            ->where('type', 'installment')
                            ->where('installment_number', $nextInstallment)
                            ->where('status', 'pending')
                            ->first();

                        if ($pendingLog) {
                            \Illuminate\Support\Facades\Log::info('Updating pending installment log.');
                            $pendingLog->update([
                                'proof_path' => $path,
                                'months_paid' => $monthsPaid,
                                'amount' => $totalAmount 
                            ]);
                        } else {
                            \Illuminate\Support\Facades\Log::info('Creating new installment log for #' . $nextInstallment . ' covering ' . $monthsPaid . ' months.');
                            $order->payment->paymentLogs()->create([
                                'type' => 'installment',
                                'installment_number' => $nextInstallment,
                                'amount' => $totalAmount,
                                'proof_path' => $path,
                                'status' => 'pending',
                                'months_paid' => $monthsPaid,
                            ]);
                        }
                    }
                } else {
                    // CASH Payment
                    \Illuminate\Support\Facades\Log::info('Updating Cash Payment proof.');
                    $order->payment->update([
                        'proof_of_payment_path' => $path,
                    ]);
                }
            }
        }

        return back()->with('success', 'Bukti pembayaran berhasil diupload. Mohon tunggu verifikasi admin.');
    }
}
