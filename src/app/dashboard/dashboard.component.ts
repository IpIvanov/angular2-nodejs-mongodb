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
  imgsrc: string;
  title: string;
  description: string;
  startDate = new Date().toISOString().slice(0, 10);
  endDate = new Date().toISOString().slice(0, 10);
  todaysDate = new Date().toLocaleDateString();
  todaysMatches: Array<Object>;

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
      )
  }

  setMatchTitle(match): string {
    return match.homeTeamName + ' vs ' + match.awayTeamName;
  }

  setMatchStart(date: string): string {
    return new Date(date).toLocaleDateString() + '   ' + new Date(date).toLocaleTimeString();
  }
}
