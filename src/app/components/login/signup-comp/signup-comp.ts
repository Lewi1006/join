import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../../../shared/interfaces/contact.interface';
import { ContactsService } from '../../../shared/services/contacts.service';
import { passwordMustMatch } from '../../../shared/validators';
import { AuthService } from '../../../shared/services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
    selector: 'app-signup-comp',
    imports: [ReactiveFormsModule],
    templateUrl: './signup-comp.html',
    styleUrl: './signup-comp.scss',
})
export class SignupComp {
    // #region Properties
    router = inject(Router);
    contactService = inject(ContactsService);
    authService = inject(AuthService);
    alertService = inject(AlertService);
    storageService = inject(StorageService);

    signupForm = new FormGroup(
        {
            name: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.pattern(
                        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð .'-]+\s+[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð .'-]+$/i,
                    ),
                ],
            }),
            email: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    ),
                ],
            }),

            phone: new FormControl('', {
                validators: [Validators.pattern('^[- +()0-9]+$')],
            }),

            password: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                    ),
                ],
            }),
            //     confirmPassword: new FormControl('', [Validators.required]),
            //     acceptPrivacy: new FormControl(false, [Validators.requiredTrue]),
            // }

            confirmPassword: new FormControl('', {
                validators: [Validators.required],
            }),

            acceptPrivacy: new FormControl(false, {
                validators: [Validators.requiredTrue],
            }),
        },
        {
            validators: passwordMustMatch,
        },
    );
    // #endregion

    // #region Methods
    ngOnInit(): void {
        const storedData = this.storageService.getSessionData('signupForm');
        if (storedData) {
            this.signupForm.patchValue(storedData);
        }
    }

    saveForm() {
        const formData = {
            name: this.signupForm.value.name,
            email: this.signupForm.value.email,
            phone: this.signupForm.value.phone,
        };
        this.storageService.setSessionData('signupForm', formData);
    }

    goBackToLogin() {
        this.storageService.removeSessionData('signupForm');
        this.router.navigate(['/login']);
    }

    signUp() {
        if (this.signupForm.invalid) {
            return;
        }

        if (this.signupForm.valid) {
            const contact: Contact = {
                name: this.signupForm.value.name!,
                email: this.signupForm.value.email!,
                phone: this.signupForm.value.phone || undefined,
                password: this.signupForm.value.password!,
                status: 'registered',
                user: true,
            };

            this.contactService.createContact(contact);
            this.authService.currentUser.set(contact);
            this.alertService.success('Sign up was successful', 2000);
            this.router.navigate(['/summary']);
        }
    }

    goToPrivacy() {
        this.saveForm();
        this.router.navigate(['/privacy']);
    }

    goToLegal() {
        this.saveForm();
        this.router.navigate(['/legal']);
    }
    // #endregion
}
