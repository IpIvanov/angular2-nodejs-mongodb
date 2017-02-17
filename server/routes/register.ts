import { Router, Request, Response, NextFunction } from 'express';
import { randomBytes, pbkdf2 } from 'crypto';
import { sign } from 'jsonwebtoken';
import { secret, length, digest } from '../config';
import { User } from '../models/user/model';

const registerRouter: Router = Router();

registerRouter.post('/signup', function (request: Request, response: Response, next: NextFunction) {
    if (!request.body.hasOwnProperty('password')) {
        let err = new Error('No password');
        return next(err);
    }

    const salt = randomBytes(128).toString('base64');

    pbkdf2(request.body.password, salt, 10000, length, digest, (err: Error, hash: Buffer) => {
        const user = request.body;
        user.password = hash.toString('hex');
        user.salt = salt;
        user.token = sign({
            'user': user.email,
            permissions: []
        }, secret); //, { expiresIn: '7d' }
        User.create(user, function (err) {
            if (err) {
                response.json({ error: err.errmsg, message: 'Username already exists.' });
            } else {
                response.json({ 'jwt': user.token, 'username': user.email, 'avatarImg': user.avatarImg });
            }
        });
    });
});

// login method
registerRouter.post('/login', function (request: Request, response: Response, next: NextFunction) {
    let userEmail = request.body.email;
    User.find({ email: userEmail }, function (err, doc) {
        if (doc.length > 0 && (doc[0].email === userEmail)) {
            pbkdf2(request.body.password, doc[0].salt, 10000, length, digest, (err: Error, hash: Buffer) => {
                if (err) {
                    response.json({ error: err, message: 'Error.' })
                }
                if (hash.toString('hex') === doc[0].password) {
                    response.json({ 'jwt': doc[0].token, 'username': doc[0].email, 'avatarImg': doc[0].avatarImg });
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
