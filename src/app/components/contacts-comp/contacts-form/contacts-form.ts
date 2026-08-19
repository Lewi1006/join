import { Component, output, input } from '@angular/core';

@Component({
    selector: 'app-contacts-form',
    imports: [],
    templateUrl: './contacts-form.html',
    styleUrl: './contacts-form.scss',
})
export class ContactsForm {

    receivedModeIsEdit = input(false);

    closeForm = output<void>();

    closeClick(){
        this.closeForm.emit();
    }
}
