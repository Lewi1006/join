import { Component } from '@angular/core';
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
    contacts: Contact[] = [
        {
            id: '1',
            name: 'Anton Mayer',
            email: 'antom@gmail.com',
            phone: '+49 1111 111 11 1',
        },
    ];
}
