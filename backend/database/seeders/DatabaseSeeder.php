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
            UsersTableSeeder::class,       // 2. UsersTableSeeder
            LanguagesTableSeeder::class,   // 3. LanguagesTableSeeder
            CategoriesTableSeeder::class,  // 4. CategoriesTableSeeder
            UserLanguageSeeder::class,     // 5. UserLanguageSeeder
            UserCategorySeeder::class,     // 6. UserCategorySeeder
            UserHopeLanguageSeeder::class,
            CompaniesTableSeeder::class,
        ]);

        $this->command->info('全てのシーディングが完了しました！');
    }
}
