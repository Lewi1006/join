import { Component, inject } from '@angular/core';
// import { Contact } from '../../../shared/interfaces/contact.interface';
import { ContactsService } from '../../../shared/services/contacts.service';

@Component({
    selector: 'app-contacts-card',
    imports: [],
    templateUrl: './contacts-card.html',
    styleUrl: './contacts-card.scss',
})
export class ContactsCard {
    // @Input()contact!:Contact;
     dbService = inject(ContactsService);

}
