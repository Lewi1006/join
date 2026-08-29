import { Component } from '@angular/core';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-task-comp',
  imports: [TaskForm],
  templateUrl: './task-comp.html',
  styleUrl: './task-comp.scss',
})
export class TaskComp {}
