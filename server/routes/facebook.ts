import { Router, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';
import { User } from '../models/user/model';

const facebookRouter: Router = Router();

facebookRouter.get('/', passport.authenticate('facebook', { session: false, scope: ['email', 'user_birthday'] }));

facebookRouter.get('/callback',
    passport.authenticate('facebook', { session: false, successRedirect: 'http://localhost:4200/profile',
    failureRedirect: 'http://localhost:4200/dashboard' },(profile, accessToken) => {
        console.log(profile)
        let currentUser = new User({
        'facebook.id': 'profile.id',
        'facebook.gender': 'profile.gender',
        'facebook.name': 'profile.username',
        'facebook.accessToken': 'accessToken'
    });
        User.findOneAndUpdate({'facebook.id': 'profile.id'}, {$set:{'facebook.accessToken': 'accessToken'}},
        {new: true}, {upsert: true}, {setDefaultsOnInsert: true}, {fields: 'facebook.accessToken'}, (err, user) => {
            if(err){
                throw err
            } else {
                console.log(user)
            }
        })
        
    }));
export { facebookRouter };
