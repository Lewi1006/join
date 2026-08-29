import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Task } from '../../shared/interfaces/task.interface';
import { TaskStatus } from '../../shared/interfaces/column.interface';
import { Tasks } from '../../share/services/tasks';
import { TasksService } from '../../shared/services/tasks.service';

@Component({
    selector: 'app-task-form',
    imports: [ReactiveFormsModule],
    templateUrl: './task-form.html',
    styleUrl: './task-form.scss',
})
export class TaskForm {
    taskForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        dueDate: new FormControl(''),
        category: new FormControl(''),
    });

    categories = [
        'Technical task',
        'User Story',
    ];

    taskService = inject(TasksService);

    async onSubmit() {
        if (this.taskForm.valid) {
            const task: Task = {
                description: this.taskForm.value.description!,
                title: this.taskForm.value.title!,
                status: TaskStatus.Todo,
                dueDate: this.taskForm.value.dueDate!,
                category: this.taskForm.value.category!,
            };

            console.log(task);

            this.taskService.createTask(task);
        }
    }
}
