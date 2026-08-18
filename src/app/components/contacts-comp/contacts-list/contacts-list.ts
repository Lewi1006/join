import { Component, inject, output } from '@angular/core';
import { ContactsService } from '../../../shared/services/contacts.service';
import { JsonPipe } from '@angular/common';
import { Contact } from '../../../shared/interfaces/contact.interface';

@Component({
    selector: 'app-contacts-list',
    imports: [JsonPipe],
    templateUrl: './contacts-list.html',
    styleUrl: './contacts-list.scss',
})

export class ContactsList {
    dbService = inject(ContactsService);
    // pass interface as type into output
    selectedContact = output<Contact>()

    ngOnInit(){
        this.dbService.getAllContacts();
    }


}
