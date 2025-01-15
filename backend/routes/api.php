<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\CategoryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => '接続テスト成功']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);

Route::get('/searchhope', [LanguageController::class, 'searchhopeUser']);
Route::get('/search', [SearchController::class, 'searchUsers']);
Route::get('/language', [LanguageController::class, 'getLanguages']);
Route::get('/category', [CategoryController::class, 'getCategory']);

Route::post('/feedback', [ProjectController::class, 'storeFeedback']);
Route::get('/users', [UserController::class, 'getAllUsers']);
Route::get('/project', [ProjectController::class, 'getProjects']);
Route::get('/role', [RoleController::class, 'getRole']);

Route::middleware(['auth:sanctum'])
    ->group(function () {
        Route::post('/signout', [AuthController::class, 'signout']);
        Route::put('/user', [UserController::class, 'updateUser']);
        //Route::get('/language', [LanguageController::class, 'getLanguages']);
        Route::put('/skill', [languageController::class, 'update']);
        Route::get('/skill', [LanguageController::class, 'getSkills']);
        Route::get('/company', [CompanyController::class, 'getCompanies']);
        Route::delete('/skill/{language_id}', [LanguageController::class, 'deleteSkill']);
        Route::get('/question/{company_id}', [QuestionController::class, 'getQuestions']);
        Route::post('/answer', [AnswerController::class, 'saveAnswers']);
        Route::get('/answer/history', [AnswerController::class, 'getAnswerHistory']);
        //Route::get('/project', [ProjectController::class, 'getProjects']);
        Route::get('/project/{project_id}', [ProjectController::class, 'getProject']);
        Route::post('/project/{project_id}/evaluation', [ProjectController::class, 'evaluation']);

        Route::middleware('role' . ':1')
            ->group(function () {
                Route::get('/admin', function () {
                    return response()->json(['message' => '管理者のみアクセス可能なページです']);
                });
                Route::get('/user', [UserController::class, 'getUser']);
            });
        Route::middleware('role' . ':2')
            ->group(function () {
                Route::get('/client', function () {
                    return response()->json(['message' => 'クライアントのみアクセス可能なページです']);
                });
            });
        Route::middleware('role' . ':3')
            ->group(function () {
                Route::get('/employee', function () {
                    return response()->json(['message' => '社員のみアクセス可能なページです']);
                });
            });
        Route::middleware('role' . ':4')
            ->group(function () {
                Route::get('/guest', function () {
                    return response()->json(['message' => 'ゲストのみアクセス可能なページです']);
                });
            });
    });
