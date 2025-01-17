<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Faker\Factory as Faker;
use App\Models\Project;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i <= 10; $i++) {
            $projectId = Project::insertGetId([
                'title' => $faker->realText(20),
                'company_id' => rand(1, 3),
                'contents' => $faker->realText(200),
                'start_date' => Carbon::now()->subDays(10)->toDateString(),
                'end_date' => Carbon::now()->addDays(20)->toDateString(),
                'status' => ['進行中', '完了', '未着手'][array_rand(['進行中', '完了', '未着手'])],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $project = Project::find($projectId);
            for ($j = 0; $j < rand(3, 5); $j++) {
                $number = rand(1, 50);
                if (!$project->languages()->where('project_language.language_id', $number)->exists()) {
                    $project->languages()->attach($number);
                }
            }
        }
    }
}
