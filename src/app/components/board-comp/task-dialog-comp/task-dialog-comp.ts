import { Component, input, output, inject, signal } from '@angular/core';
import { Task } from '../../../shared/interfaces/task.interface';
import { TaskDetailService } from '../../../shared/services/task-detail.service.';
import { InitialsPipe } from '../../../shared/pipes.pipe';
import { TaskForm } from '../../task-form/task-form';
import { TasksService } from '../../../shared/services/tasks.service';

@Component({
    selector: 'app-task-dialog-comp',
    imports: [InitialsPipe, TaskForm],
    templateUrl: './task-dialog-comp.html',
    styleUrl: './task-dialog-comp.scss',
})
export class TaskDialogComp {
    taskDetailService = inject(TaskDetailService);
    taskService = inject(TasksService);

    // selected task data
    task = input<Task>();

    closeDialog = output<void>();

    deleteRequested = output<void>();

    editMode = signal(false);

    toggleSubtask(index: number) {
        const currentTask = this.task();
        if (!currentTask?.id || !currentTask?.subtasks) return;

        const updatedSubtasks = currentTask.subtasks.map((subtask, i) =>
            i === index ? { ...subtask, checked: true } : subtask,
        );

        this.taskService.updateTask(currentTask.id, { subtasks: updatedSubtasks });
    }
}
