import React, {useState, useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import {getProjects, getTasks, createTask, deleteTask} from '../lib/Utils';
import {InputComponent} from './InputComponent';
import {ButtonComponent} from './ButtonComponent';
import {SelectComponent} from './SelectComponent';

type TaskProps = {
    initialProjectId: number;
    title?: string;
    onProjectChange?: () => void;
    onTaskChange?: () => void;
}

interface Project {
    id: number;
    name: string;
    description: string;
}

interface Task {
    id: number;
    title: string;
    description: string;
    priority: number;
    project_id: number;
    created: string|null;
}

/**
 * Returns a list of tasks for a given project ID.
 *
 * @param initialProjectId
 * @param title
 * @param onProjectChange
 * @param onTaskChange
 * @return {React.ReactElement}
 */
function Tasks({
    initialProjectId = 1,
    title = 'To-Do Application',
    onProjectChange,
    onTaskChange
}: TaskProps): React.ReactElement {
    const [projectId, setProjectId] = useState(initialProjectId);
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        loadProjects().then(projectsData => setProjects(projectsData));
        loadTasks().then(tasksData => setTasks(tasksData));
    }, [projectId]);

    /**
     * Returns a list of projects.
     */
    const loadProjects = async () => {
        const projectsData = await getProjects();
        onProjectChange?.();
        return projectsData;
    };

    /**
     * Returns a list of tasks for a given project ID.
     */
    const loadTasks = async () => {
        const tasksData = await getTasks(projectId);
        onTaskChange?.();
        return tasksData;
    };

    /**
     * Handles the change of the project ID.
     * @param projectId
     */
    const handleProjectChange = async (projectId: string) => {
        setProjectId(parseInt(projectId));
        loadTasks().then(tasksData => setTasks(tasksData));
    };

    /**
     * Handles the addition of a new task.
     */
    const handleAddTask = async () => {
        if (!taskTitle.trim()) return;

        await createTask({ title: taskTitle, description }, projectId);

        setTaskTitle('');
        setDescription('');
        loadTasks().then(tasksData => setTasks(tasksData));
    };

    /**
     * Handles the deletion of a task.
     * @param taskId
     */
    const handleDeleteTask = async (taskId: number) => {
        await deleteTask(taskId);
        loadTasks().then(tasksData => setTasks(tasksData));
    };

    /**
     * Renders the component.
     */
    return (
        <div>
            <ToastContainer autoClose={2000} />
            <div className="container mx-auto max-w-2xl mt-5">
                <h1 className="text-black text-center mb-5">{title}</h1>
                <div className="grid grid-cols-1">
                    <SelectComponent
                        options={projects.map(project => ({ value: project.id.toString(), label: project.name }))}
                        emptyResults="No Projects Found"
                        onChange={(e) => handleProjectChange(e.target.value)}
                    />
                    <InputComponent
                        type="text"
                        value={taskTitle}
                        placeholder="Title"
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <InputComponent
                        type="text"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <ButtonComponent
                        label="Add Task"
                        onClick={handleAddTask}
                        className="block w-full bg-green-400 rounded text-white p-1"
                    />
                </div>

                <div className="border-t border-b border-t-gray-100 border-b-gray-100 mt-10 mb-10 pt-5 pb-5">Total Tasks: {tasks.length}</div>

                <ul className="grid grid-cols-1">
                    {tasks.map((task) => (
                        <li key={task.id} className="grid grid-cols-1 content-center border border-gray-200 mb-5 p-5 relative">
                            <ButtonComponent
                                label="Delete"
                                onClick={() => handleDeleteTask(task.id)}
                                className="bg-red-400 rounded p-2 text-white absolute top-0 right-0"
                            />
                            <h3>{task.title}</h3>
                            <div className="mt-5">{task.description}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Tasks;
