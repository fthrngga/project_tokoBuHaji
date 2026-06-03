<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Features\Product\Product;

class RestockRequest extends Model
{
    protected $fillable = ['product_id', 'product_variant_id', 'user_id', 'requested_quantity', 'status', 'notes'];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function variant() {
        return $this->belongsTo(\App\Features\Product\ProductVariant::class, 'product_variant_id');
    }
}