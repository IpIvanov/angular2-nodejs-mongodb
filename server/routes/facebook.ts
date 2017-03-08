import { Router, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';

const facebookRouter: Router = Router();

facebookRouter.get('/', passport.authenticate('facebook'));

facebookRouter.get('/callback',
    passport.authenticate('facebook', {
        failureRedirect: '//localhost:4200/dashboard',
        successRedirect: '//localhost:4200/profile'
    })
);

export { facebookRouter };
