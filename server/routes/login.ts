import {Router, Request, Response, NextFunction} from 'express';
import {randomBytes, pbkdf2} from 'crypto';
import {sign} from 'jsonwebtoken';
import {secret, length, digest} from '../config';
import {User} from '../models/user/model';

const loginRouter : Router = Router();

const user = {
    hashedPassword: '6fb3a68cb5fe34d0c2c9fc3807c8fa9bc0e7dd10023065ea4233d40a2d6bb4a7e336a82f48bcb5a7' +
            'cc95b8a590cf03a4a07615a226d09a89420a342584aa28748336aa0feb7ac3a12200d13641c8f8e2' +
            '6398cfdaf268dd68746982bcf59415670655edf4e9ac30f6310bd2248cb9bc185db8059fe979294d' +
            'd3611fdf28c2b731',
    salt: 'OxDZYpi9BBJUZTTaC/yuuF3Y634YZ90KjpNa+Km4qGgZXGI6vhSWW0T91rharcQWIjG2uPZEPXiKGnSA' +
            'Q73s352aom56AIYpYCfk7uNsd+7AzaQ6dxTnd9AzCCdIc/J62JohpHPJ5eGHUJJy3PAgHYcfVzvBHnIQ' +
            'lTJCQdQAonQ=',
    username: 'john'
};

loginRouter.post('/signup', function (request : Request, response : Response, next : NextFunction) {
    if (!request.body.hasOwnProperty('password')) {
        let err = new Error('No password');
        return next(err);
    }

    const salt = randomBytes(128).toString('base64');

    pbkdf2(request.body.password, salt, 10000, length, digest, (err : Error, hash : Buffer) => {
        const user = request.body;
        user.password = hash.toString('hex');
        user.salt = salt;
        User.create(user, function (err) {
            if (err) {
                response.json({error: err.errmsg, message: 'Username already exists.'})
            } else {
                const token = sign({
                    'user': user.username,
                    permissions: []
                }, secret, {expiresIn: '7d'});
                response.json({'jwt': token});
            }
        });
    });
});

// login method
loginRouter.post('/login', function (request : Request, response : Response, next : NextFunction) {

    const doc = User.find({
        'username': request.body.username
    }, 'username password salt', function (err, doc) {
        if (doc.length > 0 && doc[0].username === request.body.username) {
            pbkdf2(request.body.password, doc[0].salt, 10000, length, digest, (err : Error, hash : Buffer) => {
                if (err) {
                    response.json({error: err, message: 'Error.'})
                }
                if (hash.toString('hex') === doc[0].password) {
                    const token = sign({
                        'user': doc[0].username,
                        permissions: []
                    }, secret, {expiresIn: '7d'});
                    response.json({'jwt': token});
                } else {
                    response.json({message: 'Wrong password'});
                }
            });
        } else {
            response.json({message: 'User does not exists.'});
        }

    });
});

export {loginRouter}
