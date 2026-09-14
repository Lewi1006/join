import { Injectable, signal } from '@angular/core';
import { Alert, AlertType } from '../interfaces/alert.interface';

@Injectable({ providedIn: 'root' })
export class AlertService {
    alert = signal<Alert | undefined>(undefined);

    success(message: string, duration: number) {
        this.alert.set({ message, type: AlertType.Success, duration });

        setTimeout(() => {
            this.alert.set(undefined);
        }, duration);
    }
}
