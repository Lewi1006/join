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


// Filters the tasks based on the column's status,
// so each column only displays the tasks belonging to it.
// item is a variable that stores each item in the array
// compares and matches items status to column status 
columnTasks = computed(() =>
    this.task()?.filter((item) => item.status === this.status())
);


}
