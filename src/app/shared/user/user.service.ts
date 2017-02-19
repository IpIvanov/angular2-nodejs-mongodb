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
     * Sign up user /api/register/signup
     * @param user
     * @returns {Observable<R>}
     */
    signUp(user: Object): Observable<any> {
        return this.http.post(`/api/register/signup`, JSON.stringify(user), this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Login user /api/register/login
     * @param user
     * @returns {Observable<R>}
     */
    login(user: Object): Observable<any> {
        return this.http.post(`/api/register/login`, JSON.stringify(user), this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
