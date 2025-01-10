<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function getProjects()
    {
        $projects = Project::get()
            ->map(function ($project) {
                return [
                    'project_id' => $project->project_id,
                    'title' => $project->title,
                    'status' => $project->status,
                ];
            });

        return response()->json($projects, 200);
    }

    public function getProject($project_id)
    {
        $project = Project::find($project_id);

        if ($project) {
            return response()->json($project, 200);
        } else {
            return response()->json(['message' => 'プロジェクトが見つかりません'], 404);
        }
    }
}
