<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
     use HasFactory;
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

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_category', 'category_id', 'user_id')
                    ->withPivot('level') // 中間テーブルの追加フィールド（レベル）
                    ->withTimestamps(); // タイムスタンプ
    }

}
