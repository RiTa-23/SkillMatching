<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $primaryKey = 'category_id'; // 主キーを指定
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'category_name', // カテゴリ名フィールド
    ];

    public function questions()
    {
        return $this->hasMany(Question::class, 'category_id', 'category_id');
    }
}
