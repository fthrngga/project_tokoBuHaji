<?php

namespace App\Features\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    // SYNC_FILLABLE_START
    protected $fillable = [
        'name',
        'slug',
        'sku',
        'description',
        'price',
        'stock',
        'category_id',
        'weight',
        'specifications',
        'is_featured',
        'is_published',
        'custom_options',
    ];
    // SYNC_FILLABLE_END

    // SYNC_CASTS_START
    protected $casts = [
        'specifications' => 'array',
        'price' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'custom_options' => 'array',
    ];
    // SYNC_CASTS_END

    protected $appends = ['selling_price'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function getSellingPriceAttribute()
    {
        $costPrice = $this->price ?? 0;
        $markup = $costPrice * 0.10;
        $sellingPrice = $costPrice + $markup;
        // Smart rounding up to nearest 1000
        return ceil($sellingPrice / 1000) * 1000;
    }
}
