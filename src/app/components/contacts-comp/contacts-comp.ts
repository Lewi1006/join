import { Component, signal, WritableSignal } from '@angular/core';
import { ContactsCard } from './contacts-card/contacts-card';
import { ContactsList } from './contacts-list/contacts-list';
import { Contact } from '../../shared/interfaces/contact.interface';

@Component({
    selector: 'app-contacts-comp',
    imports: [ContactsCard, ContactsList],
    templateUrl: './contacts-comp.html',
    styleUrl: './contacts-comp.scss',
})
export class ContactsComp {
    selectedContact: WritableSignal<Contact | undefined> = signal(undefined);

    contactWasSelected(clickedContact: Contact) {
        this.selectedContact.set(clickedContact);
    }
}
