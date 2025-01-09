<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function getProjects()
    {
        $projects = Project::with('company')
            ->get()
            ->map(function ($project) {
                return [
                    'project_id' => $project->project_id,
                    'title' => $project->title,
                    'company_name' => $project->company->company_name,
                    'contents' => $project->contents,
                    'start_date' => $project->start_date,
                    'end_date' => $project->end_date,
                    'status' => $project->status,
                ];
            });

        return response()->json($projects, 200);
    }
}
