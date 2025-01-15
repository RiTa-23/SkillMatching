<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectFeedback;

class Role extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'role_id', // 役割IDフィールド
        'role_name', // 役割名フィールド
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

     public function feedbacks()
    {
        return $this->hasMany(ProjectFeedback::class, 'role_id', 'role_id');
    }
}
