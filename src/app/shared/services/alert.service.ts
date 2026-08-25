import { Injectable, signal} from '@angular/core';
import { Alert } from '../interfaces/alert.interface';

@Injectable({ providedIn: 'root' })

export class AlertService {
  message = signal<Alert | undefined>(undefined);

//   switch case

}
