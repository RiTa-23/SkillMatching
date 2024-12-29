<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class AuthController extends Controller
{
    // ユーザー登録
    public function register(Request $request)
    {
        $user = User::create([
            'user_id' => $request->user_id,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $json = [
            'data' => $user
        ];
        return response()->json($json, Response::HTTP_OK);
    }

    // ログイン処理
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'user_id' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = User::where('user_id', $request->user_id)->first();
            $user->tokens()->delete();  // 古いトークンを削除

            // トークンの生成
            $tokenResult = $user->createToken('token');
            $token = $tokenResult->plainTextToken;

            // トークンの有効期限を設定
            $tokenResult->accessToken->expires_at = Carbon::now()->addSeconds(60); // 例: 60分
            $tokenResult->accessToken->save();

            return response()->json(['token' => $token], Response::HTTP_OK);
        }

        return response()->json('Can Not Login.', Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // ログアウト
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json('Logout Success.', Response::HTTP_OK);
    }

    // ユーザー情報取得
    public function getUser(Request $request)
    {
        return response()->json($request->user(), Response::HTTP_OK);
    }
}
