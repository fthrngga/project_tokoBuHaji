<?php

namespace App\Models\Features\Order;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'total_amount',
        'shipping_cost',
        'province',
        'city',
        'district',
        'village',
        'address_detail',
        'postal_code',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class); // Assuming standard User model location
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function messages()
    {
        return $this->hasMany(OrderMessage::class);
    }

    public function payment()
    {
        return $this->hasOne(\App\Models\Payment::class);
    }
}
