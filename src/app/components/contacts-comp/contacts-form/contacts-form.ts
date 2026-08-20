import { Component, output, input, inject, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../../../shared/interfaces/contact.interface';
import { ContactsService } from '../../../shared/services/contacts.service';

@Component({
    selector: 'app-contacts-form',
    imports: [ReactiveFormsModule],
    templateUrl: './contacts-form.html',
    styleUrl: './contacts-form.scss',
})
export class ContactsForm {
    dbService = inject(ContactsService);

    receivedModeIsEdit = input(false);
    contactToEdit = input<Contact | undefined>(undefined);

    closeForm = output<void>();

    contactForm = new FormGroup({
        name: new FormControl('', {
            validators: [Validators.required],
        }),

        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
        }),

        phone: new FormControl('', {
            validators: [Validators.required],
        }),
    });

    constructor() {
        effect(() => {
            const contact = this.contactToEdit();

            if (contact) {
                this.contactForm.patchValue({
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                });
            }
        });
    }

    get name() {
        return this.contactForm.get('name');
    }

    get email() {
        return this.contactForm.get('email');
    }

    get phone() {
        return this.contactForm.get('phone');
    }

    async formSubmit() {
        if (this.contactForm.valid) {
            const contact: Contact = {
                name: this.contactForm.value.name!,
                email: this.contactForm.value.email!,
                phone: this.contactForm.value.phone!,
            };

            console.log('Contact to send:', contact);

            await this.dbService.createContact(contact);

            this.closeFormAndReset();
        }
    }

    closeClick() {
        this.closeFormAndReset();
    }

    closeFormAndReset() {
        this.contactForm.reset();
        this.closeForm.emit();
    }

    // patchForm() {
    //     const contact = this.contactToEdit();

    //     console.log(contact);
    //     if (!contact) {
    //         return;
    //     }

    //     this.contactForm.patchValue({
    //         name: contact.name,
    //         email: contact.email,
    //         phone: contact.phone,
    //     });
    // }
}
