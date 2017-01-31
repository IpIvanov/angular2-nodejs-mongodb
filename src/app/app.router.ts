import {RouterModule, Route} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const routes: Route[] = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {loadChildren: 'app/dashboard/dashboard.module#DashboardModule', path: 'dashboard'},
    {loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile'},
    {loadChildren: 'app/weather/weather.module#WeatherModule', path: 'weather'},
    {loadChildren: 'app/login/login.module#LoginModule', path: 'login'},
    {loadChildren: 'app/signup/signup.module#SignupModule', path: 'signup'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);
