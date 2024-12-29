<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CorporationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('corporations')->insert([
            [
                'corporation_id' => 'corp001',
                'password' => Hash::make('password123'), // ハッシュ化されたパスワード
                'name' => 'John Doe',
                'company_id' => 1, // 存在する company_id を指定
                'age' => 35,
                'email' => 'johndoe@example.com',
                'role_id' => 2, // 存在する role_id を指定
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'corporation_id' => 'corp002',
                'password' => Hash::make('securepass456'),
                'name' => 'Jane Smith',
                'company_id' => 2,
                'age' => 42,
                'email' => 'janesmith@example.com',
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
