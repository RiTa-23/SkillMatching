<?php

// app/Http/Controllers/AuthController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|unique:users,user_id',
            'password' => 'required|min:6',
        ]);
        $validated['password'] = bcrypt($validated['password']);
        
        $user = User::create($validated);
        
        return response()->json(['message' => 'User registered successfully.']);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'user_id' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $token = $request->user()->createToken('auth_token')->plainTextToken;

            return response()->json(['token' => $token]);
        }

        return response()->json(['message' => 'Invalid credentials.'], 401);
    }
}
