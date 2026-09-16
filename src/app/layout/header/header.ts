import { Component, inject } from '@angular/core';
import {Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { AlertService } from '../../shared/services/alert.service';
import { InitialsPipe } from '../../shared/pipes.pipe';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, InitialsPipe],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    menuOpen = false;
    router = inject(Router);
    authService = inject(AuthService);
    alertService = inject(AlertService)

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


    logout(){
        this.authService.logout();
         this.alertService.success('Log out was successful', 2000);
        this.router.navigate(['/login']);
    }
}
