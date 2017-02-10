import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FacebookService, FacebookApiMethod, FacebookInitParams, FacebookLoginResponse } from 'ng2-facebook-sdk/dist/index';

@Component({
    selector: 'app-facebook-login',
    templateUrl: './facebook-login.component.html',
    styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent {

    fbApiMethod: FacebookApiMethod;

    @Input() username: string;
    @Output() userUpdated = new EventEmitter<Array<any>>();

    constructor(public facebookService: FacebookService) { }

    ngOnInit() {
        let fbParams: FacebookInitParams = {
            appId: '1800762523509083',
            xfbml: true,
            version: 'v2.6'
        };
        this.facebookService.init(fbParams);
    }

    faceBookLogin(): void {
        this.facebookService.login().then(
            (response: FacebookLoginResponse) => {
                console.log(response);
                this.facebookService.api('/me', this.fbApiMethod, { fields: ['id', 'name', 'picture'] }).then(
                    (response: any) => {
                        console.log(response);
                        this.username = response.name;
                        console.log(response.name)
                        this.userUpdated.emit([this.username, response.picture.data.url])
                    }
                );
            },
            (error: any) => console.error(error)
        );
    }
}
