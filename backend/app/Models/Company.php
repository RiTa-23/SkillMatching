<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $primaryKey = 'company_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company_name', // 言語名フィールド
    ];

    public function questions()
    {
        return $this->hasMany(Question::class, 'company_id', 'company_id');
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'company_id', 'company_id');
    }
}
