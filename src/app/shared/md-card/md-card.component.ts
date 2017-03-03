import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
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
  @Input() fixture: Object;
  @Output() onPredictionAdded = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
    if (this.status === 'IN_PLAY') {
      this.status = 'LIVE';
    }
    if (this.status === 'TIMED') {
      this.status = 'Sched';
    }
  }

  addPrediction(fixture, prediction) {
    fixture.userPrediction = prediction;
    this.onPredictionAdded.emit(fixture);
  }
}
