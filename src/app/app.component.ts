import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

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
    state: string = 'predictionsClosed';

    constructor(
        public vRef: ViewContainerRef,
        private router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                // this.authService.isLoggedIn(localStorage.getItem('app-jwt')).then(
                //     (res) => {
                //         if (res.error === '403 - Forbidden') {
                //             this.userLogged = false;
                //         }
                //         if (res.message === 'Valid token.') {
                //             this.userLogged = true;
                //             this.username = res.username;
                //             this.avatarImg = res.avatarImg;
                //         }
                //     }
                // );
            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
        });
    }

    setUsername(username) {
        this.username = username;
        this.userLogged = false;
    }
}
