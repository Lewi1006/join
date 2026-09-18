import { Component, inject, signal, input, output, AfterViewInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../shared/interfaces/task.interface';
import { TaskStatus } from '../../shared/interfaces/column.interface';
import { TasksService } from '../../shared/services/tasks.service';
import { ContactsService } from '../../shared/services/contacts.service';
import { InitialsPipe } from '../../shared/pipes.pipe';
import { Contact } from '../../shared/interfaces/contact.interface';
import { Subtask } from '../../shared/interfaces/subtask.interface';
import { DateValidator, SubtaskValidator } from '../../shared/validators';
import { ConfirmationPopup } from '../task-comp/confirmation-popup/confirmation-popup';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';
import { AlertType } from '../../shared/interfaces/alert.interface';

@Component({
    selector: 'app-task-form',
    imports: [ReactiveFormsModule, InitialsPipe, ConfirmationPopup],
    templateUrl: './task-form.html',
    styleUrl: './task-form.scss',
})
export class TaskForm implements AfterViewInit {
    // #region properties
    taskService = inject(TasksService);
    dbService = inject(ContactsService);
    alertService = inject(AlertService);
    router = inject(Router);

    task = input<Task>();
    saved = output<void>();
    // input true in the dialog so button is only visible when the dialog is open
    showCloseButton = input(false);
    closeDialog = output<void>();

    divClassList = signal('d-none');
    subtasks = signal<Subtask[]>([]);
    assignees = signal<Contact[]>([]);
    popupVisible = signal(false);

    priority = 'Medium';
    urgentSelected = '';
    mediumSelected = 'medium-selected';
    lowSelected = '';

    assigneeSelected = '';

    dropdownArrow = 'arrow-down';

    categories = ['Technical task', 'User Story'];

    editingSubtaskFormControl = new FormControl('');
    editingSubtask: Subtask | undefined = undefined;

    taskForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        dueDate: new FormControl('', [Validators.required, DateValidator]),
        category: new FormControl('', [Validators.required]),
        priority: new FormControl(''),
        assignees: new FormControl(''),
        subtasks: new FormControl('', [SubtaskValidator]),
    });

    // #endregion

    // #region initialization
    ngOnInit() {
        this.dbService.getAllContacts();
        this.dbService.cloneArray();
        this.loadTask();
    }

    loadTask() {
        const task = this.task();

        if (!task) return;

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
            this.getPriority(task.priority ?? 'Medium');
        }
    }

    // closing assignee dropdown menu on click outside
    // divClassList needs to be a signal to detect the changes
    // contains() checks whether the clicked element is inside this element (child element).
    // Node as datatype expected by contains
    // ngAfterViewInit() method to handle any additional initialization tasks
    ngAfterViewInit(): void {
        document.addEventListener('click', (event) => {
            this.closeAssigneesDropdown(event);
        });
    }

    closeAssigneesDropdown(event: MouseEvent) {
        const assigneeDropdown = document.getElementById(
            this.task() ? 'edit-list-of-assignees' : 'list-of-assignees',
        );

        const assigneeInput = document.getElementById(
            this.task() ? 'edit-assignee-dropdown' : 'assignee-dropdown',
        );

        if (
            !assigneeDropdown?.contains(event.target as Node) &&
            !assigneeInput?.contains(event.target as Node)
        ) {
            this.divClassList.set('d-none');
            this.dropdownArrow = 'arrow-down';
        }
    }

    // #endregion

    // #region priority
    getPriority(priority: string) {
        this.priority = priority;
        if (priority == 'Urgent') {
            this.urgentSelected = 'urgent-clicked';
            this.mediumSelected = '';
            this.lowSelected = '';
        } else if (priority == 'Medium') {
            this.urgentSelected = '';
            this.mediumSelected = 'medium-selected';
            this.lowSelected = '';
        } else if (priority == 'Low') {
            this.urgentSelected = '';
            this.mediumSelected = '';
            this.lowSelected = 'low-selected';
        }
        return this.priority;
    }

    // #endregion

    // #region assignees
    toggleDisplayNone(event: MouseEvent) {
        event.stopPropagation();
        if (this.divClassList() == '') {
            this.dropdownArrow = 'arrow-down';
            this.divClassList.set('d-none');
        } else {
            this.divClassList.set('');
            this.dropdownArrow = 'arrow-up';
        }
    }

    assignContact(contact: Contact) {
        this.assignees.update((assignees) => {
            let alreadyAssigned = false;

            for (let i = 0; i < assignees.length; i++) {
                if (assignees[i].id === contact.id) {
                    alreadyAssigned = true;
                }
            }

            if (alreadyAssigned) {
                document.getElementById(`${contact.id}`)?.classList.remove('assigned');
                return assignees.filter((a) => a.id !== contact.id);
            } else {
                document.getElementById(`${contact.id}`)?.classList.add('assigned');
                return [...assignees, contact];
            }
        });
    }

    isAssigned(contact: Contact): boolean {
        for (let assignee of this.assignees()) {
            if (assignee.id === contact.id) {
                return true;
            }
        }

        return false;
    }
    // #endregion

    // #region subtasks
    addSubtask() {
        const inputSubtaskRef = this.taskForm.controls.subtasks;

        inputSubtaskRef.markAsTouched();

        if (!inputSubtaskRef.value || inputSubtaskRef.invalid) return;
        // let newSubtaskDescription = inputSubtaskRef?.value;
        const newSubtask: Subtask = {
            description: inputSubtaskRef.value,
            checked: false,
        };
        this.subtasks.update((subtasks) => [...subtasks, newSubtask]);
        this.clearSubtaskInput();
    }

    editSubtask(subtask: Subtask) {
        this.editingSubtask = subtask;
        this.editingSubtaskFormControl.setValue(subtask.description);
    }

    saveSubtaskEdit(subtask: Subtask) {
        const newSubtaskDescription = this.editingSubtaskFormControl.value;

        if (newSubtaskDescription !== null) {
            this.subtasks.update((subtasks) => {
                for (const currentSubtask of subtasks) {
                    if (currentSubtask === subtask) {
                        currentSubtask.description = newSubtaskDescription;
                    }
                }
                return subtasks;
            });
            this.editingSubtask = undefined;
        }
    }

    clearSubtaskInput() {
        this.taskForm.controls.subtasks.reset();
        this.taskForm.controls.subtasks.markAsPristine();
    }

    deleteSubtask(index: number) {
        this.subtasks.update((subtasks) => {
            subtasks.splice(index, 1);
            return subtasks;
        });
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
            return subtasks;
        });
    }

    // #endregion

    // #region submit task and reset form
    taskCreated = output<void>();

    emitTaskCreated() {
        this.taskCreated.emit();
    }

    async onSubmit() {
        if (this.taskForm.invalid) {
            this.taskForm.markAllAsTouched();
            return;
        }

        const task = this.createTask();
        const id = this.task()?.id;

        if (id) {
            this.updateTask(id, task);
        } else {
            this.taskService.createTask(task);
        }

        this.saved.emit();
        this.formReset();
        this.confirmTaskCreation();
    }

    createTask(): Task {
        const dueDate = this.taskForm.value.dueDate;

        return {
            description: this.taskForm.value.description!,
            title: this.taskForm.value.title!,
            status: TaskStatus.Todo,
            dueDate: dueDate || undefined,
            category: this.taskForm.value.category!,
            priority: this.priority,
            assignees: this.assignees()!,
            subtasks: this.subtasks()!,
            updated_at: new Date().toISOString(),
        };
    }

    updateTask(id: number, task: Task) {
        this.taskService.updateTask(id, task);
        this.alertService.success('Task was edited successfully', 2000);
    }

    formReset() {
        this.taskForm.reset();
        this.assignees.set([]);
        this.subtasks.set([]);
    }

    // #endregion

    // #region alert
    confirmTaskCreation() {
        this.popupVisible.set(true);

        setTimeout(() => {
            this.popupVisible.set(false);
            this.redirectToBoard();
            this.taskCreated.emit();
        }, 1500);
    }

    redirectToBoard() {
        this.router.navigate(['/board']);
    }
    // #endregion
}
