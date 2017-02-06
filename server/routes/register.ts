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
        const token = sign({
            'user': user.username,
            permissions: []
        }, secret); //, { expiresIn: '7d' }
        user.token = token;
        User.create(user, function (err) {
            if (err) {
                response.json({ error: err.errmsg, message: 'Username already exists.' })
            } else {
                response.json({ 'jwt': token, 'username': user.username });
            }
        });
    });
});

// login method
registerRouter.post('/login', function (request: Request, response: Response, next: NextFunction) {
    let fieldsToSearch = [
        { 'username': request.body.username, },
        { 'email': request.body.username }
    ];
    const doc = User.find({ '$or': fieldsToSearch }, 'username password email salt token', function (err, doc) {
        if (doc.length > 0 && ((doc[0].username === request.body.username) || (doc[0].email === request.body.username))) {
            pbkdf2(request.body.password, doc[0].salt, 10000, length, digest, (err: Error, hash: Buffer) => {
                if (err) {
                    response.json({ error: err, message: 'Error.' })
                }
                if (hash.toString('hex') === doc[0].password) {
                    response.json({ 'jwt': doc[0].token, 'username': doc[0].username });
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
