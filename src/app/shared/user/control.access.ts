import { Injectable, OnInit } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from './user.service';
import { Response } from 'express';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PreventLoggedInAccess implements CanActivate {
    isUserAuthenticated = false;
    token = '';

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        public userService: UserService
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

