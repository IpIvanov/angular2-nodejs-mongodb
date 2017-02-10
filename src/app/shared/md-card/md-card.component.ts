import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-card',
  templateUrl: './md-card.component.html',
  styleUrls: ['./md-card.component.scss']
})
export class CardComponent {
  // @Input() homeTeamImgs: string;
  // @Input() awayTeamImgs: string;
  @Input() title: string;
  @Input() timeStart: string;
  @Input() odds: Object;
  @Input() status: string;
  @Input() result: Object;
}
