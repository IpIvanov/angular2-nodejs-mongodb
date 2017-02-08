import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() homeTeamImgs: string;
  @Input() awayTeamImgs: string;
  @Input() title: string;
  @Input() timeStart: string;
}
