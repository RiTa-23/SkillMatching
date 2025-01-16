<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Language;
use App\Models\Category;
use App\Models\Company;

class QuestionController extends Controller
{
    public function getQuestions($company_id)
    {
        $questions = Question::where('company_id', $company_id)
            ->with(['category', 'language', 'company'])
            ->get()
            ->map(function ($question) {
                return [
                    'question_id' => $question->question_id,
                    'category_name' => $question->category->category_name,
                    'language_name' => $question->language->language_name,
                    'question_text' => $question->question_text,
                    'company_name' => $question->company->company_name,
                ];
            });
        return response()->json($questions, 200);
    }

    public function getAllQuestion()
    {
        $questions = Question::select('question_id', 'company_id', 'question_text')->get();

        return response()->json([
            'data' => $questions,
        ], 200);
    }

    public function store(Request $request)
    {
        // 入力データのバリデーション
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,company_id',
            'language_id' => 'nullable|exists:languages,language_id',
            'category_id' => 'nullable|exists:categories,category_id',
            'question_text' => 'required|string|max:1000',
            'step' => 'required|in:language,category',
            'selectedOption' => 'required|integer', // selectedOptionが整数であることを確認
        ]);

        // `step` に基づいて、`language_id` または `category_id` をセット
        if ($validated['step'] === 'language') {
            $validated['language_id'] = $validated['selectedOption']; // language_idを設定
            $validated['category_id'] = null; // category_idはnullに
        } elseif ($validated['step'] === 'category') {
            $validated['category_id'] = $validated['selectedOption']; // category_idを設定
            $validated['language_id'] = null; // language_idはnullに
        }

        // データを作成
        $question = Question::create([
            'company_id' => $validated['company_id'],
            'language_id' => $validated['language_id'], // nullableなのでそのまま渡す
            'category_id' => $validated['category_id'], // nullableなのでそのまま渡す
            'question_text' => $validated['question_text'],
        ]);

        return response()->json([
            'message' => 'Question created successfully.',
            'data' => $question,
        ], 201);
    }

    public function getRelatedOptions(Request $request)
    {

        $validated = $request->validate([
            'type' => 'required|in:language,category', // 'language' または 'category' のどちらか
            'id' => 'required|integer', // 選択された言語またはカテゴリーのID
        ]);

        $id = (int) $validated['id'];  // ここでIDを整数にキャスト

        if ($validated['type'] === 'language') {
            // 言語に基づく関連する言語を取得
            $relatedLanguages = Language::where('language_id', $id)->get();
            return response()->json(['data' => $relatedLanguages], 200);
        } elseif ($validated['type'] === 'category') {
            // カテゴリーに基づく関連するカテゴリーを取得
            $relatedCategories = Category::where('category_id', $id)->get();
            return response()->json(['data' => $relatedCategories], 200);
        }
    }

    public function getOneQuestion(int $id)
    {
        try {
            // 質問をIDで検索
            $question = Question::findOrFail($id);

            // 質問データをJSONで返却
            //dd($question); // ここでデータを確認
            return response()->json($question);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // 質問を更新
    public function update(Request $request, $id)
    {
        $question = Question::find($id);
        if (!$question) {
            return response()->json(['error' => 'Question not found'], 404);
        }
        
        $question->question_text = $request->input('question_text');
        $question->save();

        return response()->json($question);
    }
}
