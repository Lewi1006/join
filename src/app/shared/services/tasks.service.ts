import { Injectable, signal, inject } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class TasksService {
    // #region Properties
    crud = inject(CrudService);
    table = 'tasks';
    tasks = signal<Task[]>([]);
    // #endregion

    // #region Methods
    async getAllTasks() {
        const tasks = await this.crud.getAll<Task>(this.table);
        this.tasks.set(tasks);
    }

    async createTask(task: Task) {
        const createdTask = await this.crud.create<Task>(this.table, task);
        await this.getAllTasks();
        return createdTask;
    }

    async deleteTask(id: number) {
        await this.crud.delete(this.table, id);
        await this.getAllTasks();
    }

    async updateTask(id: number, changes: Partial<Task>) {
        const patch = { ...changes, updated_at: new Date().toISOString() };
        await this.crud.update<Task>(this.table, id, patch);
        await this.getAllTasks();
    }
    // #endregion
}
