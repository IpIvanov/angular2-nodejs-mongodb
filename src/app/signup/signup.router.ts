import {RouterModule, Route} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SignupComponent} from './signup.component';

const routes: Route[] = [
    {
        path: '',
        component: SignupComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
