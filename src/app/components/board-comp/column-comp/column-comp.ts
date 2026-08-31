import { Component, input, computed } from '@angular/core';
import { TaskStatus } from '../../../shared/interfaces/column.interface';
import { Task } from '../../../shared/interfaces/task.interface';

@Component({
    selector: 'app-column-comp',
    imports: [],
    templateUrl: './column-comp.html',
    styleUrl: './column-comp.scss',
})
export class ColumnComp {
    title = input<string>();
    status = input<TaskStatus>();
    task = input<Task[]>();

    // save task status in thos property so html can accsess it
    TaskStatus = TaskStatus;

    // Filters the tasks based on the column's status,
    // so each column only displays the tasks belonging to it.
    // item is a variable that stores each item in the array
    // compares and matches items status to column status
    columnTasks = computed(() => this.task()?.filter((item) => item.status === this.status()));

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
}
