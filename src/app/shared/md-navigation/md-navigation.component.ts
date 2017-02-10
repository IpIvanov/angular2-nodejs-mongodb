import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-md-navigation',
    templateUrl: './md-navigation.component.html',
    styleUrls: ['./md-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

    @ViewChild('topnav') topnav: ElementRef;
    @Input() name: string;
    @Input() userLogged: boolean;
    @Output() onLogout = new EventEmitter<string>();
    avatarLink: string;

    constructor(
        public router: Router
    ) { }

    ngOnInit() {
        this.avatarLink = '../../assets/avatars/avatars-material-man-2.png';
    }

    toggle() {
        this.topnav.nativeElement.classList.toggle(['responsive']);
    }

    signOut() {
        localStorage.removeItem('app-jwt');
        this.name = undefined;
        this.userLogged = false;
        this.onLogout.emit(this.name);
        this.router.navigate(['/login']);
    }
}
