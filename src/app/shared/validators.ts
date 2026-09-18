import { FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export function DateValidator(control: AbstractControl) {
    const value = control.value;
    if (value == null || value == '' || value < new Date().toISOString().split('T')[0]) {
        return { required: true };
    } else {
        return null;
    }
}

export function SubtaskValidator(control: AbstractControl) {
    const value = control.value;
    if (value == null || value == '') {
        return null;
    }
    if (value.startsWith(' ') || value.trim() == '') {
        return { required: true };
    } else {
        return null;
    }
}

export function passwordMustMatch(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
        return { passwordMismatch: true };
    } else {
        return null;
    }
}
