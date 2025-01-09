<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Language;

class UserLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 必要なら外部キー制約を一時的に無効化
        Schema::disableForeignKeyConstraints();

        // テーブルを初期化（データをクリア）
        DB::table('user_language')->truncate();

        // ユーザーと言語を取得
        $users = User::all();
        $languages = Language::all();

        if ($users->isEmpty() || $languages->isEmpty()) {
            $this->command->warn('ユーザーまたは言語データが存在しません。データベースを確認してください。');
            return;
        }

        // データをランダムに生成して挿入
        foreach ($users as $user) {
            $assignedLanguages = $languages->random(rand(1, 3)); // 各ユーザーに1～3つのランダムな言語を割り当て

            foreach ($assignedLanguages as $language) {
                DB::table('user_language')->insert([
                    'user_id' => $user->user_id,
                    'language_id' => $language->language_id,
                    'level' => rand(1, 5), // レベルは1～5の範囲でランダム
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 外部キー制約を再有効化
        Schema::enableForeignKeyConstraints();

        $this->command->info('user_language テーブルのシーディングが完了しました！');
    }
}
