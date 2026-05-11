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
}
