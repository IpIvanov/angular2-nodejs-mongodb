import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'md-navigation',
    templateUrl: './md-navigation.component.html',
    styleUrls: ['./md-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

    @ViewChild('topnav') topnav: ElementRef;

    constructor() {
    }

    ngOnInit() {
    }

    toggle() {
        this.topnav.nativeElement.classList.toggle(['responsive']);
    }

}
