<?php

namespace Database\Seeders;

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
            UserCategorySeeder::class,     // 5. UserCategorySeeder
            CompaniesTableSeeder::class,   // 6. CompaniesTableSeeder
            ProjectsTableSeeder::class,    // 7. ProjectsTableSeeder
            QuestionsTableSeeder::class,   // 8. QuestionsTableSeeder
        ]);

        $this->command->info('全てのシーディングが完了しました！');
    }
}
