<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionsTableSeeder extends Seeder
{
    public function run()
    {
        // 例: カテゴリーIDと技術IDは実際に存在するIDに合わせてください
        DB::table('questions')->insert([
            [
                'company_id' => 1,    // 例: "Company A" 会社ID
                'category_id' => 1,  // 例: "問題解決力" カテゴリーID
                'language_id' => 1,   // 例: "Python" 技術ID
                'question_text' => 'Question1？',
            ],
            [
                'company_id' => 2,    // 例: "Company B" 会社ID
                'category_id' => 2,  // 例: "コミュニケーション力" カテゴリーID
                'language_id' => 2,   // 例: "PHP" 技術ID
                'question_text' => 'Question2?',
            ],
            // 必要に応じて他のデータを追加
        ]);
    }
}
