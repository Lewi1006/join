import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Task } from '../../shared/interfaces/task.interface';
import { TaskStatus } from '../../shared/interfaces/column.interface';
import { Tasks } from '../../share/services/tasks';
import { TasksService } from '../../shared/services/tasks.service';
import { ContactsService } from '../../shared/services/contacts.service';
import { InitialsPipe } from '../../shared/pipes.pipe';
import { Contact } from '../../shared/interfaces/contact.interface';

@Component({
    selector: 'app-task-form',
    imports: [ReactiveFormsModule, InitialsPipe],
    templateUrl: './task-form.html',
    styleUrl: './task-form.scss',
})
export class TaskForm {
    taskService = inject(TasksService);
    dbService = inject(ContactsService);

    divClassList = 'd-none';
    toggleDisplayNone() {
        if(this.divClassList == ''){
            this.divClassList = 'd-none';
        } else{
            this.divClassList = '';
        };
    }

    subtasks = signal<string[]>([]);
    assignees = signal<Contact[]>([]);

    taskForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        dueDate: new FormControl(''),
        category: new FormControl(''),
        priority: new FormControl(''),
        assignees: new FormControl(''),
        subtasks: new FormControl(''),
    });

    categories = ['Technical task', 'User Story'];

    ngOnInit() {
        this.dbService.getAllContacts();
        this.dbService.cloneArray();
    }

    assignContact() {}

    addSubtask() {
        const inputSubtaskRef = (<HTMLInputElement>document.getElementById('input-subtask'));
        let newSubtask = inputSubtaskRef?.value;
        
        this.subtasks.update((subtasks) => [...subtasks, newSubtask]);
        console.log(newSubtask);

    }

    async onSubmit() {
        if (this.taskForm.valid) {
            const task: Task = {
                description: this.taskForm.value.description!,
                title: this.taskForm.value.title!,
                status: TaskStatus.Todo,
                dueDate: this.taskForm.value.dueDate!,
                category: this.taskForm.value.category!,
                priority: this.taskForm.value.priority!,
                assignees: this.assignees()!,
                subtasks: this.subtasks()!,
            };

            this.taskService.createTask(task);
        }
    }
}
