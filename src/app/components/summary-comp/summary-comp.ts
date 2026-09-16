import { Component, inject, computed, signal } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { TaskStatus } from '../../shared/interfaces/column.interface';
import { Task } from '../../shared/interfaces/task.interface';
import { BoardColumn } from '../../shared/interfaces/column.interface';
import { CrudService } from '../../shared/services/crud.service';
import { DatePipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-summary-comp',
    imports: [DatePipe],
    templateUrl: './summary-comp.html',
    styleUrl: './summary-comp.scss',
})
export class SummaryComp {
    taskService = inject(TasksService);

    todo = TaskStatus.Todo;
    inProgress = TaskStatus.InProgress;
    awaitFeedback = TaskStatus.AwaitFeedback;
    done = TaskStatus.Done;

    dueDate = '';
    dueDateUpcoming = signal(true);

    private interval: any;

    ngOnInit() {
        this.taskService.getAllTasks();
        this.interval = setInterval(() => {
            this.getDueDate();
        }, 100);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    getDueDate() {
        const dueDates = this.taskService
            .tasks()
            .filter((t) => t.status != this.done)
            .filter((t) => t.dueDate)
            .map((t) => t.dueDate!)
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        this.dueDate = dueDates[0];
        this.isDueDateUpcoming();
        return this.dueDate ?? null;
    }

    isDueDateUpcoming() {
        const today = new Date();
        const dueDate = new Date(this.dueDate);
        if (today.getDate() <= dueDate.getDate()) {
            this.dueDateUpcoming.set(true);
        } else {
            this.dueDateUpcoming.set(false);
        }
    }

    totalNumberOfTasks = computed(() => {
        const totalNumberOfTasks: number = this.taskService.tasks().length;
        return totalNumberOfTasks;
    });

    urgentUndoneTasks = computed(() => {
        const numberOfUndoneTasksInPriority: number = this.taskService
            .tasks()
            .filter((t) => t.priority === 'Urgent' && t.status != this.done).length;
        return numberOfUndoneTasksInPriority;
    });

    displayedDueDate = computed(() => {
        const dueDates = this.taskService
            .tasks()
            .filter((t) => t.status != this.done)
            .filter((t) => t.dueDate)
            .map((t) => t.dueDate!)
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        const displayedDueDate = dueDates[0];

        return displayedDueDate ?? null;
    });

    tasksByStatus(status: TaskStatus) {
        let numberOfTasksInStatus: number = this.taskService
            .tasks()
            .filter((t) => t.status === status).length;
        return numberOfTasksInStatus;
    }

    /*     totalNumberOfTasks() {
        let totalNumberOfTasks: number = this.taskService.tasks().length;
        return totalNumberOfTasks;
    } */

    /* getUrgentUndoneTasks() {
        let numberOfUndoneTasksInPriority: number = this.taskService
            .tasks()
            .filter((t) => t.priority === 'Urgent' && t.status != this.done).length;
        return numberOfUndoneTasksInPriority;
    } */
}
