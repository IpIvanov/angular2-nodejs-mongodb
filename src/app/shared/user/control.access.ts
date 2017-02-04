import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from 'ng2-webstorage';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from './user.service';

@Injectable()
export class PreventLoggedInAccess implements CanActivate {
    toastShown = false;
    isUserAuthenticated = false;

    constructor(
        private authService: AuthenticationService,
        private localStorage: LocalStorageService,
        public toastr: ToastsManager,
        private router: Router,
        public userService: UserService
    ) { }

    canActivate() {
        this.authService.authenticate(this.localStorage.retrieve('app-jwt')).subscribe(
            res => {
                if (res.status === 200) {
                    this.userService.setUserLogStatus(true);
                    this.isUserAuthenticated = true;
                }
            },
            err => {
                if (err === '403 - Forbidden') {
                    this.isUserAuthenticated = false;
                    this.userService.setUserLogStatus(false);
                    this.router.navigate(['/login']);
                }
            }
        );
        return this.isUserAuthenticated;
    }

}
