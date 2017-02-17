import { AuthenticateOptions, IStrategyOption } from 'passport-facebook';

export class FacebookAutOptions implements IStrategyOption {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    profileFields: Array<string>;

    constructor() {
        this.clientID = '1800762523509083';
        this.clientSecret = '3a0262dd9f8a3c8d8a8be497788cdbef';
        this.callbackURL = 'http://localhost:4200/#/dashboard';
        this.profileFields = ['id', 'name', 'gender', 'displayName', 'photos', 'profileUrl', 'email'];
    }
}