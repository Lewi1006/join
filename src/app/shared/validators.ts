import { FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export function DateValidator(control: AbstractControl) {
    const value = control.value;
    if (
        value == null ||
        value == '' ||
        value < new Date().toISOString().split('T')[0]
    ) {
        //console.log('in the past')
        return { required: true };
    } else {
        //console.log('in the future');
        return null;
    }
}


export function SubtaskValidator(control: AbstractControl){
    const value = control.value;

     if (value == null || value == '') {
        return null;
    }

    if(value.startsWith(' ') || value.trim() == ''){
        return { required: true };
    } else {
        return null;
    }


}



