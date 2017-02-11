import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { IAppState } from './store/index';
import { USER_GET } from './store/profile/profile.actions';

import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { AuthenticationService } from './shared/user/authentication.service';
import { UserService } from './shared/user/user.service';
import { FootballDataService } from './shared/football-data/football-data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    username: string;
    userLogged: boolean;
    avatarImg: string;

    constructor(
        public vRef: ViewContainerRef,
        private router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this.authService.isLoggedIn(localStorage.getItem('app-jwt')).then(
                    (res) => {
                        if (res.error === '403 - Forbidden') {
                            this.userLogged = false;
                            this.username = res.username;
                        }
                        if (res.message === 'Valid token.') {
                            this.userLogged = true;
                            this.username = res.username;
                        }
                    }
                );
            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
        });
    }

    handleNormalLogin(userInfo: Array<any>) {
        this.username = userInfo[0];
        this.avatarImg = userInfo[1];
        this.userLogged = true;
    }

    setUsername(username) {
        this.username = username;
        this.userLogged = false;
    }
}
