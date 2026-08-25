<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'administrator',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('11223344'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'customer',
            'email' => 'customer@gmail.com',
            'password' => Hash::make('11223344'),
            'role' => 'customer',
        ]);

        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('11223344'),
            'role' => 'super_admin',
        ]);

        User::factory()->create([
            'name' => 'Owner',
            'email' => 'owner@gmail.com',
            'password' => Hash::make('11223344'),
            'role' => 'owner',
        ]);

        User::factory()->create([
            'name' => 'Sales Team',
            'email' => 'sales@gmail.com',
            'password' => Hash::make('11223344'),
            'role' => 'sales',
        ]);

        User::factory()->create([
            'name' => 'Finance Team',
            'email' => 'finance@gmail.com',
            'password' => Hash::make('11223344'),
            'role' => 'finance',
        ]);

        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}
