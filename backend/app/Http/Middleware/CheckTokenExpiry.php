<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class CheckTokenExpiry
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // 現在のユーザーを取得
        $user = Auth::user();

        // ユーザーがログインしており、トークンが存在する場合
        if ($user) {
            // ユーザーのトークンを取得
            $token = $user->tokens->first();

            if ($token && $token->expires_at && Carbon::parse($token->expires_at)->isPast()) {
                // トークンが期限切れの場合、ログアウトさせる
                $user->tokens->each(function ($token) {
                    $token->delete();
                });
                return response()->json(['message' => 'Token expired. Please log in again.'], 401);
            }
        }

        return $next($request);
    }
}
