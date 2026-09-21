import { Component, inject } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../interfaces/alert.interface';

@Component({
    selector: 'app-alert-comp',
    imports: [],
    templateUrl: './alert-comp.html',
    styleUrl: './alert-comp.scss',
})
export class AlertComp {
    alertService = inject(AlertService);
    alertType = AlertType;
}
