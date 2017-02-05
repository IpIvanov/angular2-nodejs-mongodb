import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class PreventLoggedInAccess implements CanActivate {
    isUserAuthenticated = false;
    token = '';

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    canActivate() {
        return this.authService.isLoggedIn(localStorage.getItem('app-jwt')).then(
            (res) => {
                if (res.error === '403 - Forbidden') {
                    this.router.navigate(['/login']);
                    return false;
                }
                if (res.message === 'Valid token.') {
                    return true;
                }
            }
        );
    }
}

