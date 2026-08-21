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
    deletedContact = output<number>();

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
        // this.formDefaultValues = this.contactToEdit;
        // https://angular.dev/api/core/OnChanges
        // https://angular.dev/api/core/effect
        // will be scheduled & executed whenever the signals that it reads changes
        effect(() => {
            const contact = this.contactToEdit();

            console.log(contact);

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

            if (this.receivedModeIsEdit()) {
                const contactToEdit = this.contactToEdit();

                console.log(contactToEdit);

                if (contactToEdit) {
                    await this.dbService.updateContact(contactToEdit.id!, contact);
                }
            } else {
                await this.dbService.createContact(contact);
            }

            this.closeFormAndReset();
        }
    }

    closeClick() {
        this.closeFormAndReset();
    }

    async deleteContact() {
        const contactToDelete = this.contactToEdit();

        if (contactToDelete) {
            await this.dbService.deleteContact(contactToDelete.id!);
            this.deletedContact.emit(contactToDelete.id!);
            this.closeFormAndReset();
        }
    }

    closeFormAndReset() {
        this.contactForm.reset();
        this.closeForm.emit();
    }
}
