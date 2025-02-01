import AxiosConfig from './AxiosConfig';
import { toast } from 'react-toastify';

export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};

export const getTasks = async (projectId) => {
    if (!projectId) {
        toast.error("Project is required!");
        return;
    }

    try {
        const response = await AxiosConfig.get(`/tasks?project_id=${projectId}`);
        const { success, tasks, message } = response.data;
        if (success) {
            return tasks;
        } else {
            toast.error(message);
            return [];
        }
    } catch (error) {
        toast.error(getErrorMessage(error));
        return [];
    }
}

export const editTask = async (task: { id: number; title: string; description: any; }) => {
    if (!task.id) {
        return;
    }
    if (!task.title) {
        toast.error("Title is required!");
        return;
    }

    try {
        const response = await AxiosConfig.put(`/tasks/${task.id}`, {
            title: task.title,
            description: task.description,
        });
        const { success, message } = response.data;
        toast[success ? 'success' : 'error'](message);
    } catch (error) {
        toast.error(getErrorMessage(error));
    }
}

export const deleteTask = async (id: number) => {
    if (!id) {
        toast.error("Not a valid task!");
        return;
    }

    try {
        const response = await AxiosConfig.delete(`/tasks/${id}`);
        const {success, message} = response.data;
        toast[success ? 'success' : 'error'](message);
    } catch (error) {
        toast.error(getErrorMessage(error));
    }
}

export const createTask = async (task: { title: any; description: any; }, projectId: number) => {
    if (!projectId) {
        toast.error("Project is required!");
        return;
    }
    if (!task.title) {
        toast.error("Title is required!");
        return;
    }

    try {
        const response = await AxiosConfig.post(`/tasks?project_id=${projectId}`, {
            title: task.title,
            description: task.description,
            priority: 1,
        });
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}
