import { Component, input } from '@angular/core';
import { Task } from '../../../shared/interfaces/task.interface';

@Component({
    selector: 'app-task-dialog-comp',
    imports: [],
    templateUrl: './task-dialog-comp.html',
    styleUrl: './task-dialog-comp.scss',
})
export class TaskDialogComp {
    task = input<Task>();
}
