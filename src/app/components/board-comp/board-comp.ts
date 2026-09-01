import { Component, signal, computed } from '@angular/core';
import { ColumnComp } from './column-comp/column-comp';
import { BoardColumn, TaskStatus } from '../../shared/interfaces/column.interface';
import { Task } from '../../shared/interfaces/task.interface';

@Component({
    selector: 'app-board-comp',
    imports: [ColumnComp],
    templateUrl: './board-comp.html',
    styleUrl: './board-comp.scss',
})
export class BoardComp {
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

    task: Task[] = [
        {
            id: 1,
            status: TaskStatus.Todo,
            title: 'HTML Base Temolate Creation',
            description: 'Create reusable HTML base templates',
            subtaskCount: 3,
            category: 'todo',
            dueDate: '01/09/2026',
        },        {
            id: 2,
            status: TaskStatus.Todo,
            title: '2HTML Base Temolate Creation',
            description: '2Create reusable HTML base templates',
            subtaskCount: 3,
            category: 'todo',
            dueDate: '01/09/2026',
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
