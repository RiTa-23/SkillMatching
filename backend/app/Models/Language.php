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
        'language_name', // 言語名フィールド
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_language', 'language_id', 'user_id')->withPivot('level')->withTimestamps();
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'language_id', 'language_id');
    }

    public function hopeUsers()
    {
        return $this->belongsToMany(User::class, 'user_hope_language', 'language_id', 'user_id')
                    ->withTimestamps();
    }
}
