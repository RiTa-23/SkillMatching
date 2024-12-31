<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // ログインしているユーザーの情報を取得
    public function getUser()
    {
        return response()->json(Auth::user(), 200);
    }
}
