<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentLog extends Model
{
    protected $fillable = [
        'payment_id',
        'type',
        'installment_number',
        'amount',
        'proof_path',
        'snap_token',
        'status',
        'paid_at',
        'admin_notes',
        'months_paid',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
    ];

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }

    public function getInstallmentRangeLabel(): string
    {
        if ($this->type !== 'installment' || !$this->payment) {
            return (string) $this->installment_number;
        }

        $payment = $this->payment;
        $instAmount = $payment->installment_amount > 0 ? $payment->installment_amount : 1;
        $duration = $payment->duration_months > 0 ? $payment->duration_months : 10;

        $logs = $payment->paymentLogs()
            ->where('type', 'installment')
            ->where('status', 'verified')
            ->orderBy('id')
            ->get();

        $runningTotal = 0;
        $startMonth = 1;
        $endMonth = 1;

        foreach ($logs as $log) {
            $startMonth = (int) floor($runningTotal / $instAmount) + 1;
            $runningTotal += $log->amount;
            $endMonth = (int) floor($runningTotal / $instAmount);
            if ($endMonth < $startMonth) {
                $endMonth = $startMonth;
            }
            $endMonth = min($duration, $endMonth);
            $startMonth = min($duration, $startMonth);

            if ($log->id === $this->id) {
                break;
            }
        }

        return $startMonth === $endMonth ? (string) $startMonth : "{$startMonth} - {$endMonth}";
    }
}
