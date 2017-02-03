import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

    headers: Headers;
    options: RequestOptions;

    constructor(public http: Http) {
    }

    /**
     * Check user token
     * @param token
     * @returns {Observable<R>}
     */
    authenticate(token): Observable<any> {
        this.headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        this.headers.append('Authorization', token);
        this.options = new RequestOptions({ headers: this.headers }); // Create a request option

        return this.http.get(`/api/secure/checktoken`, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
