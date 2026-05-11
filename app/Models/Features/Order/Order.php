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
                
                // 1. PENGURANGAN STOK
                // Jika status naik dari 'awaiting_payment' ke 'processing' atau 'completed'
                if ($originalStatus === 'awaiting_payment' && in_array($newStatus, ['processing', 'completed'])) {
                    foreach ($order->items as $item) {
                        $product = Product::find($item->product_id);
                        if ($product) {
                            $product->decrement('stock', $item->quantity);
                        }
                    }
                }

                // 2. PENGEMBALIAN STOK (RESTORE)
                // Jika pesanan dibatalkan, TAPI stoknya sebelumnya sudah telanjur dikurangi
                if (in_array($originalStatus, ['processing', 'completed']) && $newStatus === 'cancelled') {
                    foreach ($order->items as $item) {
                        $product = Product::find($item->product_id);
                        if ($product) {
                            $product->increment('stock', $item->quantity);
                        }
                    }
                }
                
            }
        });
    }
}
