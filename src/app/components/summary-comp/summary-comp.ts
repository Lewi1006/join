import { Component, inject, computed, signal } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { TaskStatus } from '../../shared/interfaces/column.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Contact } from '../../shared/interfaces/contact.interface';

@Component({
    selector: 'app-summary-comp',
    imports: [DatePipe, RouterLink],
    templateUrl: './summary-comp.html',
    styleUrl: './summary-comp.scss',
})
export class SummaryComp {
    taskService = inject(TasksService);
    authService = inject(AuthService);

    //#regionstart
    status = {
        todo: TaskStatus.Todo,
        inProgress: TaskStatus.InProgress,
        awaitFeedback: TaskStatus.AwaitFeedback,
        done: TaskStatus.Done,
    };
    dueDate = '';
    dueDateUpcoming = signal(true);
    private interval: any;
//#endregion

currentUserName = '';

    currentUser = signal<Contact | undefined>(undefined);

    ngOnInit() {
        this.taskService.getAllTasks();
        this.interval = setInterval(() => {
            this.getDueDate();
        }, 50);
    }


    ngOnDestroy() {
        clearInterval(this.interval);
    }

    getDueDate() {
        const dueDates = this.taskService
            .tasks()
            .filter((t) => t.status != this.status.done)
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
            .filter((t) => t.priority === 'Urgent' && t.status != this.status.done).length;
        return numberOfUndoneTasksInPriority;
    });

    displayedDueDate = computed(() => {
        const dueDates = this.taskService
            .tasks()
            .filter((t) => t.status != this.status.done)
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
}
