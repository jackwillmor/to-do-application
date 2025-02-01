<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    /**
     * Get list of tasks for a project
     * @param int $projectId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function list(int $projectId)
    {
        return Task::with('project')->where('project_id', $projectId)
            ->orderBy('id', 'desc')->get();
    }

    /**
     * Get task by id
     * @param int $id
     * @return Task|null
     */
    public function getById(int $id)
    {
        return Task::with('project')->where('id', $id)->first();
    }

    /**
     * Store a new task
     * @param array $data
     * @return void
     */
    public function store(array $data): void
    {
        Task::create($data);
    }

    /**
     * Update task by id
     * @param int $id
     * @param array $data
     * @return void
     */
    public function update(int $id, array $data): void
    {
        $task = $this->getById($id);
        if (!$task) {
            return;
        }

        $task->update($data);
    }

    /**
     * Delete task by id
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        $task = $this->getById($id);
        if (!$task) {
            return;
        }

        $task->delete();
    }
}
