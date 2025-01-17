<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->insert([
            ['category_name' => '問題解決力'],
            ['category_name' => 'コミュニケーション力'],
            ['category_name' => '協調性'],
            ['category_name' => 'プレゼンテーション力'],
            ['category_name' => 'リーダーシップ'],
        ]);
    }
}
