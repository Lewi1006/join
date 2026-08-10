import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Navigation } from '../../layout/navigation/navigation';
import { Footer } from '../../layout/footer/footer';
import { ContactsComp } from '../../components/contacts-comp/contacts-comp';


@Component({
  selector: 'app-contacts',
  imports: [Header, Navigation, Footer, ContactsComp],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {}
