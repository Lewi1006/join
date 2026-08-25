import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Navigation } from './layout/navigation/navigation';
import { AlertComp } from "./shared/components/alert-comp/alert-comp";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navigation, AlertComp],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('join');
}
