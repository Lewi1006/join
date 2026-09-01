import { Component, input, output, inject } from '@angular/core';
import { Task } from '../../../shared/interfaces/task.interface';
import { TaskPriorityServiveTs } from '../../../shared/services/task-priority.servive.ts';

@Component({
    selector: 'app-task-dialog-comp',
    imports: [],
    templateUrl: './task-dialog-comp.html',
    styleUrl: './task-dialog-comp.scss',
})
export class TaskDialogComp {
    taskPriorityService = inject(TaskPriorityServiveTs);
    // selected task data
    task = input<Task>();

    closeDialog = output<void>();
}
