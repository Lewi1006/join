import { Component, inject } from '@angular/core';
import { Footer } from '../footer/footer';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navigation',
  imports: [Footer, RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})

export class Navigation {
  authService = inject(AuthService)
}
