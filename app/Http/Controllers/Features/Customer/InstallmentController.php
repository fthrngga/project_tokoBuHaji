<?php

namespace App\Http\Controllers\Features\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InstallmentController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $customer = \App\Features\Customer\Customer::where('user_id', $user->id)->first();

        // If no customer profile yet, return empty list
        if (!$customer) {
            return \Inertia\Inertia::render('Features/Customer/Installments/Index', [
                'installments' => []
            ]);
        }

        $installments = \App\Models\Payment::with(['order.items.product', 'paymentLogs'])
            ->where('customer_id', $customer->id)
            ->where('payment_method', 'credit')
            ->latest()
            ->get()
            ->map(function ($payment) {
                // Calculation logic
                $totalPaid = $payment->installments_paid * $payment->installment_amount;
                // If DP was paid, it's usually handled separately or part of total check?
                // For "Remaining Debt", it's usually (Duration - Paid) * Amount.
                $remainingMonths = max(0, $payment->duration_months - $payment->installments_paid);
                $remainingDebt = $remainingMonths * $payment->installment_amount;

                // Determine Product Name (First Item)
                $productName = $payment->order->items->first()?->product->name ?? 'Produk dihapus';

                // Next Due Date: if ongoing, 25th of next month (simplified logic)
                // Real logic might track last payment date.
                // For now, let's say 1 month after last payment or created_at if none.
                $lastLog = $payment->paymentLogs->sortByDesc('paid_at')->first();
                $baseDate = $lastLog ? \Carbon\Carbon::parse($lastLog->paid_at) : $payment->created_at;
                $nextDueDate = $remainingMonths > 0 ? $baseDate->addMonth()->format('d F Y') : '-';

                return [
                    'id' => $payment->id,
                    'order_id' => $payment->order_id,
                    'productName' => $productName,
                    'contractNumber' => 'CTR-' . str_pad($payment->id, 5, '0', STR_PAD_LEFT),
                    'remainingDebt' => $remainingDebt,
                    'status' => $payment->status, // ongoing, paid_off
                    'dueDate' => $nextDueDate,
                    'installment_amount' => $payment->installment_amount, // Needed for "Bayar" info
                    'history' => $payment->paymentLogs->map(function ($log) {
                        return [
                            'id' => $log->id,
                            'installmentKe' => $log->installment_number,
                            'date' => $log->paid_at ? \Carbon\Carbon::parse($log->paid_at)->format('d-m-Y') : '-',
                            'method' => 'Transfer', // Simplified
                            'amount' => $log->amount,
                            'status' => ucfirst($log->status),
                            'admin_notes' => $log->admin_notes
                        ];
                    })
                ];
            });

        return \Inertia\Inertia::render('Features/Customer/Installments/Index', [
            'installments' => $installments
        ]);
    }
}
