import { Component, input, computed, output, inject } from '@angular/core';
import { TaskStatus } from '../../../shared/interfaces/column.interface';
import { Task } from '../../../shared/interfaces/task.interface';
import { CdkDrag, CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskDetailService } from '../../../shared/services/task-detail.service.';
import { InitialsPipe } from '../../../shared/pipes.pipe';

@Component({
    selector: 'app-column-comp',
    imports: [CdkDrag, CdkDropList, InitialsPipe],
    templateUrl: './column-comp.html',
    styleUrl: './column-comp.scss',
})
export class ColumnComp {
    taskDetailService = inject(TaskDetailService)


    title = input<string>();
    status = input<TaskStatus>();
    task = input<Task[]>();

    taskSelected = output<Task>();

    // so column knows the status when add task is clicked via +
    addColumnTask = output<TaskStatus>();

    // bubbles the drop up to the board, which owns the task data
    taskDropped = output<CdkDragDrop<Task[]>>();

    // save task status in those property so html can accsess it
    TaskStatus = TaskStatus;

    fakeAssignees = [
        {
            id: 1,
            initials: 'PB',
            profile_color: '#fc71ff',
        },
        {
            id: 2,
            initials: 'WM',
            profile_color: '#6e52ff',
        },
        {
            id: 3,
            initials: 'OL',
            profile_color: '#00bee8',
        },
        {
            id: 4,
            initials: 'LD',
            profile_color: '#c3ff2b',
        },
        {
            id: 5,
            initials: 'AB',
            profile_color: '#ff7a00;',
        },
    ];

    // Filters the tasks based on the column's status,
    // so each column only displays the tasks belonging to it.
    // item is a variable that stores each item in the array
    // compares and matches items status to column status
    columnTasks = computed(() => this.task()?.filter((item) => item.status === this.status()) ?? []);

    getEmptyMessage(): string {
        switch (this.status()) {
            case TaskStatus.Todo:
                return 'No tasks to do';

            case TaskStatus.InProgress:
                return 'No tasks in progress';

            case TaskStatus.AwaitFeedback:
                return 'No tasks awaiting feedback';

            case TaskStatus.Done:
                return 'No tasks done';

            default:
                return 'No task';
        }
    }

    selectTask(task: Task) {
        this.taskSelected.emit(task);
    }


    addTask(){
        this.addColumnTask.emit(this.status()!);
    }
}
