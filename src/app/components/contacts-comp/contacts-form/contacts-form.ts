import { Component, output, input } from '@angular/core';

@Component({
    selector: 'app-contacts-form',
    imports: [],
    templateUrl: './contacts-form.html',
    styleUrl: './contacts-form.scss',
})
export class ContactsForm {

    formMode = input<'add' | 'edit'>('add')

    closeForm = output<void>();

    closeClick(){
        this.closeForm.emit();
    }
}
