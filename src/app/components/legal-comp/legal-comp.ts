import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-legal-comp',
  imports: [],
  templateUrl: './legal-comp.html',
  styleUrl: './legal-comp.scss',
})
export class LegalComp {

 constructor(private location: Location) {}

    back(): void {
        this.location.back();
    }

}
