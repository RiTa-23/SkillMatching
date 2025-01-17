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
        for ($i = 0; $i < 50; $i++) {
            $userId = DB::table('users')->insertGetId([
                'password' => bcrypt('password'), // パスワード (bcryptでハッシュ化)
                'name' => $faker->name, // ダミーの氏名
                'birthday' => $faker->date, // ダミーの誕生日
                'email' => $faker->unique()->safeEmail, // ユニークなメールアドレス
                'role_id' => rand(1, 4), // ランダムな役割ID (1から4の間)
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $user = \App\Models\User::find($userId);
            for ($j = 0; $j < rand(1, 5); $j++) {
                $number = rand(1, 50);
                if (!$user->languages()->where('user_language.language_id', $number)->exists()) {
                    $user->languages()->attach($number, ['level' => rand(1, 5)]); // ランダムなスキルを紐付け
                }
            }
            for ($j = 0; $j < rand(1, 5); $j++) {
                $number = rand(1, 50);
                if (!$user->hopeLanguages()->where('user_hope_language.language_id', $number)->exists()) {
                    $user->hopeLanguages()->attach($number); // ランダムな希望技術を紐付け
                }
            }
        }
    }
}
