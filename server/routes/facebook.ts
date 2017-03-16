import { Router, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';

const facebookRouter: Router = Router();

facebookRouter.get('/', passport.authenticate('facebook'));

facebookRouter.get('/callback',
    passport.authenticate('facebook', {
        failureRedirect: '//localhost:4200/dashboard',
    }), (req: any, res: any) => {
        res.redirect('//localhost:4200/profile/' + req.user.facebook.id)
    }
);

export { facebookRouter };
