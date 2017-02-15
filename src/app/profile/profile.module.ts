import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { routing } from './profile.router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [
    ProfileComponent
  ],
  bootstrap: [
    ProfileComponent
  ]
})
export class ProfileModule { }
