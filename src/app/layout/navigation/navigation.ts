import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
// import { BoardComp } from "../../components/board-comp/board-comp";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [Footer, RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {}
