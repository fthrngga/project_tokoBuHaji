<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialTransaction extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'transaction_date' => 'date',
    ];

    public function related()
    {
        return $this->morphTo();
    }
}
