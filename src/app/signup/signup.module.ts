import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { routing } from './signup.router';
import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,
        MaterialModule
    ],
    declarations: [
        SignupComponent
    ],
    bootstrap: [
        SignupComponent
    ]
})
export class SignupModule {
}
