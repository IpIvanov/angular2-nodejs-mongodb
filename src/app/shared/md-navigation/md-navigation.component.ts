import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { AuthenticationService } from '../user/authentication.service';
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

    constructor(
        public router: Router,
        private authenticationService: AuthenticationService,
        public toastr: ToastsManager,
        public preventLoggedInAccess: PreventLoggedInAccess,
        public userService: UserService
    ) { }

    ngOnInit() {
        this.router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
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
        localStorage.removeItem('app-jwt');
        this.router.navigate(['/login']);
    }
}
