import { Component, signal, computed, inject } from '@angular/core';
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
    dbService = inject(ContactsService);

    // id of the contact clicked in the contact list.
    // Only the id is stored, not the contact object itself.
    selectedId = signal<number | undefined>(undefined);

    // The selected contact is derived from the id and the current contacts array.
    // after every create/update/delete the service refetches the contacts,
    // and the computed signal recalculates automatically.
    selectedContact = computed(() =>
        this.dbService.contacts().find((contact) => contact.id === this.selectedId()),
    );

    // selected contact object is stored as the one that gets edited and opened in the edit form
    contactToEdit = signal<Contact | undefined>(undefined);

    //  tells dialog html (contact form) weather its in add or edit mode
    isEditMode = false;

    // dbService = inject(ContactsService);
    alertService = inject(AlertService)
    // #endregion

    // #region methods

    // Stores the id of the contact currently selected in the contact list.
    // The contact behind that id is displayed in the contact card.
    contactWasSelected(clickedContact: Contact) {
        this.selectedId.set(clickedContact.id);
    }

    // Selects the contact after editing or creating it.
    // A newly created contact is therefore selected automatically,
    // because the form emits the contact returned by the database (including its new id).
    contactWasEdited(updatedContact: Contact) {
        this.selectedId.set(updatedContact.id);
    }
    // Deletes the currently selected contact and clears the contact card with set(undefined)
    // Both dialogs are closed after the deletion is completed.
    async confirmDelete(deleteDialog: HTMLDialogElement, contactsDialog: HTMLDialogElement) {
        const contact = this.selectedContact();
        if (contact) {
            await this.dbService.deleteContact(contact.id!);
            // this.selectedContact.set(undefined);
            this.selectedId.set(undefined);
            this.contactToEdit.set(undefined);
            this.alertService.success('Contact was deleted!', 2000);
        }
        deleteDialog.close();
        contactsDialog.close();
    }

    // Opens the form in add mode.
    // The selection is cleared because no existing contact is being edited.
    openAddForm(contactsDialog: HTMLDialogElement) {
        this.isEditMode = false;
        this.selectedId.set(undefined);
        this.contactToEdit.set(undefined);
        contactsDialog.showModal();
    }

    // Opens the form in edit mode.
    // The currently selected contact is copied to contactToEdit so the form
    // knows which contact should be patched into the input fields.
    openEditForm(contactsDialog: HTMLDialogElement) {
        this.isEditMode = true;

        this.contactToEdit.set(this.selectedContact());

       
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
