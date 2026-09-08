import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-confirmation-popup',
    imports: [],
    templateUrl: './confirmation-popup.html',
    styleUrl: './confirmation-popup.scss',
})
export class ConfirmationPopup {
    @Output() close = new EventEmitter<void>();

    closePopup() {
        this.close.emit();
    }
}
