<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Log;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        Log::info('RoleMiddleware handle method called', ['role' => $roles]);

        // トークンを取得
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // トークンを解析
        $personalAccessToken = PersonalAccessToken::findToken($token);

        if (!$personalAccessToken) {
            return response()->json(['message' => 'Invalid token'], 403);
        }

        // トークンの abilities を確認
        $abilities = $personalAccessToken->abilities;

        // role_id のチェック
        $hasValidRole = false;
        foreach ($roles as $role) {
            $expectedRole = 'role_id:' . $role;
            if (in_array($expectedRole, $abilities)) {
                $hasValidRole = true;
                break;
            }
        }

        if (!$hasValidRole) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}
