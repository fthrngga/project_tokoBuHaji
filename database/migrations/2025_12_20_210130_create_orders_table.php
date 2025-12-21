<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('status')->default('negotiation'); // pending, negotiation, awaiting_payment, processing, completed, cancelled
            $table->decimal('total_amount', 12, 2);

            // Address Columns
            $table->string('province');
            $table->string('city');
            $table->string('district');
            $table->string('village');
            $table->text('address_detail');
            $table->string('postal_code')->nullable();
            $table->text('notes')->nullable(); // Penjelasan tambahan lokasi

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
