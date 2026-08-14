import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    menuOpen = false;
  
    constructor(private router: Router) {}

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    closeMenu() {
        this.menuOpen = false;
    }

    // target = where user clicks; currentTarget = where EventListener is attached to
    closeMenuOnBackdrop(event:PointerEvent):void{
        if(event.target === event.currentTarget ){
            this.closeMenu();
        }
    }
}
