<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class AnswersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // ダミーデータを挿入
        for ($i = 0; $i < 2; $i++) {
            DB::table('answers')->insert([
                'user_id' => $i+2, // 1から10の間のランダムなユーザーID
                'question_id' => $i+1, // 1から10の間のランダムな質問ID
                'answer' => $faker->text(200), // ダミーの回答
                'response_value' => rand(1, 5), // 1から5の間のランダムなスコア
                'additional_notes' => $faker->sentence(), // 追加コメント
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
