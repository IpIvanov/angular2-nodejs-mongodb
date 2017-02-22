import { Router, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';

const facebookRouter: Router = Router();

facebookRouter.get('/', passport.authenticate('facebook', { session: false, scope: ['email'] }));

facebookRouter.get('/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
    // on succes
    (req, res) => {
        res.json({
            user_token: req.user
        });
    },
    // on error
    (err, req, res, next) => {
        if (err) {
            res.status(400);
        }
    });


export { facebookRouter };
