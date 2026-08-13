import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-help-comp',
    imports: [RouterLink],
    templateUrl: './help-comp.html',
    styleUrl: './help-comp.scss',
})
export class HelpComp {
    constructor(private location: Location) {}

    back(): void {
        this.location.back();
    }
}
