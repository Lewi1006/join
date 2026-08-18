import { Component } from '@angular/core';
import { ContactsCard } from './contacts-card/contacts-card';
import { ContactsList } from './contacts-list/contacts-list';

@Component({
    selector: 'app-contacts-comp',
    imports: [ContactsCard, ContactsList],
    templateUrl: './contacts-comp.html',
    styleUrl: './contacts-comp.scss',
})
export class ContactsComp {
    
    contactWasSelected(){
        console.log('selected');
    }
}
