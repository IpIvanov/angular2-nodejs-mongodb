import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import * as morgan from 'morgan';

import { registerRouter } from './routes/register';
import { protectedRouter } from './routes/protected';
import { publicRouter } from './routes/public';
import { feedRouter } from './routes/feed';
import { userRouter } from './routes/user';
import { facebookRouter } from './routes/facebook';
import { DatabaseConInit } from './config/database';
import * as passport from 'passport';
import * as passportFacebook from 'passport-facebook';
import { FacebookAutOptions } from './config/facebook-auth-config';

import { User } from './models/user/model';

import * as https from 'https';

const facebookOptions = new FacebookAutOptions();
const app: express.Application = express();
const FacebookStrategy = passportFacebook.Strategy;
// init db connection
DatabaseConInit();

app.disable('x-powered-by');

app.use(json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
}

app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client')));
app.use(passport.initialize());

passport.serializeUser((user: any, callback) => {
    callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
    User.findById(id, function (err, user) {
        callback(err, user);
    });
});

passport.use(new FacebookStrategy(facebookOptions, (accessToken, refreshToken, facebookProfile, callback) => {
    process.nextTick(() => {
        User.findOne({ 'facebook.id': facebookProfile.id }, function (err, user) {
            if (err) {
                return callback(err);
            }

            // if the user is found, then log them in
            if (user) {
                return callback(null, user); // user found, return that user
            } else {
                // user is not found in db so save it
                const newUser = new User();
                newUser.facebook = {
                    id: facebookProfile.id,
                    gender: facebookProfile.gender,
                    email: facebookProfile.emails[0].value,
                    name: facebookProfile.displayName,
                    birthday: '',
                    avatarImg: facebookProfile.photos[0].value,
                    accessToken: accessToken
                }

                // save our user to the database
                newUser.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    // if successful, return the new user
                    return callback(null, user);
                });
            }

        });
    })
}));

// api routes
app.use('/api/secure', protectedRouter);
app.use('/api/register', registerRouter);
app.use('/api/public', publicRouter);
app.use('/api/feed', feedRouter);
app.use('/api/user', userRouter);
app.use('/api/auth/facebook', facebookRouter);
app.use('/api/static', express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next) {
    let err = new Error('Not Found');
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: `Message: ${err.message}`
    });
});

export { app }
