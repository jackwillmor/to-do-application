import React, {useState, useEffect} from 'react'
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
        fetch('http://127.0.0.1:8000/api/tasks?project_id=1')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data.hasOwnProperty('tasks')) {
                    setTasks(data.tasks);
                }
            });
    }, []);

    const addTask = () => {
        const newTaskItem: Task = {
            title: title,
            description: description
        }
    }

    const deleteTask = (id: number) => {
        const updatedTask = tasks.filter((task) => task.id !== id);
        setTasks(updatedTask);
    }

    return (
        <div className="container mx-auto max-w-2xl mt-5">
            <h1 className="text-black text-center">To-Do Application</h1>
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
                    <li key={task.id} className="grid grid-cols-1 content-center">
                        <div className="grid grid-cols-2">
                            <span>{task.title}</span>
                            <button className="bg-red-400 rounded max-w-20 text-white" onClick={() => deleteTask(task.id)}>Delete</button>
                        </div>
                        <span>{task.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
