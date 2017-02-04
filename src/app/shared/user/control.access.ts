import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from 'ng2-webstorage';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class PreventLoggedInAccess implements CanActivate {
    toastShown = false;

    constructor(private authService: AuthenticationService, private localStorage: LocalStorageService, public toastr: ToastsManager) { }

    canActivate() {
        return this.authService.authenticate(this.localStorage.retrieve('app-jwt'));
    }
}