import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-legal-comp',
  imports: [DatePipe],
  templateUrl: './legal-comp.html',
  styleUrl: './legal-comp.scss',
})
export class LegalComp {
  today = new Date();

 constructor(private location: Location) {}

    back(): void {
        this.location.back();
    }

}
