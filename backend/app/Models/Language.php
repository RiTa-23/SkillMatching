<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $primaryKey = 'language_id'; // 主キーを指定
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'language_id', // 言語IDフィールド
        'name', // 言語名フィールド
    ];

    public function mastered()
    {
        return $this->hasMany(User::class)->withTimestamps();
    }
}
