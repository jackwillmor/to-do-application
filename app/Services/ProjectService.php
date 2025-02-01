<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

class ProjectService
{
    /**
     * Return list of all projects
     * @return Collection
     */
    public function getAllProjects(): Collection
    {
        return Project::all();
    }
}
