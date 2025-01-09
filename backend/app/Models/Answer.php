<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $primaryKey = 'answer_id'; // 主キーを指定
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'question_id',
        'answer',
        'response_value',
        'additional_notes',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id', 'question_id');
    }
}
