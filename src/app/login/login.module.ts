import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {routing} from './login.router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations: [
        LoginComponent
    ],
    bootstrap: [
        LoginComponent
    ]
})
export class LoginModule {
}
