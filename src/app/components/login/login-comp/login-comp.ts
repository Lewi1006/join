import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-comp',
  imports: [],
  templateUrl: './login-comp.html',
  styleUrl: './login-comp.scss',
})
export class LoginComp {
router = inject(Router)

goToSignUp(){
  this.router.navigate(['/signup']);
}


}
