import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { AuthenticationService } from '../user/authentication.service';
import { LocalStorageService } from 'ng2-webstorage';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'md-navigation',
    templateUrl: './md-navigation.component.html',
    styleUrls: ['./md-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

    @ViewChild('topnav') topnav: ElementRef;

    logged = false;
    toastShown = false;

    constructor(
        public router: Router,
        private authenticationService: AuthenticationService,
        private localStorage: LocalStorageService,
        public toastr: ToastsManager
    ) { }

    ngOnInit() {
        // this.router.events.forEach((event) => {
        //     if (event instanceof NavigationStart) {
        //         this.authenticationService.authenticate(this.localStorage.retrieve('app-jwt')).subscribe(res => {
        //             console.log(res.message)
        //             if (res.message === 'Invalid token.') {
        //                 if (this.router.url !== '/login' && this.router.url !== '/signup') {
        //                     this.router.navigateByUrl('login');
        //                     if (!this.toastShown) {
        //                         this.toastr.warning('Please log in first.', 'Warning');
        //                         this.toastShown = true;
        //                     }
        //                 }
        //             } else if (res.message === 'Valid token.') {
        //                 this.logged = true;
        //             }
        //         });
        //     }
        //     // NavigationEnd
        //     // NavigationCancel
        //     // NavigationError
        //     // RoutesRecognized
        // });
    }

    toggle() {
        this.topnav.nativeElement.classList.toggle(['responsive']);
    }

    signOut() {
        this.localStorage.clear('app-jwt');
        this.router.navigateByUrl('login');
        this.logged = false;
    }

}
