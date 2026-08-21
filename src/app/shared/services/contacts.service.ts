import { Injectable, signal, computed } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { Contact } from '../interfaces/contact.interface';

@Injectable({ providedIn: 'root' })
export class ContactsService {
    supabase = createClient(
        'https://rkjgcmzrhlmpbfapwvza.supabase.co',
        'sb_publishable_V4B66HpLZWJy9CzHT3Licg_WhntLnHS',
    );

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

    /*     sortedContacts = computed(() => {
        return this.contacts().sort((a, b) => a.name.localeCompare(b.name));
    }); */

    async getAllContacts() {
        let { data: contacts, error } = await this.supabase.from('contacts').select('*');
        if (!contacts) return;
        this.contacts.set(contacts);

        console.log(this.groupedContacts());

        // this.contacts().sort((a, b) => a.name.localeCompare(b.name));
    }

    async deleteContact(id: number) {
        const { error } = await this.supabase.from('contacts').delete().eq('id', id);
        await this.getAllContacts();
    }
}
