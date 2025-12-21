<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'order_id',
        'customer_id',
        'payment_method',
        'cash_type',
        'down_payment',
        'installment_amount',
        'duration_months',
        'status',
        'proof_of_payment_path',
        'installments_paid',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Features\Order\Order::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(\App\Features\Customer\Customer::class);
    }

    public function paymentLogs()
    {
        return $this->hasMany(PaymentLog::class);
    }

    public function latestPaymentLog()
    {
        return $this->hasOne(PaymentLog::class)->latestOfMany();
    }
}
