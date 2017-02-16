import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { FacebookService, FacebookLoginResponse } from 'ng2-facebook-sdk';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogWindowComponent } from '../md-dialog/md-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { DialogsService } from '../md-dialog/md-dialog.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-md-navigation',
    templateUrl: './md-navigation.component.html',
    styleUrls: ['./md-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

    @ViewChild('topnav') topnav: ElementRef;
    @Input() name: string;
    @Input() userLogged: boolean;
    @Output() onLogout = new EventEmitter<string>();
    avatarImg: string;

    constructor(
        public router: Router,
        public facebookService: FacebookService,
        public dialog: MdDialog,
        public iconRegistry: MdIconRegistry,
        public sanitizer: DomSanitizer,
        private dialogsService: DialogsService,
        private viewContainerRef: ViewContainerRef
    ) {
        iconRegistry.addSvgIcon(
            'facebook-icon',
            sanitizer.bypassSecurityTrustResourceUrl('../../../assets/imgs/facebook.svg'));
    }

    ngOnInit() {
    }

    toggle() {
        this.topnav.nativeElement.classList.toggle(['responsive']);
    }

    signOut() {
        localStorage.removeItem('app-jwt');
        this.name = undefined;
        this.userLogged = false;
        this.onLogout.emit(this.name);
        this.faceBookLogout();
    }

    faceBookLogout() {
        this.facebookService.logout().then(
            (response: FacebookLoginResponse) => {
                this.onLogout.emit(this.name);
            },
            (error: any) => console.error(error)
        );
    }

    setUserInfo(userInfo: Array<any>) {
        this.name = userInfo[0];
        if (userInfo[1].indexOf('fbcdn.net') !== -1) {
            this.avatarImg = userInfo[1];
        } else {
            this.avatarImg = '/api/static/imgs/avatars/' + userInfo[1];
        }
        this.userLogged = true;

    }

    openDialog() {
        this.dialogsService
            .confirm(null, null, this.viewContainerRef)
            .subscribe((res: any) => {
                if (res) {
                    this.setUserInfo(res);
                }
            });
    }
}

