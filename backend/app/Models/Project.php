<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectFeedback;

class Project extends Model
{
    protected $primaryKey = 'project_id';
    protected $fillable = [
        'title',
        'company_id',
        'contents',
        'start_date',
        'end_date',
        'status',
    ];

    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id', 'company_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'project_id');
    }

    /**
     * 関連するユーザー
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    /**
     * 関連する役割
     */
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }

    public function feedbacks()
    {
        return $this->hasMany(ProjectFeedback::class, 'project_id', 'project_id');
    }
}
