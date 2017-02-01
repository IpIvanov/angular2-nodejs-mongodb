import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class CountryService {

    URI = 'https://ipinfo.io';

    constructor(public http: Http) { }

    /**
     * Get user country
     * @returns {Observable<Response>}
     */
    getUserLocation(): Observable<{}> {
        return this.http.get(this.URI)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
