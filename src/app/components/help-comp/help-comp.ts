import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-help-comp',
    imports: [RouterLink],
    templateUrl: './help-comp.html',
    styleUrl: './help-comp.scss',
})
export class HelpComp {
    closeHelp() {}
}
