import { Component, input } from '@angular/core';
import { TaskStatus } from '../../../shared/interfaces/column.interface';

@Component({
    selector: 'app-column-comp',
    imports: [],
    templateUrl: './column-comp.html',
    styleUrl: './column-comp.scss',
})
export class ColumnComp {
title = input<string>();
status = input<TaskStatus>();


}
