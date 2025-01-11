<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Answer;

class AnswerController extends Controller
{
    public function saveAnswers(Request $request)
    {
        $user_id = Auth::id();
        $answers = $request->answers;
        foreach ($answers as $answer) {
            Answer::create([
                'user_id' => $user_id,
                'question_id' => $answer['question_id'],
                'answer' => $answer['answer'],
            ]);
        }
        return response()->json($answers, 200);
    }

    public function getAnswerHistory(Request $request)
    {
        $user_id = Auth::id();
        $limit = $request->query('limit', 5);
        $answers = Answer::with('question', 'question.category', 'question.language')
            ->where('user_id', $user_id)
            ->take($limit)
            ->get()
            ->map(
                function ($answer) {
                    return [
                        'question_id' => $answer->question_id,
                        'question' => $answer->question->question_text,
                        'category' => $answer->question->category->category_name,
                        'language' => $answer->question->language->language_name,
                        'answer' => $answer->answer,
                    ];
                }
            );
        return response()->json($answers, 200);
    }
}
