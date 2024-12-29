<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ProjectFeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // ダミーデータを挿入
        DB::table('project_feedback')->insert([
            [
                'project_id' => 1, // ダミー案件ID
                'user_id' => 1, // ダミー社員ID
                'role_id' => 1, // ダミー役割ID
                'feedback' => 'Excellent work on the project. Highly appreciated.',
                'rating' => 5, // 最高評価
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 2,
                'user_id' => 2,
                'role_id' => 2,
                'feedback' => 'Good effort, but there is room for improvement.',
                'rating' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 1,
                'user_id' => 3,
                'role_id' => 3,
                'feedback' => 'Failed to meet expectations on several deliverables.',
                'rating' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
