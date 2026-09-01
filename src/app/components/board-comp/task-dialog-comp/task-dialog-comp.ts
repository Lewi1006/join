import { Component, input, output, inject } from '@angular/core';
import { Task } from '../../../shared/interfaces/task.interface';
import { TaskDetailServive } from '../../../shared/services/task-detail.servive.';

@Component({
    selector: 'app-task-dialog-comp',
    imports: [],
    templateUrl: './task-dialog-comp.html',
    styleUrl: './task-dialog-comp.scss',
})
export class TaskDialogComp {
    taskDetailService = inject(TaskDetailServive);
    // selected task data
    task = input<Task>();

    closeDialog = output<void>();
}
