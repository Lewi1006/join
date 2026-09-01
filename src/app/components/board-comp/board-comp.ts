import { Component, inject, signal, computed } from '@angular/core';
import { ColumnComp } from './column-comp/column-comp';
import { BoardColumn, TaskStatus } from '../../shared/interfaces/column.interface';
import { TasksService } from '../../shared/services/tasks.service';
import { TaskDialogComp } from './task-dialog-comp/task-dialog-comp';

@Component({
    selector: 'app-board-comp',
    imports: [ColumnComp, TaskDialogComp],
    templateUrl: './board-comp.html',
    styleUrl: './board-comp.scss',
})
export class BoardComp {
taskService = inject(TasksService);

ngOnInit(){
  this.taskService.getAllTasks();
}



// array for columns
    columns: BoardColumn[] = [
        {
            title: 'To do',
            status: TaskStatus.Todo,
        },
        {
            title: 'In progress',
            status: TaskStatus.InProgress,
        },
        {
            title: 'Await feedback',
            status: TaskStatus.AwaitFeedback,
        },
        {
            title: 'Done',
            status: TaskStatus.Done,
        },
    ];


        searchTerm = signal('');

    filteredTasks = computed(() => {
        const term = this.searchTerm().toLowerCase().trim();
        return term.length >= 3
            ? this.task.filter((t) => t.title.toLowerCase().includes(term))
            : this.task;
    });

    tasksForColumn(status: TaskStatus): Task[] {
        return this.filteredTasks().filter((t) => t.status === status);
    }
}
