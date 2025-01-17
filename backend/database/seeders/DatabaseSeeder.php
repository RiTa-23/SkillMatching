<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,             // 1. RoleSeeder
            LanguagesTableSeeder::class,   // 3. LanguagesTableSeeder
            UsersTableSeeder::class,       // 2. UsersTableSeeder
            CategoriesTableSeeder::class,  // 4. CategoriesTableSeeder
            UserCategorySeeder::class,     // 6. UserCategorySeeder
            CompaniesTableSeeder::class,
            ProjectsTableSeeder::class,    // 5. ProjectsTableSeeder
        ]);

        $this->command->info('全てのシーディングが完了しました！');
    }
}
