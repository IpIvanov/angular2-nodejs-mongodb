import { Router, Request, Response, NextFunction } from 'express';
import { randomBytes, pbkdf2 } from 'crypto';
import { sign } from 'jsonwebtoken';
import { secret, length, digest } from '../config';
import { User } from '../models/user/model';

const loginRouter: Router = Router();

loginRouter.post('/signup', function (request: Request, response: Response, next: NextFunction) {
    if (!request.body.hasOwnProperty('password')) {
        let err = new Error('No password');
        return next(err);
    }

    const salt = randomBytes(128).toString('base64');

    pbkdf2(request.body.password, salt, 10000, length, digest, (err: Error, hash: Buffer) => {
        const user = request.body;
        user.password = hash.toString('hex');
        user.salt = salt;
        User.create(user, function (err) {
            if (err) {
                response.json({ error: err.errmsg, message: 'Username already exists.' })
            } else {
                const token = sign({
                    'user': user.username,
                    permissions: []
                }, secret); //, { expiresIn: '7d' }
                response.json({ 'jwt': token });
            }
        });
    });
});

// login method
loginRouter.post('/login', function (request: Request, response: Response, next: NextFunction) {

    const doc = User.find({
        'username': request.body.username
    }, 'username password salt', function (err, doc) {
        if (doc.length > 0 && doc[0].username === request.body.username) {
            pbkdf2(request.body.password, doc[0].salt, 10000, length, digest, (err: Error, hash: Buffer) => {
                if (err) {
                    response.json({ error: err, message: 'Error.' })
                }
                if (hash.toString('hex') === doc[0].password) {
                    const token = sign({
                        'user': doc[0].username,
                        permissions: []
                    }, secret); //, { expiresIn: '7d' }
                    response.json({ 'jwt': token });
                } else {
                    response.json({ message: 'Wrong password' });
                }
            });
        } else {
            response.json({ message: 'User does not exists.' });
        }

    });
});

export { loginRouter }
