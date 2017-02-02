import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    headers: Headers;
    options: RequestOptions;

    constructor(public http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        this.options = new RequestOptions({ headers: this.headers }); // Create a request option
    }

    /**
     * Add user to backend /api/user/add-user
     * @param userCredentials
     * @returns {Observable<R>}
     */
    addUser(userCredentials: Object): Observable<any> {
        return this
            .http
            .post(`/api/user/add-user`, JSON.stringify(userCredentials), this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Checks if user exists and returns auth token /api/user/get-user
     * @param userCredentials
     * @returns {Observable<R>}
     */
    getUser(userCredentials: Object): Observable<any> {
        return this
            .http
            .post(`/api/user/get-user`, JSON.stringify(userCredentials), this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message)
            ? error.message
            : error.status
                ? `${error.status} - ${error.statusText}`
                : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
