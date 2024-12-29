<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguagesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('languages')->insert([
            ['language_name' => 'Python'],
            ['language_name' => 'PHP'],
            ['language_name' => 'JavaScript'],
        ]);
    }
}
