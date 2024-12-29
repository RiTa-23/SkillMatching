<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('projects')->insert([
            [
                'title' => 'システム開発案件',
                'company_id' => 1, // 事前に companys テーブルに会社を追加しておく必要があります
                'contents' => '業務システムの開発案件。詳細要件は後日提供予定。',
                'start_date' => Carbon::now()->subDays(10)->toDateString(),
                'end_date' => Carbon::now()->addDays(20)->toDateString(),
                'status' => '進行中',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Webサイト制作案件',
                'company_id' => 2,
                'contents' => 'コーポレートサイトのリニューアル案件。',
                'start_date' => Carbon::now()->subDays(30)->toDateString(),
                'end_date' => Carbon::now()->subDays(5)->toDateString(),
                'status' => '完了',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'スマホアプリ開発案件',
                'company_id' => 3,
                'contents' => 'iOSおよびAndroidアプリの開発プロジェクト。',
                'start_date' => Carbon::now()->addDays(5)->toDateString(),
                'end_date' => Carbon::now()->addDays(60)->toDateString(),
                'status' => '予定',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
