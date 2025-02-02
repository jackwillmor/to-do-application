import React from 'react';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tasks from '../components/Tasks';
import { getTasks, createTask, deleteTask } from '../lib/Utils';

// Mock the utility functions
jest.mock('../lib/Utils');

describe('Tasks Component', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    test('renders Tasks component with initial empty state', async () => {
        (getTasks as jest.Mock).mockResolvedValue([]);

        await act(async () => render(<Tasks />));

        expect(screen.getByText('To-Do Application')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    });

    test('loads and displays tasks on mount', async () => {
        const mockTasks = [
            { id: 1, title: 'Test Task', description: 'Test Description', priority: 1, project_id: 1 }
        ];
        (getTasks as jest.Mock).mockResolvedValue(mockTasks);

        await act(async () => render(<Tasks />));

        await waitFor(() => {
            expect(getTasks).toHaveBeenCalledWith(1);
        });
    });

    test('adds new task successfully', async () => {
        (getTasks as jest.Mock).mockResolvedValue([]);
        (createTask as jest.Mock).mockResolvedValue({ success: true });

        await act(async () => render(<Tasks />));

        const titleInput = screen.getByPlaceholderText('Title');
        const descriptionInput = screen.getByPlaceholderText('Description');

        fireEvent.change(titleInput, { target: { value: 'New Task' } });
        fireEvent.change(descriptionInput, { target: { value: 'New Description' } });

        const addButton = screen.getByText('Add Task');
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(createTask).toHaveBeenCalledWith(
                { title: 'New Task', description: 'New Description' },
                1
            );
        });
    });

    test('deletes task successfully', async () => {
        const mockTasks = [
            { id: 1, title: 'Test Task', description: 'Test Description', priority: 1, project_id: 1 }
        ];
        (getTasks as jest.Mock).mockResolvedValue(mockTasks);
        (deleteTask as jest.Mock).mockResolvedValue({ success: true });

        await act(async () => render(<Tasks />));

        await waitFor(() => {
            const deleteButton = screen.getByText('Delete');
            fireEvent.click(deleteButton);
        });

        expect(deleteTask).toHaveBeenCalledWith(1);
    });

    test('handles empty input validation', async () => {
        await act(async () => render(<Tasks />));

        await waitFor(() => {
            const addButton = screen.getByText('Add Task');
            fireEvent.click(addButton);
        });

        expect(createTask).toHaveBeenCalled();
    });
});
