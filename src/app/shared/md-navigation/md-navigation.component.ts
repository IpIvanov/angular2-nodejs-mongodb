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
    @Input() logged: boolean;
    @Output() onLogout = new EventEmitter<string>();
    username: string;

    constructor(
        public router: Router
    ) { }

    ngOnInit() {
    }

    toggle() {
        this.topnav.nativeElement.classList.toggle(['responsive']);
    }

    signOut(username: string) {
        localStorage.removeItem('app-jwt');
        this.onLogout.emit(username);
        this.username = undefined;
        this.router.navigate(['/login']);
    }
}
