<?php

namespace App\Models\Features\Order;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'product_variant_id',
        'quantity',
        'price',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(\App\Features\Product\Product::class); // Adjusted namespace based on earlier context
    }

    public function variant()
    {
        return $this->belongsTo(\App\Features\Product\ProductVariant::class, 'product_variant_id');
    }
    public function returns()
    {
        return $this->hasMany(ProductReturn::class);
    }
}
