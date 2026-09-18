import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    setSessionData(key: string, value: any): void {
        const jsonData = JSON.stringify(value);
        sessionStorage.setItem(key, jsonData);
    }

    getSessionData(key: string): any {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    removeSessionData(key: string): void {
        sessionStorage.removeItem(key);
    }

    clearSession(): void {
        sessionStorage.clear();
    }
}
