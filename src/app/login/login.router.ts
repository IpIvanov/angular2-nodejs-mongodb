import {RouterModule, Route} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './login.component';

const routes: Route[] = [
    {
        path: '',
        component: LoginComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
