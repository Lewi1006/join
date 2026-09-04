import { Component, inject, signal, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Task } from '../../shared/interfaces/task.interface';
import { TaskStatus } from '../../shared/interfaces/column.interface';
import { TasksService } from '../../shared/services/tasks.service';
import { ContactsService } from '../../shared/services/contacts.service';
import { InitialsPipe } from '../../shared/pipes.pipe';
import { Contact } from '../../shared/interfaces/contact.interface';
import { Subtask } from '../../shared/interfaces/subtask.interface';

@Component({
    selector: 'app-task-form',
    imports: [ReactiveFormsModule, InitialsPipe],
    templateUrl: './task-form.html',
    styleUrl: './task-form.scss',
})
export class TaskForm {
    taskService = inject(TasksService);
    dbService = inject(ContactsService);
    task = input<Task>();
    saved = output<void>();

    divClassList = 'd-none';
    toggleDisplayNone() {
        if (this.divClassList == '') {
            this.divClassList = 'd-none';
        } else {
            this.divClassList = '';
        }
    }

    subtasks = signal<Subtask[]>([]);
    assignees = signal<Contact[]>([]);

    // input true in the dialog so button is only visible when the dialog is open
    showCloseButton = input(false);
    closeDialog = output<void>();

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
        const task = this.task();
        if (task) {
            this.taskForm.patchValue({
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                category: task.category,
                priority: task.priority,
            });
            this.assignees.set(task.assignees ?? []);
            this.subtasks.set(task.subtasks ?? []);
        }
    }

    assignContact(contact: Contact) {
        this.assignees.update((assignees) => [...assignees, contact]);
        console.log(this.assignees());
    }

    addSubtask() {
        const inputSubtaskRef = <HTMLInputElement>document.getElementById('input-subtask');
        let newSubtaskDescription = inputSubtaskRef?.value;

        const newSubtask: Subtask = {
            description: newSubtaskDescription,
            checked: false,
        };

        this.subtasks.update((subtasks) => [...subtasks, newSubtask]);
        console.log(newSubtask);
    }

    async onSubmit() {
        console.log(this.taskForm.value);
        if (this.taskForm.valid) {
            const dueDate = this.taskForm.value.dueDate;

            const task: Task = {
                description: this.taskForm.value.description!,
                title: this.taskForm.value.title!,
                status: TaskStatus.Todo,
                dueDate: dueDate || undefined,
                category: this.taskForm.value.category!,
                priority: this.taskForm.value.priority!,
                assignees: this.assignees()!,
                subtasks: this.subtasks()!,
            };
            const id = this.task()?.id;
            if (id) {
                this.taskService.updateTask(id, task);
            } else {
                this.taskService.createTask(task);
                console.log('task created');
            }
        }
        this.saved.emit();
    }

    toggleSubtask(subtask: Subtask) {
        // Update the subtasks signal
        this.subtasks.update((subtasks) => {
            // Go through every subtask in the array
            for (const currentSubtask of subtasks) {
                // Check if this is the subtask that was clicked
                if (currentSubtask === subtask) {
                    // Change checked to the opposite value
                    currentSubtask.checked = !currentSubtask.checked;
                }
            }
            console.log(subtasks);

            return subtasks;
        });
    }
}
