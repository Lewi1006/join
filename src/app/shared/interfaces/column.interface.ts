export interface BoardColumn {
    title: string;
    status: TaskStatus;
}

export enum TaskStatus {
    Todo = 'todo',
    InProgress = 'in-progress',
    AwaitFeedback = 'await-feedback',
    Done = 'done',
}
