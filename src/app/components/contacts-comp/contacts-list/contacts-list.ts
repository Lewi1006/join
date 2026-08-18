import { Component, inject, output } from '@angular/core';
import { ContactsService } from '../../../shared/services/contacts.service';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-contacts-list',
    imports: [JsonPipe],
    templateUrl: './contacts-list.html',
    styleUrl: './contacts-list.scss',
})

export class ContactsList {
    dbService = inject(ContactsService);
    selectedContact = output<void>()

    ngOnInit(){
        this.dbService.getAllContacts();
    }

}
