<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // ダミーデータを挿入
        for ($i = 0; $i < 10; $i++) {
            DB::table('users')->insert([
                'password' => bcrypt('password'), // パスワード (bcryptでハッシュ化)
                'name' => $faker->name, // ダミーの氏名
                'age' => rand(18, 60), // 年齢 (18から60の間)
                'email' => $faker->unique()->safeEmail, // ユニークなメールアドレス
                'role_id' => rand(1, 4), // ランダムな役割ID (1から4の間)
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
