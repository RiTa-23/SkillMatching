<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    // ログインしているユーザーの情報を取得
    public function getUser()
    {
        return response()->json(Auth::user(), 200);
    }

    // ユーザー情報の更新
    public function updateUser(Request $request)
    {
        $user = User::find(Auth::id());

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->user_id . ',user_id',
            'birthday' => 'nullable|date',
        ]);

        $user->update($request->only(['name', 'email', 'birthday']));

        return response()->json($user, 200);
    }
}
