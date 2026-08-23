import { Component, output } from '@angular/core';

@Component({
    selector: 'app-contacts-delete',
    imports: [],
    templateUrl: './contacts-delete.html',
    styleUrl: './contacts-delete.scss',
})
export class ContactsDelete {
    confirm = output<void>();
    cancel = output<void>();
}
