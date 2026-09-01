import { Component, inject, signal, computed } from '@angular/core';
import { ColumnComp } from './column-comp/column-comp';
import { BoardColumn, TaskStatus } from '../../shared/interfaces/column.interface';
import { TasksService } from '../../shared/services/tasks.service';
import { TaskDialogComp } from './task-dialog-comp/task-dialog-comp';
import { Task } from '../../shared/interfaces/task.interface';

@Component({
    selector: 'app-board-comp',
    imports: [ColumnComp, TaskDialogComp],
    templateUrl: './board-comp.html',
    styleUrl: './board-comp.scss',
})
export class BoardComp {
    taskService = inject(TasksService);
    
    selectedTaskId = signal<number | undefined>(undefined);
    selectedTask = computed(() =>
    this.taskService.tasks().find((task)=>task.id === this.selectedTaskId()) 
    )

    ngOnInit() {
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
            ? this.taskService.tasks().filter((t) => t.title.toLowerCase().includes(term))
            : this.taskService.tasks();
    });

    tasksForColumn(status: TaskStatus): Task[] {
        return this.filteredTasks().filter((t) => t.status === status);
    }



    // column-comp has (click) onto a task (Task) this emits 
    // an output signal (taskSelected) with the selected task through method openTaskDialog
    // (taskSelected)="openTaskDialog($event)" --> child(column) hands over event(task) to parent(board)
    // parent(board) saves the ID of the selected Task in a signal calles selectedTaskId
    // this can then be handed over to the child(dialog) as an input signal
    // dialog gets opened here 

    openTaskDialog(task:Task,  taskDialog: HTMLDialogElement){
        this.selectedTaskId.set(task.id);
        console.log(this.selectedTaskId());
        taskDialog.showModal();
    }

    closeTaskDialog(taskDialog: HTMLDialogElement){
        taskDialog.close();
        this.selectedTaskId.set(undefined);
    }
}

