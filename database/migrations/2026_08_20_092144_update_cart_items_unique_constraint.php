<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
            // MySQL requires an index for foreign keys. If we drop the unique index, 
            // the foreign key might complain if it was relying on it.
            // So we add a regular index on cart_id first.
            $table->index('cart_id');
            $table->dropUnique('cart_items_cart_id_product_id_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
            $table->unique(['cart_id', 'product_id']);
            $table->dropIndex(['cart_id']);
        });
    }
};
