import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup-comp',
    imports: [],
    templateUrl: './signup-comp.html',
    styleUrl: './signup-comp.scss',
})
export class SignupComp {
    router = inject(Router);

    goBackToLogin() {
        this.router.navigate(['/login']);
    }
}
