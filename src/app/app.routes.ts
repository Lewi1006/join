import { Routes } from '@angular/router';
import { ContactsComp } from './components/contacts-comp/contacts-comp';
import { BoardComp } from './components/board-comp/board-comp';
import { TaskComp } from './components/task-comp/task-comp';
import { SummaryComp } from './components/summary-comp/summary-comp';
import { PrivacyComp } from './components/privacy-comp/privacy-comp';
import { LegalComp } from './components/legal-comp/legal-comp';
import { HelpComp } from './components/help-comp/help-comp';
import { LoginComp } from './components/login-comp/login-comp';

export const routes: Routes = [
    { path: 'summary', component: SummaryComp },
    { path: 'task', component: TaskComp },
    { path: 'board', component: BoardComp },
    {
        path: 'contacts',
        component: ContactsComp,
    },
    {
        path: 'privacy',
        component: PrivacyComp,
    },
    {
        path: 'legal',
        component: LegalComp,
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
