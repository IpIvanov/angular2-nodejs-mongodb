import { Router, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';
import { User } from '../models/user/model';

const facebookRouter: Router = Router();

facebookRouter.get('/', passport.authenticate('facebook', { session: false, scope: ['email', 'user_birthday'] }));

facebookRouter.get('/callback',
    passport.authenticate('facebook', { session: false, successRedirect: 'http://localhost:4200/profile'
    , failureRedirect: 'http://localhost:4200/dashboard' }));
export { facebookRouter };
