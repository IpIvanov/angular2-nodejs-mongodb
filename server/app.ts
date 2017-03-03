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

app.use(passport.initialize());
passport.use(new FacebookStrategy(facebookOptions, (accessToken, refreshToken, profile, callback) => {
    let currentUser = new User({
        "facebook.id": profile.id,
        "facebook.gender": profile.gender,
        "facebook.name": profile.name,
        "facebook.accessToken": accessToken
    });


    User.find({"facebook.id":profile.id}, function(err, user){
        if(err) {
            ({ error: err.errmsg, message: 'Error with the connection to mongoDB' })
        } else {
            console.log(`This is the current user ${currentUser}`);
            console.log(`This is the user returened from the database ${user}`)
        // User.update(currentUser, function(err){
        //     if(err){
        //         throw err;
        //     }
        // });
        }
    })

    return callback(null, profile);
}));

// api routes
app.use('/api/secure', protectedRouter);
app.use('/api/register', registerRouter);
app.use('/api/public', publicRouter);
app.use('/api/feed', feedRouter);
app.use('/api/user', userRouter);
app.use('/api/auth/facebook', facebookRouter);
app.use('/api/static', express.static(path.join(__dirname, 'public')));


if (app.get('env') === 'production') {

    // in production mode run application from dist folder
    app.use(express.static(path.join(__dirname, '/../client')));
}



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
