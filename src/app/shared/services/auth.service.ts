import { Injectable, signal } from '@angular/core';
import { Contact } from '../interfaces/contact.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // is User logged in or not (Contact with status guest or registered or undefined)
    currentUser = signal<Contact | undefined>(undefined);

    login(user: Contact): void {
        this.currentUser.set(user);
        console.log(user);
    }

    guestLogin(): void {
        const guest: Contact = {
            name: 'Guest',
            email: '',
            phone: '',
            status: 'guest',
        };

        this.currentUser.set(guest);

        console.log(guest);
    }

    logout(): void {
        this.currentUser.set(undefined);
    }

    isLoggedIn(): boolean {
        return this.currentUser() !== undefined;
    }
}
