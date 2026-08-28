import { Injectable, signal, computed, inject } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class TasksService {
    crud = inject(CrudService);

    table = 'tasks';

    tasks = signal<Task[]>([]);

    async getAllTasks() {
        // is "status" correct?
        const tasks = await this.crud.getAll<Task>(this.table, 'status');
        console.log('Tasks from database:', tasks);
        console.log('Number of tasks:', tasks.length);
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

    async updateTask(id: number, task: Task) {
        await this.crud.update<Task>(this.table, id, {
            // task keys needed
            // name: task.name,
        });

        await this.getAllTasks();
    }
}
