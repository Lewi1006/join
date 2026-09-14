import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../../../shared/interfaces/contact.interface';

@Component({
    selector: 'app-login-comp',
    imports: [ReactiveFormsModule],
    templateUrl: './login-comp.html',
    styleUrl: './login-comp.scss',
})
export class LoginComp {
    router = inject(Router);


    currentUser = signal<Contact | undefined>(undefined);

    goToSignUp() {
        this.router.navigate(['/signup']);
    }

    login(){
      console.log('login clicked');
    }

    guestLogin(){
      const guest: Contact = {
        name: 'Guest',
        email: '',
        phone: '',
        status: 'guest',
      }

      this.currentUser.set(guest);


          console.log(this.currentUser());
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
            validators: [
                Validators.required,
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/),
            ],
        }),
    });
}
