import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../../../shared/services/contacts.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-login-comp',
    imports: [ReactiveFormsModule],
    templateUrl: './login-comp.html',
    styleUrl: './login-comp.scss',
})
export class LoginComp {
    router = inject(Router);
    authService = inject(AuthService);
    contactsService = inject(ContactsService);

    goToSignUp() {
        this.router.navigate(['/signup']);
    }

    async login() {
        this.loginForm.setErrors(null);

        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        const contact = await this.checkLogin();

        if (!contact) {
            return;
        }

        this.authService.login(contact);
        this.router.navigate(['/summary']);
    }

    async checkLogin() {
        await this.contactsService.getAllContacts();

        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        const contact = this.contactsService.contacts().find((contact) => contact.email === email);

        if (!contact) {
            this.loginForm.setErrors({ wrongEmail: true });
            return;
        }

        if (contact.password !== password) {
            this.loginForm.setErrors({ wrongPassword: true });
            return;
        }

        return contact;
    }

    guestLogin() {
        this.authService.guestLogin();
        this.router.navigate(['/summary']);
    }

    loginForm = new FormGroup({
        email: new FormControl('', {
            validators: [
                Validators.required,
                Validators.pattern(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                ),
            ],
        }),
        password: new FormControl('', {
            validators: [Validators.required],
        }),
    });
}
