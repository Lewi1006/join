import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'truncate'})

export class TruncatePipe implements PipeTransform{
    transform(value: string, limit: number = 20) {
        return value.length < limit ? value: value.substring(0,limit-1) + "...";
    }

}

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
    transform(value: string): string {
        const parts = value.trim().split(/\s+/);
        if (!parts.length) return '';

        const first = parts[0].charAt(0);
        const last = parts[parts.length - 1].charAt(0);
        return (first + last).toUpperCase();
    }
}