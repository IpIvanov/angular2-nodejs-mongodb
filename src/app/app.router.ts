import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PreventLoggedInAccess } from './shared/user/control.access';

const routes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { loadChildren: 'app/dashboard/dashboard.module#DashboardModule', path: 'dashboard' }, //, canActivate: [PreventLoggedInAccess]
    { loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);
