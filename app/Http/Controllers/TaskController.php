<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\ListTasksRequest;
use App\Http\Requests\Task\ReorderTasksRequest;
use App\Http\Requests\Task\UpdateTasksRequest;
use App\Services\ProjectService;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * @var ProjectService
     */
    protected ProjectService $projectService;

    /**
     * @var TaskService
     */
    protected TaskService $taskService;

    /**
     * @param ProjectService $projectService
     * @param TaskService $taskService
     */
    public function __construct(ProjectService $projectService, TaskService $taskService)
    {
        $this->projectService = $projectService;
        $this->taskService = $taskService;
    }

    public function index()
    {
        $projects = $this->projectService->getAllProjects();

        return view('tasks.index', compact('projects'));
    }

    public function list(ListTasksRequest $request): JsonResponse
    {
        $tasks = $this->taskService->list($request->get('project_id'));

        return response()->json([
            'success' => true,
            'tasks' => $tasks,
            'message' => 'Tasks retrieved successfully',
        ]);
    }

    public function store(CreateTaskRequest $request): JsonResponse
    {
        $this->taskService->store($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Task created successfully'
        ], 201);
    }

    public function get(int $id): JsonResponse
    {
        $task = $this->taskService->getById($id);

        if ($task) {
            return response()->json([
                'success' => true,
                'task' => $task,
                'message' => 'Task retrieved successfully'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Task not found'
            ], 404);
        }
    }

    public function update(UpdateTasksRequest $request, int $id): JsonResponse
    {
        $this->taskService->update($id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully'
        ], 201);
    }

    public function delete(int $id): JsonResponse
    {
        $this->taskService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Task deleted successfully'
        ], 201);
    }
}
