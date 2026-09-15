import { Component, inject, computed, signal } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { TaskStatus } from '../../shared/interfaces/column.interface';
import { Task } from '../../shared/interfaces/task.interface';
import { BoardColumn } from '../../shared/interfaces/column.interface';
import { CrudService } from '../../shared/services/crud.service';

@Component({
    selector: 'app-summary-comp',
    imports: [],
    templateUrl: './summary-comp.html',
    styleUrl: './summary-comp.scss',
})
export class SummaryComp {
    taskService = inject(TasksService);

    todo = TaskStatus.Todo;
    inProgress = TaskStatus.InProgress;
    awaitFeedback = TaskStatus.AwaitFeedback;
    done = TaskStatus.Done;

    ngOnInit() {
        this.taskService.getAllTasks();
    }

    totalNumberOfTasks() {
        let totalNumberOfTasks: number = this.taskService.tasks().length;
        return totalNumberOfTasks;
    }

    tasksByStatus(status: TaskStatus) {
        let numberOfTasksInStatus: number = this.taskService
            .tasks()
            .filter((t) => t.status === status).length;
        return numberOfTasksInStatus;
    }

    getUrgentUndoneTasks() {
        let numberOfUndoneTasksInPriority: number = this.taskService
            .tasks()
            .filter((t) => t.priority === 'Urgent' && t.status != this.done).length;
        return numberOfUndoneTasksInPriority;
    }
}
