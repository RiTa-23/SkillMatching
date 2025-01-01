<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Language;

class LanguageController extends Controller
{
    public function getLanguages()
    {
        $languages = Language::all();
        return response()->json($languages, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'language_id' => 'required|integer|exists:languages,language_id',
            'level' => 'required|integer|between:1,5',
        ]);

        $language = Language::find($request->language_id);
        if (!$language) {
            return response()->json(['message' => 'Language not found'], 404);
        }

        $language->users()->attach(Auth::id(), ['level' => $request->level]);

        return response()->json($language, 200);
    }
}
