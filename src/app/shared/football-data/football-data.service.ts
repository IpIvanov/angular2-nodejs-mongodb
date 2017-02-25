import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class FootballDataService {

    headers: Headers;
    options: RequestOptions;
    API = '7af66f944d6c4289a2a7da6c502dd4ae';

    constructor(public http: Http) {
        this.headers = new Headers({ 'X-Auth-Token': this.API }); // ... Set content type to JSON
        this.options = new RequestOptions({ headers: this.headers }); // Create a request option
    }

    /**
     * Get leagues by year. If no year is provided returns leagues for latest season.
     *
     * @param {string} [year]
     * @returns {Observable<any>}
     *
     * @memberOf UserService
     */
    getLeagues(year?: string): Observable<any> {
        return this.http.get(`https://api.football-data.org/v1/competitions/?season=` + year, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Get league table by league(id) and matchday. If no matchday is provided it returns
     * the league table for latest matchday.
     * @param {string} id
     * @param {string} [matchday]
     * @returns {Observable<any>}
     * 
     * @memberOf UserService
     */
    LeagueTable(id: string, matchday?: string): Observable<any> {
        return this.http.get(`https://api.football-data.org/v1/competitions/` + id + `/leagueTable/?matchday=` + matchday, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Get teams by league(id)
     * 
     * @param {string} id
     * @returns {Observable<any>}
     * 
     * @memberOf UserService
     */
    getLeagueTeams(id: string): Observable<any> {
        return this.http.get(`https://api.football-data.org/v1/competitions/` + id + `/teams`, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Get league fixtures by matchday. If no matchday is provided
     * it returns all fixtures for the league.
     * @param {string} id
     * @param {string} [matchday]
     * @returns {Observable<any>}
     * 
     * @memberOf UserService
     */
    getLeagueFixturesByMatchDay(id: string, matchday?: string): Observable<any> {
        return this.http.get(`https://api.football-data.org/v1/competitions/` + id + `/fixtures/?matchday=` + matchday, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Get league fixtures into certen timeframe interval.
     * Time frame formats should be: YYYY-DD-MM (2017-01-30)
     * 
     * @param {string} id
     * @param {string} [timeFrameStart] default: today
     * @param {string} [timeFrameEnd] default: +7days
     * @returns {Observable<any>}
     * 
     * @memberOf UserService
     */
    getLeagueFixturesByTimeframe(id: string, timeFrameStart?: string, timeFrameEnd?: string): Observable<any> {
        return this.http.get(`https://api.football-data.org/v1/competitions/`
            + id + `/fixtures/?timeFrameStart=`
            + timeFrameStart + `&timeFrameEnd=` + timeFrameEnd,
            this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Get head2head fixtures.
     * 
     * @param {string} id
     * @param {string} [numberOfFixtures] default: 10
     * @returns {Observable<any>}
     * 
     * @memberOf UserService
     */
    getFixture(id: string, numberOfFixtures?: string): Observable<any> {
        return this.http.get(`https://api.football-data.org/v1/fixtures/`
            + id + `?head2head=`
            + numberOfFixtures, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     *  Get set of fixtures by timeinterval.
     * 
     * @param {string} id
     * @param {string} [timeFrameStart] default: today
     * @param {string} [timeFrameEnd]default: +7days
     * @returns {Observable<any>}
     * 
     * @memberOf UserService
     */
    getFixturesByLeagueAndTime(id: string, timeFrameStart?: string, timeFrameEnd?: string): Observable<any> {
        return this.http.get(`https://api.football-data.org/v1/fixtures/?leagueCode=`
            + id + `/fixtures/?timeFrameStart=`
            + timeFrameStart + `&timeFrameEnd=` + timeFrameEnd,
            this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * @param {string} id
     * @param {string} season
     * @param {string} venue
     * @param {string} [timeFrameStart]
     * @param {string} [timeFrameEnd]
     * @returns {Observable<any>}
     * 
     * @memberOf UserService
     */
    getTeamFixtures(id: string, season: string, venue: string, timeFrameStart?: string, timeFrameEnd?: string): Observable<any> {
        return this.http.get(`https://api.football-data.org/v1/teams/`
            + id + `/fixtures/?season=` + season + `&timeFrameStart=`
            + timeFrameStart + `&timeFrameEnd=` + timeFrameEnd + `&venue=` + venue,
            this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * @param {string} id
     * @returns {Observable<any>}
     * 
     * @memberOf UserService
     */
    getTeam(url: string): Observable<any> {
        return this.http.get(url, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * @param {string} id
     * @returns {Observable<any>}
     * 
     * @memberOf UserService
     */
    getTeamPlayers(id: string): Observable<any> {
        return this.http.get(`https://api.football-data.org/v1/teams/` + id + '/players', this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Get fixtures by day
     * 
     * @param {string} [timeFrameStart] default today
     * @param {string} [timeFrameEnd] +7 days from today
     * @returns {Observable<any>}
     * 
     * @memberOf FootballDataService
     */
    getLeagueFixturesByDay(timeFrameStart?: string, timeFrameEnd?: string): Observable<any> {
        return this.http.get(`https://api.football-data.org/v1/fixtures/?timeFrameStart=`
            + timeFrameStart + `&timeFrameEnd=` + timeFrameEnd,
            this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
