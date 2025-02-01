<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate 5 projects
        for ($i = 1; $i <= 5; $i++) {
            Project::create([
                'name' => 'Project ' . $i,
                'description' => 'Description for Project ' . $i
            ]);
        }
    }
}
