import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../../../shared/services/contacts.service';
import { AuthService } from '../../../shared/services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
    selector: 'app-login-comp',
    imports: [ReactiveFormsModule],
    templateUrl: './login-comp.html',
    styleUrl: './login-comp.scss',
})
export class LoginComp {
    // #region Properties
    router = inject(Router);
    authService = inject(AuthService);
    contactsService = inject(ContactsService);
    alertService = inject(AlertService);
    // #endregion

    // #region Form
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
    // #endregion

    // #region Methods
    goToSignUp() {
        this.router.navigate(['/signup']);
    }

    async login() {
        this.loginForm.setErrors(null);

        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        // gets contact that matches the data in the database
        const contact = await this.checkLogin();

        if (!contact) {
            return;
        }

        // hand over contact to auth service so current user signal knows
        // that a user is logged in and isLoggedIn() returns true
        this.authService.login(contact);

        this.alertService.success('Log in was successful', 2000);
        this.router.navigate(['/summary']);
    }

    async checkLogin() {
        await this.contactsService.getAllContacts();

        // values from the form that the user types in to log in
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        // search contacts array and match the entered email
        // with an existing contact in the database
        const contact = this.contactsService.contacts().find((contact) => contact.email === email);

        // if no contact is found -> show error message
        if (!contact) {
            this.loginForm.setErrors({ wrongEmail: true });
            return;
        }

        // if the password does not match -> show error message
        if (contact.password !== password) {
            this.loginForm.setErrors({ wrongPassword: true });
            return;
        }
        return contact;
    }

    guestLogin() {
        this.authService.guestLogin();
        this.alertService.success('Log in was successful', 2000);
        this.router.navigate(['/summary']);
    }

    goToPrivacy() {
        this.router.navigate(['/privacy']);
    }

    goToLegal() {
        this.router.navigate(['/legal']);
    }
    // #endregion
}
