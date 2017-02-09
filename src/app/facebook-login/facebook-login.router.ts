import {RouterModule, Route} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {FacebookLoginComponent} from './facebook-login.component';

const routes: Route[] = [
  {
    path: '',
    component: FacebookLoginComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
