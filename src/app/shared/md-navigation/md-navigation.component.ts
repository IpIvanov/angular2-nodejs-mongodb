import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { FacebookService, FacebookLoginResponse } from 'ng2-facebook-sdk/dist/index';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-md-navigation',
    templateUrl: './md-navigation.component.html',
    styleUrls: ['./md-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

    @ViewChild('topnav') topnav: ElementRef;
    @Input() logged: boolean;
    @Input() username: string;
    @Input() facebookImg: string;

    @Output() userUpdated = new EventEmitter<Array<any>>();

    constructor(
        public router: Router,
        public facebookService: FacebookService
    ) { }

    ngOnInit() {
        if (this.facebookImg === undefined) {
            this.facebookImg = '../../assets/avatars/avatars-material-man-2.png';
        }
    }

    toggle() {
        this.topnav.nativeElement.classList.toggle(['responsive']);
    }

    signOut() {
        localStorage.removeItem('app-jwt');
        this.username = undefined;
        this.logged = false;
        this.facebookImg = undefined;
        this.router.navigate(['/login']);
        this.faceBookLogout();
    }

    faceBookLogout() {
        this.facebookService.logout().then(
            (response: FacebookLoginResponse) => {
                console.log(response)
                this.userUpdated.emit([this.username, this.facebookImg]);
            },
            (error: any) => console.error(error)
        );
    }
}
