import { Injectable, signal, computed, inject } from '@angular/core';
import { Contact } from '../interfaces/contact.interface';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class ContactsService {
    crud = inject(CrudService);

    table = 'contacts';

    contacts = signal<Contact[]>([]);

    cloneArray() {
        const clonedContacts = [...this.contacts()];
        return clonedContacts;
    }

    // computed signal reacts to contacts (--> supabase data)
    readonly groupedContacts = computed(() => {
        // clone array https://www.geeksforgeeks.org/typescript/how-to-clone-an-array-in-typescript/
        // we only work with
        // const clonedContacts = [...this.contacts()];
        const clonedContacts = this.cloneArray();

        clonedContacts.sort((a, b) => a.name.localeCompare(b.name));

        const letterGroups = this.groupContactsByLetter(clonedContacts);

        // https://dev.to/askyt/how-to-sort-a-map-in-javascript-324a
        return Array.from(letterGroups);
    });

    groupContactsByLetter(clonedContacts: Contact[]) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
        // <> = TypeScript generics --> tells the Type so string (A), ContactsArray[]
        const letterGroups = new Map<string, Contact[]>();

        for (const currentContact of clonedContacts) {
            const letter = currentContact.name.charAt(0).toUpperCase();

            const contactWithLetterX = letterGroups.get(letter) ?? [];

            contactWithLetterX.push(currentContact);
            letterGroups.set(letter, contactWithLetterX);
        }

        return letterGroups;
    }

    // readonly groupedContacts = computed(() => {
    //     // clone array https://www.geeksforgeeks.org/typescript/how-to-clone-an-array-in-typescript/
    //     const clonedContacts = [...this.contacts()];
    // });

    async getAllContacts() {
        const contacts = await this.crud.getAll<Contact>(this.table, 'name');
        this.contacts.set(contacts);
    }

    colors = [
        '#ff7a00',
        '#ff5eb3',
        '#6e52ff',
        '#9327ff',
        '#00bee8',
        '#1fd7c1',
        '#ffa35e',
        '#fc71ff',
        '#ffc701',
        '#0038ff',
        '#c3ff2b',
        '#ffe62b',
        '#ff4646',
        '#ffbb2b',
    ];
    randomColor(): string {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    async createContact(contact: Contact) {
        const contactWithColor = { ...contact, profile_color: this.randomColor() };
        const createdContact = await this.crud.create<Contact>(this.table, contactWithColor);

        await this.getAllContacts();
        return createdContact;
    }

    async deleteContact(id: number) {
        await this.crud.delete(this.table, id);
        await this.getAllContacts();
    }

    async updateContact(id: number, contact: Contact) {
        await this.crud.update<Contact>(this.table, id, {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
        });

        await this.getAllContacts();
    }
}
