import { Injectable, signal} from '@angular/core';
import { Alert, AlertType } from '../interfaces/alert.interface';

@Injectable({ providedIn: 'root' })

export class AlertService {
  alert = signal<Alert | undefined>(undefined);

  showAlert(message: string, type: AlertType, duration: number){

    console.log('ALERT TRIGGERED:', {
        message,
        type,
        duration
    });
    
    this.alert.set({message, type, duration,});

    setTimeout(() => {
        this.alert.set(undefined);
    }, duration)
  }

    success(message: string, duration: number) {
        this.showAlert(message, AlertType.Success, duration);
    }

    // error(message: string, duration: number) {
    //     this.showAlert(message, AlertType.Error, duration);
    // }

    // warning(message: string, duration: number) {
    //     this.showAlert(message, AlertType.Warning, duration);
    // }

}
