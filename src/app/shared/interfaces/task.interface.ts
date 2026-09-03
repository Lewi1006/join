import { Contact } from './contact.interface';
import { TaskStatus } from './column.interface';
import { Subtask } from './subtask.interface';

export interface Task {
    id?: number;
    created_at?: string;
    description?: string;
    title?: string;
    status?: TaskStatus;
    subtaskCount?: number;
    subtasks?: Subtask[];
    dueDate?: string;
    category?: string;
    priority?: string;
    assignees?: Contact[];
    updated_at?: string;
}
