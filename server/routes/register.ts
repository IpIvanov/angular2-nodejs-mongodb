import { Router, Request, Response, NextFunction } from 'express';
import { randomBytes, pbkdf2 } from 'crypto';
import { sign } from 'jsonwebtoken';
import { secret, length, digest } from '../config';
import { User } from '../models/user/model';

const registerRouter: Router = Router();

registerRouter.post('/signup', function (request: Request, response: Response, next: NextFunction) {
    if (!request.body.local.hasOwnProperty('password')) {
        let err = new Error('No password');
        return next(err);
    }

    const salt = randomBytes(128).toString('base64');

    pbkdf2(request.body.local.password, salt, 10000, length, digest, (err: Error, hash: Buffer) => {
        const user = new User(request.body);
        user.local.password = hash.toString('hex');
        user.local.salt = salt;
        user.local.token = sign({
            'user': user.local.email,
            permissions: []
        }, secret); //, { expiresIn: '7d' }
        User.create(user, function (err) {
            if (err) {
                response.json({ error: err.errmsg, message: 'Username already exists.' });
            } else {
                response.json({ 'jwt': user.local.token, 'email': user.local.email, 'avatarImg': user.local.avatarImg });
            }
        });
    });
});

// login method
registerRouter.post('/login', function (request: Request, response: Response, next: NextFunction) {
    let userEmail = request.body.local.email;
    User.find({ 'local.email': userEmail }, function (err, doc) {
        if (doc.length > 0 && (doc[0].local.email === userEmail)) {
            pbkdf2(request.body.local.password, doc[0].local.salt, 10000, length, digest, (err: Error, hash: Buffer) => {
                if (err) {
                    response.json({ error: err, message: 'Error.' })
                }
                if (hash.toString('hex') === doc[0].local.password) {
                    response.json({ 'jwt': doc[0].local.token, 'email': doc[0].local.email, 'avatarImg': doc[0].local.avatarImg });
                } else {
                    response.json({ message: 'Wrong password' });
                }
            });
        } else {
            response.json({ message: 'User does not exists.' });
        }

    });
});

export { registerRouter }
