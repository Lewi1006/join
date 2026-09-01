export interface Task{
    id?: number;
    createdAt?: number;
    description?: string;
    title: string;
    status: string;
    subtaskCount?: number;
    assignees?: number[];
    dueDate: string;
    category: string;
    priority?: string;
}