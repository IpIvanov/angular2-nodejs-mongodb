import { ListOverviewComponent } from './md-list/md-list.component';
import { FootballDataService } from './football-data/football-data.service';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './md-navigation/md-navigation.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from './md-card/md-card.component';
import { LoaderComponent } from './loader/loader.component';
import { CountryService } from './countries/country.service';
import { UserService } from './user/user.service';

import { ButtonOverviewExample } from './md-button/md-button.component';
import { MaterialModule } from '@angular/material';
import { MdSnackBarService } from './snackbar/snakbar.service';
import { FacebookService } from 'ng2-facebook-sdk';
import { FacebookLoginComponent } from './facebook/login/facebook-login.component';
import { DialogWindowComponent } from './md-dialog/md-dialog.component';
import { DialogsService } from './md-dialog/md-dialog.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        TopNavigationComponent,
        CardComponent,
        ButtonComponent,
        LoaderComponent,
        ButtonOverviewExample,
        ListOverviewComponent,
        FacebookLoginComponent,
        DialogWindowComponent,
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule.forRoot()
    ],
    exports: [
        TopNavigationComponent,
        LoaderComponent,
        CardComponent,
        ButtonComponent,
        ButtonOverviewExample,
        ListOverviewComponent,
        FacebookLoginComponent,
        DialogWindowComponent,
        LoginComponent,
        SignupComponent
    ],
    providers: [
        CountryService,
        UserService,
        FootballDataService,
        FacebookService,
        MdSnackBarService,
        DialogsService
    ],
    entryComponents: [
        DialogWindowComponent
    ]

})
export class SharedModule { }
