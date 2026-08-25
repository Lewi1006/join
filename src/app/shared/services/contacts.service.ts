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

    // readonly groupedContacts = computed(() => {
    //     // clone array https://www.geeksforgeeks.org/typescript/how-to-clone-an-array-in-typescript/
    //     const clonedContacts = [...this.contacts()];
    // });

    async getAllContacts() {
        let { data: contacts, error } = await this.supabase
            .from('contacts')
            .select('*')
            .order('name', { ascending: true });
        /* .ilike('name', 'A%'); // only works when not using .order - but filtering at DB level doesn't make sense anyway
        // https://www.rapidevelopers.com/supabase-tutorial/how-to-query-with-filters-in-supabase */

        if (!contacts) return;
        this.contacts.set(contacts);

        // Not needed when using .order
        /* this.contacts().sort((a, b) => a.name.localeCompare(b.name)); */
    }

    colors = [
        '#ff7a00',
        '#ff5eb3',
        '#6e52ff',
        '#9327ff',
        '#00bee8',
        '#1fd7c1',
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
        const { data, error } = await this.supabase
            .from('contacts')
            .insert([contactWithColor])
            .select()
            .single();

        await this.getAllContacts();
        return data;
    }

    async deleteContact(id: number) {
        const { error } = await this.supabase.from('contacts').delete().eq('id', id);
        await this.getAllContacts();
    }

    async updateContact(id: number, contact: Contact) {
        const { data, error } = await this.supabase
            .from('contacts')
            .update({ name: contact.name, email: contact.email, phone: contact.phone })
            .eq('id', id)
            .select();

        await this.getAllContacts();
    }
}
