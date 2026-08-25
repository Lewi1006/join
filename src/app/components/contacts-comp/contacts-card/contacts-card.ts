import { Component, inject, input, output } from '@angular/core';
import { Contact } from '../../../shared/interfaces/contact.interface';
import { ContactsService } from '../../../shared/services/contacts.service';
import { InitialsPipe } from '../../../shared/pipes.pipe';

@Component({
    selector: 'app-contacts-card',
    imports: [InitialsPipe],
    templateUrl: './contacts-card.html',
    styleUrl: './contacts-card.scss',
})
export class ContactsCard {
    settingsOpen = false;
    // Contact selected in the contact list and displayed in the card.
    receivedContact = input<Contact>();

    // Notifies the parent that the user wants to edit the displayed contact.
    editContact = output<void>();

    // Notifies the parent that the user wants to delete the displayed contact.
    // The parent then opens the delete confirmation dialog.
    deleteRequested = output<void>();

    back = output<void>();
    dbService = inject(ContactsService);
}
