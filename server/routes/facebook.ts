import { Router, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';
import { User } from '../models/user/model';

const facebookRouter: Router = Router();

facebookRouter.get('/', passport.authenticate('facebook', { session: false, scope: ['email'] }));

facebookRouter.get('/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
    // on succes
    (req, res) => {
            const user =  User.create(req.body, function (err) {
        if (err) {
            res.json({ error: err.errmsg, message: 'Username already exists.' });
        } else {
            res
                .status(200)
                .json({ message: 'User saved successfully.' });
        }
    });
        res.json({
            user_token: req.user,
        });
    },
    // on error
    (err, req, res, next) => {
        if (err) {
            res.status(400);
        }
    });

export { facebookRouter };
