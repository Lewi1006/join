import { Injectable, signal} from '@angular/core';
import { Alert, AlertType } from '../interfaces/alert.interface';

@Injectable({ providedIn: 'root' })

export class AlertService {
  alert = signal<Alert | undefined>(undefined);

  showAlert(message: string, type: AlertType, duration: number){

    this.alert.set({message, type, duration,});

    setTimeout(() => {
        this.alert.set(undefined);
    }, duration)
  }

    success(message: string, duration: number) {
        this.showAlert(message, AlertType.Success, duration);
    }

}
