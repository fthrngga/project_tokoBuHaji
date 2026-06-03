<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE payments MODIFY COLUMN status ENUM('pending_approval', 'ongoing', 'paid_off', 'arrears', 'rejected', 'completed', 'repossessed') DEFAULT 'pending_approval'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE payments MODIFY COLUMN status ENUM('pending_approval', 'ongoing', 'paid_off', 'arrears', 'rejected', 'completed') DEFAULT 'pending_approval'");
    }
};
