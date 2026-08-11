import { Component } from '@angular/core';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-navigation',
  imports: [Footer],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {}
