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

        // Otomatis hapus transaksi Midtrans yang nyangkut (kadaluwarsa > 24 jam)
        \App\Models\PaymentLog::where('status', 'pending')
            ->whereNull('proof_path')
            ->whereNotNull('snap_token')
            ->where('created_at', '<', now()->subDay())
            ->delete();

        $installments = \App\Models\Payment::with(['order.items.product', 'paymentLogs'])
            ->where('customer_id', $customer->id)
            ->whereIn('payment_method', ['credit', 'cash_gantung'])
            ->whereHas('order', function ($query) {
                $query->where('status', 'completed');
            })
            ->latest()
            ->get()
            ->map(function ($payment) {
                $isFlexible = $payment->installment_type === 'flexible';
                $actualVerifiedAmount = $payment->paymentLogs->where('type', 'installment')->where('status', 'verified')->sum('amount');
                
                $tunggakan = 0;
                $tunggakan_months = 0;
                $remainingDebt = 0;
                $totalBillThisMonth = 0;
                $monthsPaidFully = 0;

                if ($isFlexible) {
                    $totalGantung = $payment->order->total_amount * 1.15;
                    $remainingDebt = max(0, $totalGantung - ($payment->down_payment ?? 0) - $actualVerifiedAmount);
                    $totalBillThisMonth = $remainingDebt;
                } else {
                    // Kalkulasi Tunggakan Waktu Nyata berdasarkan umur kredit (Bulan)
                    $monthsElapsed = min($payment->duration_months, (int) floor($payment->created_at->diffInMonths(now())));
                    $expectedTotal = $monthsElapsed * $payment->installment_amount;
                    
                    $tunggakan = max(0, $expectedTotal - $actualVerifiedAmount);
                    $remainder = $payment->installment_amount > 0 ? fmod($actualVerifiedAmount, $payment->installment_amount) : 0;
                    $partialShortfall = $remainder > 0 ? $payment->installment_amount - $remainder : 0;

                    if ($partialShortfall > 0) {
                        if ($tunggakan == 0) {
                            $tunggakan = $partialShortfall + $payment->installment_amount;
                        } else {
                            $tunggakan = max($tunggakan, $partialShortfall + $payment->installment_amount);
                        }
                    }

                    $tunggakan_months = $payment->installment_amount > 0 ? floor($tunggakan / $payment->installment_amount) : 0;

                    $remainingMonths = max(0, $payment->duration_months - $payment->installments_paid);
                    $remainingDebt = max(0, ($remainingMonths * $payment->installment_amount)); // Sisanya adalah sisa bulan x pokok
                    $totalBillThisMonth = $payment->installment_amount + $tunggakan;
                    $monthsPaidFully = $payment->installment_amount > 0 ? floor($actualVerifiedAmount / $payment->installment_amount) : 0;
                }

                // Determine Product Name (First Item)
                $productName = $payment->order->items->first()?->product->name ?? 'Produk dihapus';

                $monthsPaidFully = $payment->installment_amount > 0 ? floor($actualVerifiedAmount / $payment->installment_amount) : 0;
                $nextDueDateCarbon = null;
                $daysUntilDue = null;
                $dueStatus = null;

                if ($isFlexible) {
                    $nextDueDateCarbon = $payment->created_at->copy()->addMonths($payment->duration_months);
                    $daysUntilDue = (int) now()->startOfDay()->diffInDays($nextDueDateCarbon->startOfDay(), false);

                    if ($daysUntilDue < 0 && $remainingDebt > 0) {
                        $dueStatus = 'overdue';
                    } elseif ($daysUntilDue <= 7 && $remainingDebt > 0) {
                        $dueStatus = 'warning';
                    } elseif ($remainingDebt == 0) {
                        $dueStatus = 'safe'; // Already paid
                    } else {
                        $dueStatus = 'safe';
                    }
                } else if ($remainingMonths > 0) {
                    $nextDueDateCarbon = $payment->created_at->copy()->addMonths($monthsPaidFully + 1);
                    $daysUntilDue = (int) now()->startOfDay()->diffInDays($nextDueDateCarbon->startOfDay(), false);

                    if ($daysUntilDue < 0) {
                        $dueStatus = 'overdue';       // sudah lewat jatuh tempo
                    } elseif ($daysUntilDue <= 7) {
                        $dueStatus = 'warning';       // <= 7 hari lagi
                    } else {
                        $dueStatus = 'safe';          // masih aman
                    }
                }

                $nextDueDateFormatted = $nextDueDateCarbon ? $nextDueDateCarbon->format('d F Y') : '-';

                return [
                    'id' => $payment->id,
                    'order_id' => $payment->order_id,
                    'productName' => $productName,
                    'contractNumber' => 'CTR-' . str_pad($payment->id, 5, '0', STR_PAD_LEFT),
                    'remainingDebt' => $remainingDebt,
                    'status' => $payment->status,
                    'dueDate' => $nextDueDateFormatted,
                    'daysUntilDue' => $daysUntilDue,
                    'dueStatus' => $dueStatus,
                    'installment_amount' => $payment->installment_amount,
                    'tunggakan' => $tunggakan,
                    'tunggakan_months' => $tunggakan_months,
                    'tunggakanMonths' => $tunggakan_months,
                    'isFlexible' => $isFlexible,
                    'totalBillThisMonth' => $totalBillThisMonth,
                    'history' => $payment->paymentLogs->filter(function ($log) {
                        return $log->status !== 'pending' || !empty($log->proof_path);
                    })->map(function ($log) {
                        return [
                            'id' => $log->id,
                            'installmentKe' => $log->installment_number,
                            'date' => $log->paid_at ? \Carbon\Carbon::parse($log->paid_at)->format('d-m-Y') : '-',
                            'method' => 'Transfer', // Simplified
                            'amount' => $log->amount,
                            'status' => ucfirst($log->status),
                            'admin_notes' => $log->admin_notes
                        ];
                    })->values(),
                    'activePayments' => $payment->paymentLogs->filter(function ($log) {
                        return $log->status === 'pending' && empty($log->proof_path);
                    })->map(function ($log) {
                        return [
                            'id' => $log->id,
                            'amount' => $log->amount,
                            'type' => $log->type,
                            'snap_token' => $log->snap_token,
                        ];
                    })->values()
                ];
            });

        return \Inertia\Inertia::render('Features/Customer/Installments/Index', [
            'installments' => $installments
        ]);
    }

    public function downloadReceipt(Request $request, $id)
    {
        $user = auth()->user();
        
        $paymentLog = \App\Models\PaymentLog::with(['payment.order.items.product', 'payment.customer.user'])
            ->where('status', 'verified')
            ->findOrFail($id);

        // Security check: ensure this payment belongs to the logged-in user
        if ($paymentLog->payment->customer->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $data = [
            'log' => $paymentLog,
            'payment' => $paymentLog->payment,
            'customer' => $paymentLog->payment->customer,
            'order' => $paymentLog->payment->order,
            'product' => $paymentLog->payment->order->items->first()->product ?? null,
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.receipt', $data);
        
        $filename = 'Kuitansi_Pembayaran_' . $paymentLog->id . '_' . date('Ymd', strtotime($paymentLog->paid_at)) . '.pdf';
        
        return $pdf->download($filename);
    }
}
