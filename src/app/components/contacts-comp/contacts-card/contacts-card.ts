import { Component, Input } from '@angular/core';
import { Contact } from '../../../shared/interfaces/contact.interface';

@Component({
    selector: 'app-contacts-card',
    imports: [],
    templateUrl: './contacts-card.html',
    styleUrl: './contacts-card.scss',
})
export class ContactsCard {
    @Input()contact!:Contact;
}
