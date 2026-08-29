import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Task } from '../../shared/interfaces/task.interface';
import { TaskStatus } from '../../shared/interfaces/column.interface';

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
    });

    async onSubmit() {
        if (this.taskForm.valid) {
            const task: Task = {
                description: this.taskForm.value.description!,
                title: this.taskForm.value.title!,
                status: TaskStatus.Todo,
                dueDate: this.taskForm.value.dueDate!,
            };

            console.log(task);
        }
    }

    async createTask(){
        
    }

}
