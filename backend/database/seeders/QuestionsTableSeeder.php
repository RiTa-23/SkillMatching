<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Process\FakeProcessResult;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class QuestionsTableSeeder extends Seeder
{
    public function run()
    {
        // 例: カテゴリーIDと技術IDは実際に存在するIDに合わせてください
        // DB::table('questions')->insert([
        //     [
        //         'company_id' => 1,    // 例: "Company A" 会社ID
        //         'category_id' => 1,  // 例: "問題解決力" カテゴリーID
        //         'language_id' => 1,   // 例: "Python" 技術ID
        //         'question_text' => 'Question1？',
        //     ],
        //     [
        //         'company_id' => 2,    // 例: "Company B" 会社ID
        //         'category_id' => 2,  // 例: "コミュニケーション力" カテゴリーID
        //         'language_id' => 2,   // 例: "PHP" 技術ID
        //         'question_text' => 'Question2?',
        //     ],
        //     // 必要に応じて他のデータを追加

        // 例: 
        // ]);

        $faker = Faker::create();
        for ($i = 0; $i <= 20; $i++) {
            DB::table('questions')->insert([
                'company_id' => rand(1, 3),
                'category_id' => rand(1, 5),
                'language_id' => rand(1, 50),
                'question_text' => $faker->realText(100),
                'created_at' => now(),
                'updated_at' => now(),
            ]); 
        }
    }
}
