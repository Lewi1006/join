import { Component, inject, output } from '@angular/core';
import { ContactsService } from '../../../shared/services/contacts.service';
import { Contact } from '../../../shared/interfaces/contact.interface';
import { InitialsPipe } from '../../../shared/pipes.pipe'; 

@Component({
    selector: 'app-contacts-list',
    imports: [InitialsPipe],
    templateUrl: './contacts-list.html',
    styleUrl: './contacts-list.scss',
})
export class ContactsList {
    dbService = inject(ContactsService);
    // pass interface as type into output
    selectedContact = output<Contact>();

    addContact = output<void>();

    ngOnInit() {
        this.dbService.getAllContacts();
        this.dbService.cloneArray();
    }
}
