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
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'customer', 'super_admin', 'owner', 'sales', 'finance') DEFAULT 'customer'");
    }

    public function down(): void
    {
        // You cannot easily remove ENUM values in down without recreating the column or risking data loss, so we keep the updated values
    }
};
