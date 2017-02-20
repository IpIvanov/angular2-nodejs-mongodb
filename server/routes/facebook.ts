import { Router, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';

const facebookRouter: Router = Router();

facebookRouter.get('/', () => {
    passport.authenticate('facebook');
});

facebookRouter.get('/callback', () => {
    passport.authenticate('facebook'), (request: Request, response: Response) => {
        response.redirect('/');
    });
});


export { facebookRouter };
