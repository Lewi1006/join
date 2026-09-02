import { Contact } from "./contact.interface";
import { TaskStatus } from "./column.interface";
import { Subtask } from "./subtask.interface";

export interface Task{
    id?: number;
    createdAt?: string;
    description?: string;
    title?: string;
    status?: TaskStatus;
    subtaskCount?: number;
    assignees?: Contact[];
    subtasks?: Subtask[];
    dueDate?: string;
    category?: string;
    priority?: string;
}