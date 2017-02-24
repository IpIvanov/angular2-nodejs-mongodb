import { Router, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';
import { User } from '../models/user/model';

const facebookRouter: Router = Router();

facebookRouter.get('/', passport.authenticate('facebook', { session: false, scope: ['email'] }));

facebookRouter.get('/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
    // on succes
    (req, res) => {
        const user = new User();
        user.facebook.id = req.user.id;
        user.facebook.name = req.user.displayName;
        user.facebook.gender = req.user.gender;
        user.facebook.email = req.user.emails[0].value;
        User.create(user, function (err){
            if (err) {
                res.json({ error: err.errmsg, message: 'Username already exists.' });
            } else {
                res.json( { 'message' : 'User saved!' } );
            }
        });
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
