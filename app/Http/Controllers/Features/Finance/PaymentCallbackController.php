<?php

namespace App\Http\Controllers\Features\Finance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Notification;
use App\Models\PaymentLog;
use App\Models\Features\Order\Order;

class PaymentCallbackController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production', false);
    }

    public function handleCallback(Request $request)
    {
        try {
            // For localhost testing via frontend simulation, we read from $request directly
            // In production, Midtrans Webhook sends the exact same payload.
            $transaction = $request->input('transaction_status');
            $type = $request->input('payment_type');
            $orderId = $request->input('order_id');
            $fraud = $request->input('fraud_status', 'accept');

            // orderId in Midtrans will be something like "PAYLOG-123"
            Log::info("Midtrans Webhook hit for order: $orderId, Status: $transaction, Fraud: $fraud");

            $parts = explode('-', $orderId);
            if (count($parts) < 2 || $parts[0] !== 'PAYLOG') {
                return response()->json(['message' => 'Invalid order ID format'], 400);
            }

            $paymentLogId = $parts[1];
            $paymentLog = PaymentLog::find($paymentLogId);

            if (!$paymentLog) {
                return response()->json(['message' => 'Payment log not found'], 404);
            }

            if ($transaction == 'capture') {
                if ($type == 'credit_card') {
                    if ($fraud == 'challenge') {
                        $paymentLog->update(['status' => 'pending']);
                    } else {
                        $paymentLog->update(['status' => 'verified', 'paid_at' => now()]);
                        $this->recordFinancialTransaction($paymentLog);
                    }
                }
            } else if ($transaction == 'settlement') {
                $paymentLog->update(['status' => 'verified', 'paid_at' => now()]);
                $this->recordFinancialTransaction($paymentLog);
            } else if ($transaction == 'pending') {
                $paymentLog->update(['status' => 'pending']);
            } else if ($transaction == 'deny') {
                $paymentLog->update(['status' => 'rejected']);
            } else if ($transaction == 'expire') {
                $paymentLog->update(['status' => 'rejected']);
            } else if ($transaction == 'cancel') {
                $paymentLog->update(['status' => 'rejected']);
            }

            // Update main payment status if necessary
            if ($paymentLog->status === 'verified') {
                $payment = $paymentLog->payment;
                if ($paymentLog->type === 'down_payment') {
                    // Automatically update order status to processing if it's DP
                    if ($payment->order && $payment->order->status === 'awaiting_payment') {
                        $payment->order->update(['status' => 'processing']);
                    }
                } elseif ($paymentLog->type === 'full_payment') {
                     $payment->update(['status' => 'paid_off']);
                     if ($payment->order && $payment->order->status === 'awaiting_payment') {
                        $payment->order->update(['status' => 'processing']);
                    }
                } elseif ($paymentLog->type === 'installment') {
                    $payment->increment('installments_paid', 1);
                    if ($payment->installments_paid >= $payment->duration_months) {
                        $payment->update(['status' => 'paid_off']);
                    }
                }
            }

            return response()->json(['message' => 'Callback processed']);

        } catch (\Exception $e) {
            Log::error('Midtrans Callback Error: ' . $e->getMessage());
            return response()->json(['message' => 'Internal error'], 500);
        }
    }

    private function recordFinancialTransaction($log)
    {
        // Prevent duplicate transaction entry
        if (\App\Models\FinancialTransaction::where('related_type', PaymentLog::class)->where('related_id', $log->id)->exists()) {
            return;
        }

        $category = 'other';
        $description = '';
        if ($log->type === 'down_payment') {
            $category = 'down_payment';
            $description = "Pembayaran DP otomatis via Midtrans";
        } elseif ($log->type === 'full_payment') {
            $category = 'full_payment';
            $description = "Pembayaran Lunas otomatis via Midtrans";
        } elseif ($log->type === 'installment') {
            $category = 'installment';
            $description = "Pembayaran Angsuran ke-{$log->installment_number} otomatis via Midtrans";
        }

        \App\Models\FinancialTransaction::create([
            'transaction_date' => now(),
            'type' => 'income',
            'category' => $category,
            'amount' => $log->amount,
            'description' => $description,
            'payment_method' => 'transfer',
            'related_id' => $log->id,
            'related_type' => PaymentLog::class,
        ]);
    }
}
