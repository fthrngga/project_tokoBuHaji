<?php

namespace App\Models\Features\Inventory;

use Illuminate\Database\Eloquent\Model;

class DefectiveProduct extends Model
{
    protected $guarded = ['id'];

    public function product()
    {
        return $this->belongsTo(\App\Features\Product\Product::class);
    }

    public function variant()
    {
        return $this->belongsTo(\App\Features\Product\ProductVariant::class, 'product_variant_id');
    }

    public function source()
    {
        return $this->morphTo();
    }
}
