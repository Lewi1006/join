import { TaskStatus } from "./column.interface";

export interface Task{
    id?: number;
    createdAt?: number;
    description?: string;
    title: string;
    status: TaskStatus;
    subtaskCount?: number;
    assignees?: number[];
    subtasks?: string[];
    dueDate: string;
    category: string;
    priority?: string;
}