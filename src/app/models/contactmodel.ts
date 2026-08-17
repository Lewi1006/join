import { Contact } from "../interfaces/contact";

export class ContactModel implements Contact{
    id: number;
    created_at: string;
    name: string;
    email: string;
    phone: string;

    constructor(data: Partial<Contact> = {}){
        this.id = data.id ?? 0;
        this.created_at = data.created_at ?? "";
        this.name = data.name ?? "";
        this.email = data.email ?? "";
        this.phone = data.phone ?? "";
    }
}