<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('companies')->insert([
            [
                'company_name' => 'Company A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'Company B',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'Company C',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
