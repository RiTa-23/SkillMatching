<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionsTableSeeder extends Seeder
{
    public function run()
    {
        // 例: カテゴリーIDと言語IDは実際に存在するIDに合わせてください
        DB::table('questions')->insert([
            [
                'category_id' => 1,  // 例: "問題解決力" カテゴリーID
                'language_id' => 1,   // 例: "Python" 言語ID
                'question_text' => 'Question1？',
            ],
            [
                'category_id' => 2,  // 例: "コミュニケーション力" カテゴリーID
                'language_id' => 2,   // 例: "PHP" 言語ID
                'question_text' => 'Question2?',
            ],
            // 必要に応じて他のデータを追加
        ]);
    }
}
