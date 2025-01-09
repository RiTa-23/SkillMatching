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
    public function update(Request $request)
    {
        $request->validate([
            'language_id' => 'required|integer|exists:languages,language_id',
            'level' => 'required|integer|between:1,5',
        ]);

        $user = User::find(Auth::id());
        $language = Language::find($request->language_id);
        if (!$language) {
            return response()->json(['message' => 'Language not found'], 404);
        }

        $user->languages()->syncWithoutDetaching([$language->language_id => ['level' => $request->level]]);

        return response()->json($language, 200);
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

    public function searchUsersByLanguage(Request $request)
    {
        $request->validate([
            'language_id' => 'required|exists:languages,language_id',
            'level' => 'required|integer|min:1|max:5',
        ]);

        $languageId = $request->input('language_id');
        $level = $request->input('level');

        $users = \DB::table('user_language')
            ->join('users', 'user_language.user_id', '=', 'users.user_id')
            ->join('languages', 'user_language.language_id', '=', 'languages.language_id')
            ->where('user_language.language_id', $languageId)
            ->where('user_language.level', $level)
            ->select('users.user_id', 'users.name', 'languages.language_name', 'user_language.level')
            ->get();
        return response()->json($users, 200);
    }
}
