<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['role_name' => 'Admin'],
            ['role_name' => 'developer'],
            ['role_name' => 'employee'],
            ['role_name' => 'guest'],
        ];

        DB::table('roles')->insert($roles);
    }
}
