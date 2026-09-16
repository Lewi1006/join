import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy-comp',
  imports: [],
  templateUrl: './privacy-comp.html',
  styleUrl: './privacy-comp.scss',
})
export class PrivacyComp {
   constructor(private location: Location) {}

    back(): void {
        this.location.back();
    }

}
