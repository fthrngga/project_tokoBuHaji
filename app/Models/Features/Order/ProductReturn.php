<?php

namespace App\Models\Features\Order;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class ProductReturn extends Model
{
    protected $fillable = [
        'order_id',
        'order_item_id',
        'user_id',
        'reason',
        'proof_image_path',
        'status',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function orderItem()
    {
        return $this->belongsTo(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
