import { Component, output, input, inject, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../../../shared/interfaces/contact.interface';
import { ContactsService } from '../../../shared/services/contacts.service';
import { InitialsPipe } from '../../../shared/pipes.pipe';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
    selector: 'app-contacts-form',
    imports: [ReactiveFormsModule, InitialsPipe],
    templateUrl: './contacts-form.html',
    styleUrl: './contacts-form.scss',
})
export class ContactsForm {
    // #region properties
    // Service handles all communication with Supabase
    dbService = inject(ContactsService);
    alertService = inject(AlertService);

    // Determines whether the form is being used to add or edit a contact
    receivedModeIsEdit = input(false);

    // Contact that is currently being edited. Undefined when creating a new contact.
    contactToEdit = input<Contact | undefined>(undefined);

    // Notifies the parent which contact was deleted
    deleteRequested = output<void>();

    // Notifies the parent that an existing contact was updated
    updatedContact = output<Contact>();

    // Notifies the parent that the form should be closed
    closeForm = output<void>();

    // Reactive form with validators
    contactForm = new FormGroup({
        name: new FormControl('', {
            validators: [Validators.required, Validators.pattern(/^(\w+\s+\w+)/)],
        }),

        email: new FormControl('', {
            validators: [
                Validators.required,
                Validators.email,
                Validators.pattern(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                ),
            ],
        }), // https://stackblitz.com/edit/angular-pgc7st?file=src%2Fapp%2Fapp.component.ts

        phone: new FormControl('', {
            validators: [Validators.required, Validators.pattern('^[- +()0-9]+$')],
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
            } else {
                this.contactForm.reset();
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
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            return;
        }

        // ! tells TypeScript that we know the values exist here
        // Only submit the form when all validators pass
        if (this.contactForm.valid) {
            const contact: Contact = {
                name: this.contactForm.value.name!,
                email: this.contactForm.value.email!,
                phone: this.contactForm.value.phone!,
            };

            // Edit mode updates the existing contact using the id
            if (this.receivedModeIsEdit()) {
                await this.updateContact(contact);
            } else {
                await this.createContact(contact);
            }

            this.closeFormAndReset();
        }
    }

    async updateContact(contact: Contact) {
        const contactToEdit = this.contactToEdit();

        if (contactToEdit) {
            await this.dbService.updateContact(contactToEdit.id!, contact);

            // Send the updated contact to the parent so the card
            // immediately displays the changed information.
            // ... = spread operator = copies the updated form values and add the original contact ID
            // so the parent receives the complete updated contact.
            this.updatedContact.emit({
                ...contact,
                id: contactToEdit.id,
            });

            this.alertService.success('Contact was saved!', 2000);
        }
    }

    async createContact(contact: Contact) {
        // In add mode, create a new contact in the database.
        const createdContact = await this.dbService.createContact(contact);

        // Send the newly created contact to the parent so it
        // can immediately be displayed in the contact card.
        if (createdContact) {
            this.updatedContact.emit(createdContact);
            // this.selectedContact()

            this.alertService.success('Contact was created!', 2000);
        }
    }

    // Notifies the parent that the user clicked the delete button.
    // The parent then opens the confirmation dialog.
    deleteRequestClick() {
        this.deleteRequested.emit();
    }

    // Closes the form when the user clicks the close button.
    closeClick() {
        this.closeFormAndReset();
    }

    // Resets the form and tells the parent to close the dialog.
    closeFormAndReset() {
        this.contactForm.reset();
        this.closeForm.emit();
    }

    // #endregion
}
