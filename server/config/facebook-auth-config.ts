import { AuthenticateOptions, IStrategyOption } from 'passport-facebook';

export class FacebookAutOptions implements IStrategyOption {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    profileFields: Array<string>;

    constructor() {
        this.clientID = '1800762523509083';
        this.clientSecret = 'bbf9bbaa63940020d992d85071d4faf3';
        this.callbackURL = 'http://localhost:4300/api/auth/facebook/callback';
        this.profileFields = ['id', 'name', 'gender', 'displayName', 'photos', 'profileUrl', 'email'];
    }
}
