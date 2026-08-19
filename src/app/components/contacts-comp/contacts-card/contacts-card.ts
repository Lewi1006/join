import { Component, inject, input, output } from '@angular/core';
import { Contact } from '../../../shared/interfaces/contact.interface';
import { ContactsService } from '../../../shared/services/contacts.service';

@Component({
    selector: 'app-contacts-card',
    imports: [],
    templateUrl: './contacts-card.html',
    styleUrl: './contacts-card.scss',
})
export class ContactsCard {
    receivedContact = input<Contact>();
    deletedContact = output<number>();

    dbService = inject(ContactsService);

    async deleteContact(contactId: number) {
        await this.dbService.deleteContact(contactId);
        this.deletedContact.emit(contactId);
    }
    editContact = output<void>();
}
