import { FootballDataService } from './../shared/football-data/football-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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

  constructor(public footballData: FootballDataService) {
  }

  ngOnInit() {
    this.getTodaysMatches(this.startDate, this.endDate);
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
    this.fixtures.forEach((fixture: any, index: number) => {
      if (fixture.homeTeamName === prediction.homeTeamName && fixture.awayTeamName === prediction.awayTeamName) {
        this.fixtures.splice(index, 1);
      }
    })
    let copy = Object.assign({}, prediction);
    this.fixtures.push(copy);
    if (this.fixtures.length > 0) {
      this.sideMenuState = 'predictionsOpened';
    } else {
      this.sideMenuState = 'predictionsClosed';
    }
  }

  handleMenuClose(menuState) {
    this.sideMenuState = menuState;
  }
}
