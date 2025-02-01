<?php

namespace Tests\Api;

use App\Models\Project;
use App\Models\Task;
use Codeception\Example;
use Tests\Support\ApiTester;

class TasksCest
{
    /**
     * Test list all tasks returns a 200 and valid json response
     * @param ApiTester $I
     * @return void
     */
    public function testListAllTasksByProject(ApiTester $I): void
    {
        // Arrange
        $project = $I->grabRecord(Project::class, ['name' => 'Project 1'])->pluck('id')->first();

        // Act
        $I->sendGet('/api/tasks', ['project_id' => $project]);

        // Assert
        $I->seeResponseCodeIs(200);
        $response = $I->grabResponse();
        $I->assertJson($response);
    }

    /**
     * Test list all tasks returns a 200 and valid json response
     * @param ApiTester $I
     * @return void
     * @example { "valid": true }
     * @example { "valid": false }
     * @group getTask
     */
    public function testGetTaskById(ApiTester $I, Example $example): void
    {
        // Arrange
        if ($example['valid']) {
            $task = $I->grabRecord(Task::class, ['title' => 'Task 1'])->pluck('id')->first();
        } else {
            $task = 50;
        }

        // Act
        $I->sendGet('/api/tasks/' . $task);

        // Assert
        if ($example['valid']) {
            $I->seeResponseCodeIs(200);
            $response = $I->grabResponse();
            $I->assertJson($response);
            $toArray = json_decode($response, true);
            $I->assertArrayHasKey('success', $toArray);
            $I->assertEquals(true, $toArray['success']);
        } else {
            $I->seeResponseCodeIs(404);
        }
    }

    /**
     * Test create task returns a 201 and valid json response
     * @param ApiTester $I
     * @return void
     */
    public function testCreateTask(ApiTester $I): void
    {
        // Arrange
        $project = $I->grabRecord(Project::class, ['name' => 'Project 1'])->pluck('id')->first();
        $taskPayload = ['title' => 'Test Task', 'description' => 'Test Description', 'priority' => 1, 'project_id' => $project];

        // Act
        $I->sendPost('/api/tasks', $taskPayload);

        // Assert
        $I->seeResponseCodeIs(201);
        $response = $I->grabResponse();
        $I->assertJson($response);
        $toArray = json_decode($response, true);
        $I->assertArrayHasKey('success', $toArray);
        $I->assertEquals(true, $toArray['success']);
    }

    /**
     * Test update task returns a 201 and valid json response
     * @param ApiTester $I
     * @return void
     * @example { "valid": true }
     * @example { "valid": false }
     */
    public function testUpdateTask(ApiTester $I, Example $example): void
    {
        // Arrange
        if ($example['valid']) {
            $task = $I->grabRecord(Task::class, ['title' => 'Task 1'])->pluck('id')->first();
        } else {
            $task = 50;
        }

        // Act
        $I->sendPut('/api/tasks/' . $task, ['title' => 'Updated Task', 'description' => 'Updated Description']);

        // Assert
        $I->seeResponseCodeIs(201);
        $response = $I->grabResponse();
        $I->assertJson($response);
        $toArray = json_decode($response, true);
        $I->assertArrayHasKey('success', $toArray);
        $I->assertEquals(true, $toArray['success']);
    }

    /**
     * Test delete task returns a 201 and valid json response
     * @param ApiTester $I
     * @return void
     */
    public function testDeleteTask(ApiTester $I)
    {
        // Arrange
        $task = $I->grabRecord(Task::class, ['title' => 'Task 1'])->pluck('id')->first();

        // Act
        $I->sendDelete('/api/tasks/' . $task);

        // Assert
        $I->seeResponseCodeIs(201);
        $I->dontSeeRecord(Task::class, ['id' => $task]);
    }
}
