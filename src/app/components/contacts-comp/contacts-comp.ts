import { Component, signal, WritableSignal, inject } from '@angular/core';
import { ContactsCard } from './contacts-card/contacts-card';
import { ContactsList } from './contacts-list/contacts-list';
import { ContactsForm } from './contacts-form/contacts-form';
import { Contact } from '../../shared/interfaces/contact.interface';
import { ContactsDelete } from './contacts-delete/contacts-delete';
import { ContactsService } from '../../shared/services/contacts.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
    selector: 'app-contacts-comp',
    imports: [ContactsCard, ContactsList, ContactsForm, ContactsDelete],
    templateUrl: './contacts-comp.html',
    styleUrl: './contacts-comp.scss',
})
export class ContactsComp {
    // #region properties
    // clicked contact from contact list
    selectedContact: WritableSignal<Contact | undefined> = signal(undefined);

    // selected contact is stored as the one that gets edited
    contactToEdit = signal<Contact | undefined>(undefined);

    //  tells dialog html (contact form) weather its in add or edit mode
    isEditMode = false;

    dbService = inject(ContactsService);
    alertService = inject(AlertService)
    // #endregion

    // #region methods

    // Stores the contact currently selected in the contact list.
    // This contact is displayed in the contact card.
    contactWasSelected(clickedContact: Contact) {
        this.selectedContact.set(clickedContact);
    }

    // Updates the selected contact after editing or creating a contact.
    // This makes the contact card display the new data immediately.
    contactWasEdited(updatedContact: Contact) {
        this.selectedContact.set(updatedContact);
    }

    // Deletes the currently selected contact and clears the contact card with set(undefined)
    // Both dialogs are closed after the deletion is completed.
    async confirmDelete(deleteDialog: HTMLDialogElement, contactsDialog: HTMLDialogElement) {
        const contact = this.selectedContact();
        if (contact) {
            await this.dbService.deleteContact(contact.id!);
            this.selectedContact.set(undefined);
            this.alertService.success('Contact was deleted!', 2000);
        }
        deleteDialog.close();
        contactsDialog.close();
    }

    // Opens the form in add mode.
    // The selected contact is cleared because no existing contact is being edited.
    openAddForm(contactsDialog: HTMLDialogElement) {
        this.isEditMode = false;
        this.selectedContact.set(undefined);
        contactsDialog.showModal();
    }

    // Opens the form in edit mode.
    // The currently selected contact is copied to contactToEdit so the form
    // knows which contact should be patched into the input fields.
    openEditForm(contactsDialog: HTMLDialogElement) {
        this.isEditMode = true;

        this.contactToEdit.set(this.selectedContact());

        // console.log('Contact to edit:', this.contactToEdit());
        contactsDialog.showModal();
    }

    // Closes the form and clears contactToEdit.
    // Clearing is important because the signal needs to change when the form
    // is opened again so the effect() in ContactsForm can run again.
    closeForm(contactsDialog: HTMLDialogElement) {
        contactsDialog.close();
        this.contactToEdit.set(undefined);
    }

    
    // #endregion
}


// contactToEdit is an input signal to contact-form.ts
// in openEditForm we assign the currently selectedContact/clicked Contact to the contactToEdit signal
// in contacts-comp.html signal gets passed [contactToEdit]="contactToEdit()"
// in contacts-form.ts contactToEdit property receives the input  contactToEdit = input<Contact | undefined>(undefined);
// in closeForm  this.contactToEdit.set(undefined); --> signal needs to change again so it can be triggered when edited is clicked
// otherwise effect() wont run cause it reacts to changeDetection
