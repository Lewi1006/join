import { Component, signal, WritableSignal } from '@angular/core';
import { ContactsCard } from './contacts-card/contacts-card';
import { ContactsList } from './contacts-list/contacts-list';
import { ContactsForm } from './contacts-form/contacts-form';
import { Contact } from '../../shared/interfaces/contact.interface';

@Component({
    selector: 'app-contacts-comp',
    imports: [ContactsCard, ContactsList, ContactsForm],
    templateUrl: './contacts-comp.html',
    styleUrl: './contacts-comp.scss',
})
export class ContactsComp {
    selectedContact: WritableSignal<Contact | undefined> = signal(undefined);
  
    isEditMode= false;

    contactWasSelected(clickedContact: Contact) {
        this.selectedContact.set(clickedContact);
    }

       contactWasDeleted(contactId: number){
        this.selectedContact.set(undefined);
    }

    openAddForm(contactsDialog: HTMLDialogElement) {
   this.isEditMode = false;
        contactsDialog.showModal();
    }

    openEditForm(contactsDialog: HTMLDialogElement) {
       this.isEditMode = true;
        contactsDialog.showModal();
    }


    closeForm(contactsDialog: HTMLDialogElement) {
        contactsDialog.close();
    }
}
