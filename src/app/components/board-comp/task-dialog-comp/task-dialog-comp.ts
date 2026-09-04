import { Component, input, output, inject, signal } from '@angular/core';
import { Task } from '../../../shared/interfaces/task.interface';
import { TaskDetailService } from '../../../shared/services/task-detail.service.';
import { InitialsPipe } from '../../../shared/pipes.pipe';
import { TaskForm } from '../../task-form/task-form';

@Component({
    selector: 'app-task-dialog-comp',
    imports: [InitialsPipe, TaskForm],
    templateUrl: './task-dialog-comp.html',
    styleUrl: './task-dialog-comp.scss',
})
export class TaskDialogComp {
    taskDetailService = inject(TaskDetailService);

    // selected task data
    task = input<Task>();

    closeDialog = output<void>();
    editMode = signal(false);
}
