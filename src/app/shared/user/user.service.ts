import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserService {

    headers: Headers;
    options: RequestOptions;
    logged = false;
    username: string;

    constructor(public http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        this.options = new RequestOptions({ headers: this.headers }); // Create a request option
    }

    /**
     * Set Username in the app
     * @param string
     */
    setUsername(username: string) {
        this.username = username;
    }

    /**
     * Get Username
     * @returns {string}
     */
    getUsername(): string {
        return this.username;
    }

    /**
     * Sign up user /api/register/signup
     * @param userCredentials
     * @returns {Observable<R>}
     */
    signUp(userCredentials: Object): Observable<any> {
        return this.http.post(`/api/register/signup`, JSON.stringify(userCredentials), this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Login user /api/register/login
     * @param userCredentials
     * @returns {Observable<R>}
     */
    login(userCredentials: Object): Observable<any> {
        return this.http.post(`/api/register/login`, JSON.stringify(userCredentials), this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
