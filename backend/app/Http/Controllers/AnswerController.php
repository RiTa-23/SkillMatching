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
}
