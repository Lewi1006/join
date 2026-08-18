import { Injectable, signal } from '@angular/core';
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
        let { data: contacts, error } = await this.supabase.from('contacts').select('*');
        if (!contacts) return;
        this.contacts.set(contacts);
    }

    async deleteContact(id: number) {
        const { error } = await this.supabase.from('contacts').delete().eq('id', id);
        await this.getAllContacts();
    }
}
