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
            'language_level' => 'nullable|integer|min:1|max:5',
            'category_id' => 'nullable|exists:categories,category_id',
            'category_level' => 'nullable|integer|min:1|max:5',
        ]);

        $languageId = $request->input('language_id');
        $languageLevel = $request->input('language_level');
        $categoryId = $request->input('category_id');
        $categoryLevel = $request->input('category_level');

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

        // 言語フィルター
        if ($languageId) {
            $query->where('user_language.language_id', $languageId);
        }
        if ($languageLevel) {
            $query->where('user_language.level', $languageLevel);
        }

        // カテゴリーフィルター
        if ($categoryId) {
            $query->where('user_category.category_id', $categoryId);
        }
        if ($categoryLevel) {
            $query->where('user_category.level', $categoryLevel);
        }

        $users = $query->get()->map(function ($user) {
            return [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'language_name' => $user->language_name,
                'level' => $user->language_level, // フロントエンドで期待する形式に変換
                'category_name' => $user->category_name,
            ];
        });

        return response()->json($users, 200);
    }

}