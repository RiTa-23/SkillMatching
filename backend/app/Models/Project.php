<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
