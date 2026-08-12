import { Routes } from '@angular/router';
import { ContactsComp } from './components/contacts-comp/contacts-comp';
import { HelpComp } from './components/help-comp/help-comp';

export const routes: Routes = [
    {
        path: "",
        component: ContactsComp,
    },
    {
        path: 'help',
        component: HelpComp,

    }
];
