import { TaskStatus } from "./column.interface";
import { Contact } from "./contact.interface";

export interface Task{
    id?: number;
    created_at?: number;
    description?: string;
    title: string;
    status: TaskStatus;
    subtaskCount?: number;
    subtasks?: string[];
    dueDate: string;
    category: string;
    priority?: string;
    assignees?: Contact[];
}