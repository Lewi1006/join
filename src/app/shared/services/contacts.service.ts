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

/*     sortedContacts = computed(() => {
        return this.contacts().sort((a, b) => a.name.localeCompare(b.name));
    }); */

    async getAllContacts() {
        let { data: contacts, error } = await this.supabase.from('contacts').select('*');
        if (!contacts) return;
        this.contacts.set(contacts);
        this.contacts().sort((a, b) => a.name.localeCompare(b.name));
    }
}
