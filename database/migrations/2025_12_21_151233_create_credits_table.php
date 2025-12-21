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
        Schema::create('credits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained('customers')->nullOnDelete();
            $table->enum('payment_method', ['cash', 'credit']);
            $table->string('cash_type')->nullable(); // transfer, direct
            $table->decimal('down_payment', 12, 2)->nullable();
            $table->decimal('installment_amount', 12, 2)->nullable();
            $table->integer('duration_months')->nullable();
            $table->enum('status', ['pending_approval', 'ongoing', 'paid_off', 'arrears', 'rejected', 'completed'])->default('pending_approval');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credits');
    }
};
