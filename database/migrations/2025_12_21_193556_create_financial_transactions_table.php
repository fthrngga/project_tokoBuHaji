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
        Schema::create('financial_transactions', function (Blueprint $table) {
            $table->id();
            $table->date('transaction_date');
            $table->enum('type', ['income', 'expense']); // Pemasukan / Pengeluaran
            $table->enum('category', ['cash_sale', 'down_payment', 'installment', 'restock', 'operational', 'salary', 'other']);
            $table->decimal('amount', 15, 2);
            $table->text('description')->nullable();
            $table->string('payment_method')->nullable(); // cash, transfer
            
            // Polymorphic relation to link to Source (e.g. Payment, Order, Restock)
            $table->nullableMorphs('related');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_transactions');
    }
};
