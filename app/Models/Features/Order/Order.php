<?php

namespace App\Models\Features\Order;

use Illuminate\Database\Eloquent\Model;
use App\Features\Product\Product;

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
        'allow_credit',
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

    protected static function booted()
    {
        static::updated(function ($order) {
            // Ambil status lawas (sebelum di-save) dan status baru
            $originalStatus = $order->getOriginal('status');
            $newStatus = $order->status;

            // Pastikan kita hanya mengeksekusi jika statusnya benar-benar berubah
            if ($originalStatus !== $newStatus) {
                
                // 1. PENGEMBALIAN STOK (RESTORE)
                // Karena stok sudah dikurangi sejak awal checkout (di CheckoutController),
                // maka jika pesanan dibatalkan di tahap mana pun (selain yang sudah cancelled), stok harus dikembalikan.
                if ($originalStatus !== 'cancelled' && $newStatus === 'cancelled') {
                    // CEK: Apakah ini ditarik (Repossessed) karena nunggak?
                    // Jika iya, barang masuk ke Gudang Isolasi, BUKAN kembali ke etalase toko.
                    $isRepossessed = $order->payment && $order->payment->status === 'repossessed';
                    
                    if (!$isRepossessed) {
                        foreach ($order->items as $item) {
                            $product = Product::find($item->product_id);
                            if ($product) {
                                $product->increment('stock', $item->quantity);
                            }
                        }
                    }
                }
                
            }
        });
    }

    public function returns()
    {
        return $this->hasMany(ProductReturn::class);
    }
}
