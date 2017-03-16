import { RouterModule, Route, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PreventLoggedInAccess } from './shared/user/control.access';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    { path: 'dashboard', component: DashboardComponent }, //, canActivate: [PreventLoggedInAccess]
    { path: 'profile/:id', component: ProfileComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    routes
);
