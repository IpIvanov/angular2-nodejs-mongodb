import { FootballDataService } from './../shared/football-data/football-data.service';
import { Component, OnInit, trigger, state, style, transition, animate, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('toggleContainerWidth', [
      state('predictionsClosed', style({
        transform: 'translateX(0)'
      })),
      state('predictionsOpened', style({
        transform: 'translateX(-280px)'
      })),
      transition('predictionsClosed => predictionsOpened', animate('200ms ease-in')),
      transition('predictionsOpened => predictionsClosed', animate('200ms ease-out')),
    ])
  ]
})
export class DashboardComponent implements OnInit {
  form: FormGroup;
  title: string;
  description: string;
  fixtures: Array<Object> = [];
  startDate = new Date().toISOString().slice(0, 10);
  endDate = new Date().toISOString().slice(0, 10);
  todaysDate = new Date().toLocaleDateString();
  tommorow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10);
  todaysMatches: Array<Object>;
  sideMenuState: string = 'predictionsClosed';
  containerWidth: number;

  constructor(public footballData: FootballDataService, private el: ElementRef) {
  }

  ngOnInit() {
    this.getTodaysMatches(this.startDate, this.endDate);
    this.containerWidth = this.el.nativeElement.querySelector('.predictions-list').offsetWidth;
  }

  getTodaysMatches(startDate, endDate): void {
    this.footballData.getLeagueFixturesByDay(startDate, endDate)
      .subscribe(
      res => {
        this.todaysMatches = res.fixtures;
      },
      err => console.log(err),
      () => console.log('Stop loader fetching is complete!')
      );
  }

  handleAddPrediction(prediction) {
    let removedElmIndex;
    this.fixtures.forEach((fixture: any, index: number) => {
      if (fixture.homeTeamName === prediction.homeTeamName && fixture.awayTeamName === prediction.awayTeamName) {
        this.fixtures.splice(index, 1);
        removedElmIndex = index;
      }
    });
    let copy = Object.assign({}, prediction);
    if (removedElmIndex !== undefined) {
      this.fixtures.splice(removedElmIndex, 0, copy);
    } else {
      this.fixtures.push(copy);
    }
    this.setSideMenuState();
  }

  handleMenuClose(menuState) {
    this.sideMenuState = menuState;
  }

  getContainerWidth(): number {
    return this.containerWidth;
  }

  setSideMenuState() {
    if (this.fixtures.length > 0) {
      this.sideMenuState = 'predictionsOpened';
    } else {
      this.sideMenuState = 'predictionsClosed';
    }
  }
}
