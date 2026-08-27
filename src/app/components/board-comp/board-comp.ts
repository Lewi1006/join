import { Component } from '@angular/core';
import { ColumnComp } from './column-comp/column-comp';

@Component({
  selector: 'app-board-comp',
  imports: [ColumnComp],
  templateUrl: './board-comp.html',
  styleUrl: './board-comp.scss',
})
export class BoardComp {}
