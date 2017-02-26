import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DialogWindowComponent } from '../../md-dialog/md-dialog.component';
import { FacebookService, FacebookApiMethod, FacebookInitParams, FacebookLoginResponse } from 'ng2-facebook-sdk';
import { MdDialogRef } from '@angular/material';
import { UserService } from '../../user/user.service';

@Component({
    selector: 'app-facebook-login',
    templateUrl: './facebook-login.component.html',
    styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent {

    fbApiMethod: FacebookApiMethod;

    @Output() userUpdated = new EventEmitter<Array<any>>();
    @Input() dialogRef: MdDialogRef<DialogWindowComponent>;

    constructor(private userService: UserService, private facebookService: FacebookService) { }

    ngOnInit() {
        let fbParams: FacebookInitParams = {
            appId: '1800762523509083',
            xfbml: true,
            version: 'v2.6',
            status: true
        };
        this.facebookService.init(fbParams);
    }

    faceBookLogin(): void {
       let user = '';
        this.userService.facebookLogin(user).toPromise().then(
                    (response: any) => {
                    console.log(response);
                        if (this.dialogRef) {
                            this.dialogRef.close([response.name, response.picture.data.url]);
                        } else {
                            this.userUpdated.emit([response.name, response.picture.data.url]);
                        }
            },
            (error: any) => console.error(error)
        );
    }
}
