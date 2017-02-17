import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';

import { registerRouter } from './routes/register';
import { protectedRouter } from './routes/protected';
import { publicRouter } from './routes/public';
import { feedRouter } from './routes/feed';
import { userRouter } from './routes/user';
import { DatabaseConInit } from './config/database';

import * as https from 'https';


const app: express.Application = express();
// init db connection
DatabaseConInit();

app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// api routes
app.use('/api/secure', protectedRouter);
app.use('/api/register', registerRouter);
app.use('/api/public', publicRouter);
app.use('/api/feed', feedRouter);
app.use('/api/user', userRouter);
//app.use('/api/facebook', facebookRouter);
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

// const config = {
//     host: 'graph.facebook.com',
//     path: '/oauth/access_token',
//     method: 'POST',
//     token: '',
//     appId: '',
//     clientSecret: ''
// };

// GET /oauth/access_token
//     ?client_id={app-id}
//     &client_secret={app-secret}
//     &grant_type=client_credentials

// function longLiveMyToken(token, appId, clientSecret) {
//   let req = https.request({
//     host: config.host,
//     path: config.path,
//     method: config.method
//   }, function(res) {
//     res.setEncoding('utf8');
//     res.on('data', function(chunk) {
//       console.log(chunk);
//     });
//     res.on('end', function() {
//       console.log('status: ' + res.status);
//     });
//   });
//   req.end('grant_type=fb_exchange_token'
//     + '&client_id=' + encodeURIComponent(appId)
//     + '&client_secret=' + encodeURIComponent(clientSecret)
//     + '&fb_exchange_token=' + encodeURIComponent(token)
//    );
// };

// longLiveMyToken(config.token, config.appId, config.clientSecret);

// production error handler
// no stacktrace leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app }
