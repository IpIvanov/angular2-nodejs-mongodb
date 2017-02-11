import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { MdSnackBarService } from '../snackbar/snakbar.service';

@Injectable()
export class PreventLoggedInAccess implements CanActivate {
    isUserAuthenticated = false;
    token = '';

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        public snackBar: MdSnackBarService
    ) { }

    canActivate() {
        return this.authService.isLoggedIn(localStorage.getItem('app-jwt')).then(
            (res) => {
                if (res.error === '403 - Forbidden') {
                    this.snackBar.open('You don\'t have access to this section. Please login or signup first.');
                    return false;
                }
                if (res.message === 'Valid token.') {
                    return true;
                }
            }
        );
    }
}

