<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = Project::all()->pluck('id')->toArray(); // Get all project ids

        $now = now();
        $tasks = [];

        // Create 20 tasks
        for ($i = 1; $i <= 20; $i++) {
            $projectId = $projects[array_rand($projects)];

            $tasks[] = [
                'title' => 'Task ' . $i,
                'priority' => rand(1, 5),
                'description' => 'Description for Task ' . $i,
                'project_id' => $projectId,
                'created_at' => $now,
                'updated_at' => $now
            ];
        }

        Task::insert($tasks);
    }
}
