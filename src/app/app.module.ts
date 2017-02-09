import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.router';
import { effects, store, instrumentation } from './store';
import { SharedModule } from './shared/shared.module';

import { MaterialModule } from '@angular/material';
import { PreventLoggedInAccess } from './shared/user/control.access';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthenticationService } from './shared/user/authentication.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        SharedModule,
        FormsModule,
        HttpModule,
        store,
        effects,
        routing,
        instrumentation,
        MaterialModule.forRoot(),
        ReactiveFormsModule
    ],
    providers: [PreventLoggedInAccess, {
        provide: AuthHttp,
        useFactory: authHttpServiceFactory,
        deps: [Http, RequestOptions]
    }, AuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
