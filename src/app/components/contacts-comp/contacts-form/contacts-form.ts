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
    // #region properties
    // Service handles all communication with Supabase
    dbService = inject(ContactsService);

    // Determines whether the form is being used to add or edit a contact
    receivedModeIsEdit = input(false);

    // Contact that is currently being edited. Undefined when creating a new contact.
    contactToEdit = input<Contact | undefined>(undefined);

    // Notifies the parent which contact was deleted
    deletedContact = output<number>();

    // Notifies the parent that the form should be closed
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

    // #endregion

    constructor() {
        // https://angular.dev/api/core/OnChanges
        // https://angular.dev/api/core/effect
        //
        // contactToEdit is a signal input, so its value can change whenever
        // the parent selects a different contact from the list.
        //
        // The effect reacts to that change and fills the reactive form
        // with the selected contact's existing data.
        //
        // --> effect will be executed whenever the signals that it reads changes
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

    // #region getters
    // getters for accessing the form controls in html
    get name() {
        return this.contactForm.get('name');
    }

    get email() {
        return this.contactForm.get('email');
    }

    get phone() {
        return this.contactForm.get('phone');
    }
    // #endregion

    // #region methods
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

    // #endregion
}
