<?php

namespace App\Features\Product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'sku',
        'stock',
        'options',
        'price',
    ];

    protected $casts = [
        'options' => 'array',
    ];

    protected $appends = ['selling_price'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getSellingPriceAttribute()
    {
        $costPrice = $this->price ?? ($this->product ? $this->product->price : 0);
        $markup = $costPrice * 0.10;
        $sellingPrice = $costPrice + $markup;
        // Smart rounding up to nearest 1000
        return ceil($sellingPrice / 1000) * 1000;
    }
}
