import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup-comp',
    imports: [ReactiveFormsModule],
    templateUrl: './signup-comp.html',
    styleUrl: './signup-comp.scss',
})
export class SignupComp {
    router = inject(Router);

    goBackToLogin() {
        this.router.navigate(['/login']);
    }

    signupForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        acceptPrivacy: new FormControl(false, [Validators.requiredTrue]),
    });
    
    
    signUp(){
   
        console.log(this.signupForm.value);

    }

}