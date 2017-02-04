import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { AuthenticationService } from '../user/authentication.service';
import { LocalStorageService } from 'ng2-webstorage';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { PreventLoggedInAccess } from '../user/control.access';
import { UserService } from '../user/user.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-md-navigation',
    templateUrl: './md-navigation.component.html',
    styleUrls: ['./md-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

    @ViewChild('topnav') topnav: ElementRef;

    logged: boolean;
    toastShown = false;

    constructor(
        public router: Router,
        private authenticationService: AuthenticationService,
        private localStorage: LocalStorageService,
        public toastr: ToastsManager,
        public preventLoggedInAccess: PreventLoggedInAccess,
        public userService: UserService
    ) { }

    ngOnInit() {
        this.logged = this.userService.getUserLogStatus();
        this.router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                this.logged = this.userService.getUserLogStatus();
            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
        });
    }

    toggle() {
        this.topnav.nativeElement.classList.toggle(['responsive']);
    }

    signOut() {
        this.localStorage.clear('app-jwt');
        this.router.navigate(['/login']);
        this.userService.setUserLogStatus(false);
        this.logged = this.userService.getUserLogStatus();
    }
}
