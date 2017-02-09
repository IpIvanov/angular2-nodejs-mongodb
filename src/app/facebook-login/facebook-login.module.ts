import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FacebookLoginComponent } from './facebook-login.component';
import { routing } from './facebook-login.router';
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
    FacebookLoginComponent
  ],
  bootstrap: [
    FacebookLoginComponent
  ]
})
export class FacebookLoginModule {
}
