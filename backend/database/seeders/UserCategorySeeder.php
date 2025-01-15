<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Category;

class UserCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 外部キー制約を一時的に無効化
        Schema::disableForeignKeyConstraints();

        // テーブルを初期化
        DB::table('user_category')->truncate();

        // ユーザーとカテゴリーを取得
        $users = User::all();
        $categories = Category::all();

        if ($users->isEmpty() || $categories->isEmpty()) {
            $this->command->warn('ユーザーまたはカテゴリーのデータが存在しません。データベースを確認してください。');
            return;
        }

        // ユーザーごとにランダムなカテゴリーとレベルを割り当てる
        foreach ($users as $user) {
            $assignedCategories = $categories->random(rand(1, $categories->count()));

            foreach ($assignedCategories as $category) {
                DB::table('user_category')->insert([
                    'user_id' => $user->user_id, // ユーザーID
                    'category_id' => $category->category_id, // カテゴリーID
                    'level' => rand(1, 5), // レベル (1～5のランダム値)
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 外部キー制約を再有効化
        Schema::enableForeignKeyConstraints();

        $this->command->info('user_category テーブルのシーディングが完了しました！');
    }
}
