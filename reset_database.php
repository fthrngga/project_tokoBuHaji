<?php

/**
 * Script untuk membersihkan/mengosongkan seluruh isi database kecuali data Admin.
 * Cara Menjalankan:
 * Buka terminal, pastikan berada di folder project (c:\laragon\www\project_tokoBuHaji),
 * lalu jalankan perintah: php reset_database.php
 */

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\User;

echo "Memulai proses pembersihan database...\n";

// Nonaktifkan pemeriksaan foreign key sementara agar bisa di-truncate
Schema::disableForeignKeyConstraints();

// Ambil semua nama tabel dalam database
$tables = DB::select('SHOW TABLES');
$tableNames = array_map(function($table) {
    return array_values((array)$table)[0];
}, $tables);

// Tabel yang TIDAK BOLEH dikosongkan total
$excludedTables = ['migrations', 'users', 'categories'];

foreach ($tableNames as $name) {
    if (!in_array($name, $excludedTables)) {
        echo "Mengosongkan tabel: $name...\n";
        DB::table($name)->truncate();
    }
}

// Khusus untuk tabel users, hapus semua KECUALI admin
echo "Membersihkan tabel users (menyisakan admin)...\n";
// Asumsi admin adalah akun yang role-nya 'admin'
$deletedUsers = User::where('role', '!=', 'admin')->delete();
echo "Berhasil menghapus $deletedUsers user non-admin.\n";

// Aktifkan kembali pemeriksaan foreign key
Schema::enableForeignKeyConstraints();

echo "========================================================\n";
echo "SELESAI! Database berhasil dikosongkan. Siap digunakan.\n";
echo "========================================================\n";
