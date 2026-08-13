import { Routes } from '@angular/router';
import { ContactsComp } from './components/contacts-comp/contacts-comp';
import { HelpComp } from './components/help-comp/help-comp';
import { LoginComp } from './components/login-comp/login-comp';

export const routes: Routes = [
    {
        path: 'contacts',
        component: ContactsComp,
    },
    {
        path: 'help',
        component: HelpComp,
    },
    {
        path: 'logout',
        component: LoginComp,
    },
];
