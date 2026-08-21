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

    async createContact(contact: Contact) {
        const { data, error } = await this.supabase.from('contacts').insert([contact]);

        await this.getAllContacts();
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
