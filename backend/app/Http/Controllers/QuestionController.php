<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

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
}
