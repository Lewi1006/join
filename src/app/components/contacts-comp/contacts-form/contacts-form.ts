import { Component, output } from '@angular/core';

@Component({
    selector: 'app-contacts-form',
    imports: [],
    templateUrl: './contacts-form.html',
    styleUrl: './contacts-form.scss',
})
export class ContactsForm {

    closeForm = output<void>();

    closeClick(){
        this.closeForm.emit();
    }
}
