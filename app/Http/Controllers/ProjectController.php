<?php

namespace App\Http\Controllers;

use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    /**
     * @param ProjectService $projectService
     */
    protected ProjectService $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function list(): JsonResponse
    {
        $projects = $this->projectService->getAllProjects();

        return response()->json([
            'success' => true,
            'projects' => $projects,
            'message' => 'Projects retrieved successfully',
        ]);
    }
}
