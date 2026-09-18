import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AlertComp } from "./shared/components/alert-comp/alert-comp";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComp],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('join');

  router = inject(Router);

  ngOnInit(){
    this.router.navigate(['/login']);
  }
}
