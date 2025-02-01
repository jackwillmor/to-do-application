import React, {useState, useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import {getTasks, createTask, deleteTask} from '../lib/Utils';

interface Task {
    id: number;
    title: string;
    description: string;
    priority: number;
    project_id: number;
    created: string|null;
}

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        // Hardcoded project ID for demonstration
        getTasks(1).then((tasksData) => setTasks(tasksData));
    }, []);

    const reloadTasks = () => {
        getTasks(1).then((tasksData) => setTasks(tasksData));
    };

    const addTask = () => {
        createTask({ title, description }, 1).then(() => {
            reloadTasks();
            setTitle('');
            setDescription('');
        });
    }

    const deleteItem = (id: number) => {
        deleteTask(id).then(() => {
            reloadTasks();
        });
    }

    return (
        <div>
            <ToastContainer autoClose={2000} />
            <div className="container mx-auto max-w-2xl mt-5">
                <h1 className="text-black text-center mb-5">To-Do Application</h1>
                <div className="grid grid-cols-1">
                    <input
                        type="text"
                        className="mt-1 block border-solid border rounded w-full focus:shadow-md p-2"
                        value={title}
                        placeholder={"Title"}
                        onChange={(e) => setTitle(e.target.value)}/>
                    <input
                        type="text"
                        className="mt-1 block w-full focus:shadow-md border rounded p-2"
                        value={description}
                        placeholder={"Description"}
                        onChange={(e) => setDescription(e.target.value)}/>
                    <button className="mt-1 block w-full bg-green-400 rounded text-white p-1"
                            onClick={addTask}>Add Task
                    </button>
                </div>

                <div className="border-t border-b border-t-gray-100 border-b-gray-100 mt-10 mb-10 pt-5 pb-5">Total Tasks: {tasks.length}</div>

                <ul className="grid grid-cols-1">
                    {tasks.map((task) => (
                        <li key={task.id} className="grid grid-cols-1 content-center border border-gray-200 mb-5 p-5 relative">
                            <button className="bg-red-400 rounded p-2 text-white absolute top-0 right-0"
                                    onClick={() => deleteItem(task.id)}>Delete
                            </button>
                            <h3>{task.title}</h3>
                            <div className="mt-5">{task.description}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Tasks;
