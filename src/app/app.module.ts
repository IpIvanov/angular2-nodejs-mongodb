import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {routing} from './app.router';
import {effects, store, instrumentation} from './store';
import {SharedModule} from './shared/shared.module';
import {WeatherService} from './weather/weather.service';

import {MaterialModule} from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {Ng2Webstorage} from 'ng2-webstorage';

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
        ReactiveFormsModule,
        ToastModule.forRoot({animate: 'flyRight', positionClass: 'toast-bottom-right'}),
        Ng2Webstorage
    ],
    providers: [WeatherService],
    bootstrap: [AppComponent]
})
export class AppModule {}