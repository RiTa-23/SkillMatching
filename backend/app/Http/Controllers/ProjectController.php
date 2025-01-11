<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $project = Project::with('company')
            ->find($project_id);

        if ($project) {
            $project = [
                'project_id' => $project->project_id,
                'title' => $project->title,
                'company_name' => $project->company->company_name,
                'contents' => $project->contents,
                'start_date' => $project->start_date,
                'end_date' => $project->end_date,
                'status' => $project->status,
            ];

            if ($project) {
                return response()->json($project, 200);
            } else {
                return response()->json(['message' => 'プロジェクトが見つかりません'], 404);
            }
        }
    }

    public function evaluation(Request $request)
    {
        $user = User::find(Auth::id());
        $request->validate([
            'feedback' => 'required',
            'rating' => 'required|integer|between:1,5',
        ]);

        $project = Project::find($request->project_id);
        if (!$project) {
            return response()->json(['message' => 'プロジェクトが見つかりません'], 404);
        }

        $user->projects()->syncWithoutDetaching([$project->project_id => [
            'feedback' => $request->feedback,
            'rating' => $request->rating,
        ]]);

        return response()->json($project, 200);
    }
}
