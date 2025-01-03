<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\CompanyController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => '接続テスト成功']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);

Route::middleware(['auth:sanctum'])
    ->group(function () {
        Route::post('/signout', [AuthController::class, 'signout']);
        Route::get('/user', [UserController::class, 'getUser']);
        Route::put('/user', [UserController::class, 'updateUser']);
        Route::get('/language', [LanguageController::class, 'getLanguages']);
        Route::put('/skill', [languageController::class, 'update']);
        Route::get('/skill', [LanguageController::class, 'getSkills']);
        Route::delete('/skill/{language_id}', [LanguageController::class, 'deleteSkill']);
        Route::get('/company', [CompanyController::class, 'getCompanies']);
    });
