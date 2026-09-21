import { Routes } from '@angular/router';
import { ContactsComp } from './components/contacts-comp/contacts-comp';
import { BoardComp } from './components/board-comp/board-comp';
import { TaskComp } from './components/task-comp/task-comp';
import { SummaryComp } from './components/summary-comp/summary-comp';
import { PrivacyComp } from './components/privacy-comp/privacy-comp';
import { LegalComp } from './components/legal-comp/legal-comp';
import { HelpComp } from './components/help-comp/help-comp';
import { MainContentComp } from './components/main-content-comp/main-content-comp';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./components/login/login-comp/login-comp').then((m) => m.LoginComp),
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./components/login/signup-comp/signup-comp').then((m) => m.SignupComp),
    },
    {
        path: '',
        component: MainContentComp,
        children: [
            { path: 'summary', component: SummaryComp, canActivate: [AuthGuard] },
            { path: 'task', component: TaskComp, canActivate: [AuthGuard] },
            { path: 'board', component: BoardComp, canActivate: [AuthGuard] },
            { path: 'contacts', component: ContactsComp, canActivate: [AuthGuard] },
            { path: 'help', component: HelpComp, canActivate: [AuthGuard]},
            { path: 'privacy', component: PrivacyComp },
            { path: 'legal', component: LegalComp },
        ],
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
