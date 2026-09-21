import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-help-comp',
    templateUrl: './help-comp.html',
    styleUrl: './help-comp.scss',
})
export class HelpComp {
    constructor(private location: Location) {}

    back(): void {
        this.location.back();
    }
}
