<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    // ユーザー登録
    public function signup(Request $request)
    {
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Registration successful',
            'token' => $token
        ]);
    }

    // ログイン処理
    public function signin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = Auth::user();

        // トークンにカスタムクレームを追加
        $customClaims = [
            'role_id' => $user->role_id,
        ];

        $token = JWTAuth::claims($customClaims)->fromUser($user);

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ]);
    }

    // ログアウト
    public function signout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()
            ->json('Logout Success.', Response::HTTP_OK);
    }

    // ユーザー情報取得
    public function getUser(Request $request)
    {
        return response()->json($request->user(), Response::HTTP_OK);
    }

    // トークンのrole_idを確認
    public function checkToken(Request $request)
    {
        $token = $request->bearerToken();
        $payload = JWTAuth::setToken($token)->getPayload();

        return response()->json([
            'payload' => $payload,
        ]);
    }
}
