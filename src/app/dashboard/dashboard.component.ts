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
  homeTeamImgs: Array<string> = [];
  awayTeamImgs: Array<string> = [];
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
        this.getHomeTeamsImgs(res.fixtures);
        this.getAwayTeamsImgs(res.fixtures);
      },
      err => console.log(err),
      () => console.log('Stop loader fetching is complete!')
      )
  }

  // try to get images from http://api.football-data.org/v1/teams?name=Manchester%20United

  getHomeTeamsImgs(teams) {
    let homeImgs$ = [];
    teams.forEach(team => {
      homeImgs$.push(this.footballData.getTeam(team._links.homeTeam.href));
    });
    Observable.forkJoin(homeImgs$)
      .subscribe((res: any) => {
        console.log(res);
        this.homeTeamImgs = res;
      });
  }

  getAwayTeamsImgs(teams) {
    let awayImgs$ = [];
    teams.forEach(team => {
      awayImgs$.push(this.footballData.getTeam(team._links.awayTeam.href));
    });
    Observable.forkJoin(awayImgs$)
      .subscribe((res: any) => {
        console.log(res);
        this.awayTeamImgs = res;
      });
  }
}
