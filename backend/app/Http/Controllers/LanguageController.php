<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Language;
use App\Models\User;

class LanguageController extends Controller
{
    public function getLanguages()
    {
        $languages = Language::all();
        return response()->json($languages, 200);
    }

    // ユーザーのスキルを更新
    public function updateSkills(Request $request)
    {
        $request->validate([
            'skills' => 'required|array',
            'skills.*.language_id' => 'required|integer|exists:languages,language_id',
            'skills.*.level' => 'required|integer|between:1,5',
        ]);

        $user = User::find(Auth::id());
        $skills = $request->input('skills');

        foreach ($skills as $skill) {
            $language = Language::find($skill['language_id']);
            if (!$language) {
                return response()->json(['message' => 'Language not found'], 404);
            }

            $user->languages()->syncWithoutDetaching([$language->language_id => ['level' => $skill['level']]]);
        }

        return response()->json(['message' => 'Skills updated successfully'], 200);
    }


    public function getSkills()
    {
        $user = User::find(Auth::id());
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $skills = $user->languages()->get()->map(function ($language) {
            return [
                'language_id' => $language->language_id,
                'language_name' => $language->language_name,
                'level' => $language->pivot->level,
                'created_at' => $language->pivot->created_at,
                'updated_at' => $language->pivot->updated_at,
            ];
        });
        return response()->json($skills, 200);
    }

    public function deleteSkill($language_id)
    {
        $user = User::find(Auth::id());
        $language = Language::find($language_id);
        if (!$language) {
            return response()->json(['message' => 'Language not found'], 404);
        }

        $user->languages()->detach($language->language_id);

        return response()->json($language, 200);
    }

    public function searchhopeUser(Request $request)
    {
        $languageId = $request->input('language_id');

        $language = Language::find($languageId);

        if (!$language) {
            return response()->json(['error' => 'Language not found'], 404);
        }

        $results = $language->hopeUsers()->select('user_id', 'name')->distinct()->get();

        return response()->json($results);
    }

    // ユーザーの希望言語を取得
    public function getHopeLanguages()
    {
        $user = User::find(Auth::id());
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $hopeLanguages = $user->hopeLanguages()->get()->map(function ($language) {
            return [
                'language_id' => $language->language_id,
                'language_name' => $language->language_name,
                'created_at' => $language->pivot->created_at,
                'updated_at' => $language->pivot->updated_at,
            ];
        });
        return response()->json($hopeLanguages, 200);
    }

    // ユーザーの希望言語を更新
    public function updateHopeLanguages(Request $request)
    {
        $request->validate([
            'hope_languages' => 'required|array',
            'hope_languages.*.language_id' => 'required|integer|exists:languages,language_id',
        ]);

        $user = User::find(Auth::id());
        $hopeLanguages = $request->input('hope_languages');

        $user->hopeLanguages()->sync($hopeLanguages);

        return response()->json(['message' => 'Hope languages updated successfully'], 200);
    }

    // ユーザーの希望言語を削除
    public function deleteHopeLanguage($language_id)
    {
        $user = User::find(Auth::id());
        $language = Language::find($language_id);
        if (!$language) {
            return response()->json(['message' => 'Language not found'], 404);
        }

        $user->hopeLanguages()->detach($language->language_id);

        return response()->json($language, 200);
    }
}
