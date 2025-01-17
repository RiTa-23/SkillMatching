<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Language;
use App\Models\Category;

class SearchController extends Controller
{

    public function searchUsers(Request $request)
    {
        $request->validate([
            'language_id' => 'nullable|exists:languages,language_id',
            'language_level_min' => 'nullable|integer|min:1|max:5',
            'language_level_max' => 'nullable|integer|min:1|max:5',
            'category_id' => 'nullable|exists:categories,category_id',
            'category_level_min' => 'nullable|integer|min:1|max:5',
            'category_level_max' => 'nullable|integer|min:1|max:5',
        ]);

        $languageId = $request->input('language_id');
        $languageLevelMin = $request->input('language_level_min');
        $languageLevelMax = $request->input('language_level_max');
        $categoryId = $request->input('category_id');
        $categoryLevelMin = $request->input('category_level_min');
        $categoryLevelMax = $request->input('category_level_max');

        $query = \DB::table('users')
            ->leftJoin('user_language', 'users.user_id', '=', 'user_language.user_id')
            ->leftJoin('languages', 'user_language.language_id', '=', 'languages.language_id')
            ->leftJoin('user_category', 'users.user_id', '=', 'user_category.user_id')
            ->leftJoin('categories', 'user_category.category_id', '=', 'categories.category_id')
            ->select(
                'users.user_id',
                'users.name',
                'languages.language_name',
                'user_language.level as language_level',
                'categories.category_name',
                'user_category.level as category_level'
            );

        // 技術フィルター
        if ($languageId) {
            $query->where('user_language.language_id', $languageId);
        }
        if ($languageLevelMin) {
            $query->where('user_language.level', '>=', $languageLevelMin);
        }
        if ($languageLevelMax) {
            $query->where('user_language.level', '<=', $languageLevelMax);
        }

        // カテゴリーフィルター
        if ($categoryId) {
            $query->where('user_category.category_id', $categoryId);
        }
        if ($categoryLevelMin) {
            $query->where('user_category.level', '>=', $categoryLevelMin);
        }
        if ($categoryLevelMax) {
            $query->where('user_category.level', '<=', $categoryLevelMax);
        }

        $users = $query->get()->map(function ($user) {
            return [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'language_name' => $user->language_name,
                'language_level' => $user->language_level,
                'category_name' => $user->category_name,
                'category_level' => $user->category_level,
            ];
        });

        return response()->json($users, 200);
    }
}
