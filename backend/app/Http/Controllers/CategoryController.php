<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * カテゴリ一覧を取得する
     *
     * @return \Illuminate\Http\Response
     */
    public function getCategory()
    {
        try {
            $categories = Category::all();
            return response()->json($categories,200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
