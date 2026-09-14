import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../../../shared/interfaces/contact.interface';
import { ContactsService } from '../../../shared/services/contacts.service';
import { passwordMustMatch } from '../../../shared/validators';

@Component({
    selector: 'app-signup-comp',
    imports: [ReactiveFormsModule],
    templateUrl: './signup-comp.html',
    styleUrl: './signup-comp.scss',
})
export class SignupComp {
    router = inject(Router);
    contactService = inject(ContactsService);

    goBackToLogin() {
        this.router.navigate(['/login']);
    }

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
                validators: [Validators.required, Validators.pattern('^[- +()0-9]+$')],
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

    signUp() {
        if (this.signupForm.invalid) {
            return;
        }

        console.log(this.signupForm.value);

        if (this.signupForm.valid) {
            const contact: Contact = {
                name: this.signupForm.value.name!,
                email: this.signupForm.value.email!,
                phone: this.signupForm.value.phone!,
                password: this.signupForm.value.password!,
                status: 'registered',
            };

            this.contactService.createContact(contact);

            this.router.navigate(['/summary']);
        }
    }
}
