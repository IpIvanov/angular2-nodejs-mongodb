import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FacebookService, FacebookApiMethod, FacebookInitParams, FacebookLoginResponse } from 'ng2-facebook-sdk/dist/index';

@Component({
    selector: 'app-facebook-login',
    templateUrl: './facebook-login.component.html',
    styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent  {

    fbApiMethod:FacebookApiMethod;

    @Input() username: string;
    @Output() onFacebookLogin = new EventEmitter<any>();

    constructor(public facebookService:FacebookService) {


    }



    ngOnInit() {
        let fbParams:FacebookInitParams = {
            appId: '1800762523509083',
            xfbml: true,
            version: 'v2.6'
        };
        this.facebookService.init(fbParams);
    }


    faceBookLogin():void {
        this.facebookService.login().then(
            (response:FacebookLoginResponse) => {
                console.log(response);
                this.facebookService.api('/me', this.fbApiMethod, {fields: ['id', 'name', 'picture']}).then(
                    (response:any) => {
                        console.log(response);
                        this.username = response.name;
                        console.log(response.name)
                        this.onFacebookLogin.emit(this.username)
                    }
                );
            },
            (error:any) => console.error(error)
        );
    }

    faceBookLogout():void {
        this.facebookService.logout().then(
            (response:FacebookLoginResponse) => {
                console.log(response)
            },
            (error:any) => console.error(error)
        );
    }

}
