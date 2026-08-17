import { Component, inject } from '@angular/core';
import { Contacts } from './contacts';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-contacts-list',
    imports: [JsonPipe],
    templateUrl: './contacts-list.html',
    styleUrl: './contacts-list.scss',
})

export class ContactsList {
    dbService = inject(Contacts);

    ngOnInit(){
        this.dbService.getAllContacts();
    }
}
