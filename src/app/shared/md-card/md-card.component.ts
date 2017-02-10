import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-card',
  templateUrl: './md-card.component.html',
  styleUrls: ['./md-card.component.scss']
})
export class CardComponent implements OnInit {
  // @Input() homeTeamImgs: string;
  // @Input() awayTeamImgs: string;
  @Input() title: string;
  @Input() timeStart: string;
  @Input() odds: Object;
  @Input() status: string;
  @Input() result: Object;

  constructor() { }

  ngOnInit() {
    if (this.status === 'IN_PLAY') {
      this.status = 'LIVE';
    }
    if (this.status === 'TIMED') {
      this.status = 'Sched';
    }
  }
}
