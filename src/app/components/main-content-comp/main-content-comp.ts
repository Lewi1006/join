import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Navigation } from '../../layout/navigation/navigation';

@Component({
    selector: 'app-main-content-comp',
    imports: [RouterOutlet, Header, Navigation],
    templateUrl: './main-content-comp.html',
    styleUrl: './main-content-comp.scss',
})
export class MainContentComp {}
