import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({providedIn: 'root'})
export class ContactsService {
    supabase = createClient(
        'https://rkjgcmzrhlmpbfapwvza.supabase.co',
        'sb_publishable_V4B66HpLZWJy9CzHT3Licg_WhntLnHS',
    );

    contacts = signal<{id:number,created_at:string,name:string,email:string,phone:string}[]>([])

    async getAllContacts() {
        let { data: contacts, error } = await this
        .supabase
        .from('contacts')
        .select('*');
        if(!contacts) return
        this.contacts.set(contacts);
    }
}
