<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectFeedback extends Model
{
    use HasFactory;

    protected $table = 'project_feedback';

    protected $fillable = [
        'project_id',
        'user_id',
        'role_id',
        'feedback',
        'rating',
    ];

    
}
