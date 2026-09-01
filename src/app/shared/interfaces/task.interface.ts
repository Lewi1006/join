import { Contact } from "./contact.interface";

import { TaskStatus } from "./column.interface";

export interface Task{
    id?: number;
    createdAt?: string;
    description?: string;
    title?: string;
    status?: TaskStatus;
    subtaskCount?: number;
    assignees?: Contact[];
    subtasks?: string[];
    dueDate?: string;
    category?: string;
    priority?: string;
}