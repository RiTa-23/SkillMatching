<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectFeedback;

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

    public function storeFeedback(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'user_id' => 'required|exists:users,user_id',
            'role_id' => 'required|exists:roles,role_id',
            'feedback' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        $feedback = ProjectFeedback::create($validated);

        return response()->json(['message' => 'Feedback submitted successfully.', 'data' => $feedback], 201);
    }
}
