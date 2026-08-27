import { Service } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Service()
export class Crud {
    supabase = createClient(
        'https://rkjgcmzrhlmpbfapwvza.supabase.co',
        'sb_publishable_V4B66HpLZWJy9CzHT3Licg_WhntLnHS',
    );

    async getAll<T>(table: string, orderBy?: string): Promise<T[]> {
        let query = this.supabase.from(table).select('*');
        if (orderBy) {
            query = query.order(orderBy, { ascending: true });
        }
        const { data, error } = await query;
        if (error) {
            console.error(`getAll(${table}) failed:`, error.message);
            return [];
        }
        return data as T[];
    }

    async create<T>(table: string, item: Partial<T>): Promise<T | null> {
        const { data, error } = await this.supabase
            .from(table)
            .insert([item as any])
            .select()
            .single();
        if (error) {
            console.error(`create(${table}) failed:`, error.message);
            return null;
        }
        return data as T;
    }

    async update<T>(table: string, id: number, changes: Partial<T>): Promise<T | null> {
        const { data, error } = await this.supabase
            .from(table)
            .update(changes as any)
            .eq('id', id)
            .select()
            .single();
        if (error) {
            console.error(`update(${table}, ${id}) failed:`, error.message);
            return null;
        }
        return data as T;
    }

    async delete(table: string, id: number) {
        const { error } = await this.supabase.from(table).delete().eq('id', id);
        if (error) {
            console.error(`delete(${table}, ${id}) failed:`, error.message);
        }
    }
}
