<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserHopeLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 既存のユーザーと言語データを取得
        $users = DB::table('users')->pluck('user_id')->toArray();
        $languages = DB::table('languages')->pluck('language_id')->toArray();

        // データを生成
        $data = [];
        foreach ($users as $userId) {
            // 各ユーザーにランダムな言語を割り当てる（複数言語も可）
            $assignedLanguages = array_rand(array_flip($languages), random_int(1, min(3, count($languages))));
            $assignedLanguages = is_array($assignedLanguages) ? $assignedLanguages : [$assignedLanguages];

            foreach ($assignedLanguages as $languageId) {
                $data[] = [
                    'user_id' => $userId,
                    'language_id' => $languageId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // 重複排除して挿入
        $uniqueData = array_unique($data, SORT_REGULAR);
        DB::table('user_hope_language')->insert($uniqueData);

        $this->command->info('UserHopeLanguageSeeder completed successfully.');
    }
}
