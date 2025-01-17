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
        $users = DB::table('users')->pluck('user_id')->toArray(); // 修正: 'id' → 'user_id'
        $languages = DB::table('languages')->pluck('language_id')->toArray(); // 修正: 'id' → 'language_id'

        $data = [];
        foreach ($users as $userId) {
            // 各ユーザーにランダムな言語を割り当てる
            $assignedLanguages = array_rand(array_flip($languages), random_int(1, min(3, count($languages))));
            $assignedLanguages = is_array($assignedLanguages) ? $assignedLanguages : [$assignedLanguages];

            foreach ($assignedLanguages as $languageId) {
                // 重複チェック
                $exists = DB::table('user_hope_language')
                    ->where('user_id', $userId)
                    ->where('language_id', $languageId)
                    ->exists();

                if (!$exists) {
                    $data[] = [
                        'user_id' => $userId,
                        'language_id' => $languageId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        // 一括挿入
        if (!empty($data)) {
            DB::table('user_hope_language')->insert($data);
        }

        $this->command->info('UserHopeLanguageSeeder completed successfully.');
    }
}
