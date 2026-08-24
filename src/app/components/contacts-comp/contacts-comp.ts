import { Component, signal, WritableSignal, inject } from '@angular/core';
import { ContactsCard } from './contacts-card/contacts-card';
import { ContactsList } from './contacts-list/contacts-list';
import { ContactsForm } from './contacts-form/contacts-form';
import { Contact } from '../../shared/interfaces/contact.interface';
import { ContactsDelete } from './contacts-delete/contacts-delete';
import { ContactsService } from '../../shared/services/contacts.service';

@Component({
    selector: 'app-contacts-comp',
    imports: [ContactsCard, ContactsList, ContactsForm, ContactsDelete],
    templateUrl: './contacts-comp.html',
    styleUrl: './contacts-comp.scss',
})
export class ContactsComp {
    selectedContact: WritableSignal<Contact | undefined> = signal(undefined);
    contactToEdit = signal<Contact | undefined>(undefined);

    isEditMode = false;

    dbService = inject(ContactsService);

    async confirmDelete(deleteDialog: HTMLDialogElement, contactsDialog: HTMLDialogElement) {
        const contact = this.selectedContact();
        if (contact) {
            await this.dbService.deleteContact(contact.id!);
            this.selectedContact.set(undefined);
        }
        deleteDialog.close();
        contactsDialog.close();
    }

    contactWasSelected(clickedContact: Contact) {
        this.selectedContact.set(clickedContact);
    }

    // contactWasDeleted(contactId: number) {
    //     this.selectedContact.set(undefined);
    // }

    openAddForm(contactsDialog: HTMLDialogElement) {
        this.isEditMode = false;
        this.selectedContact.set(undefined);
        contactsDialog.showModal();
    }

    openEditForm(contactsDialog: HTMLDialogElement) {
        this.isEditMode = true;

        this.contactToEdit.set(this.selectedContact());

        console.log('Contact to edit:', this.contactToEdit());
        // let formDefaultValues = this.selectedContact();
        //  console.log(formDefaultValues);

        contactsDialog.showModal();
    }

    closeForm(contactsDialog: HTMLDialogElement) {
        contactsDialog.close();
        this.contactToEdit.set(undefined);
    }
}

// contactToEdit is an input signal to contact-form.ts
// in openEditForm we assign the currently selectedContact/clicked Contact to the contactToEdit signal
// in contacts-comp.html signal gets passed [contactToEdit]="contactToEdit()"
// in contacts-form.ts contactToEdit property receives the input  contactToEdit = input<Contact | undefined>(undefined);
// in closeForm  this.contactToEdit.set(undefined); --> signal needs to change again so it can be triggered when edited is clicked
// otherwise effect() wont run cause it reacts to changeDetection
