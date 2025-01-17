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
            UserLanguageSeeder::class,     // 5. UserLanguageSeeder
            UserCategorySeeder::class,     // 6. UserCategorySeeder
            UserHopeLanguageSeeder::class,
            CompaniesTableSeeder::class,
            QuestionsTableSeeder::class,
            ProjectsTableSeeder::class,
            //ProjectUserSeeder::class,
            UserCategorySeeder::class,
            UserlanguageSeeder::class,
            UserHopeLanguageSeeder::class,
        ]);

        $this->command->info('全てのシーディングが完了しました！');
    }
}
