import { Router, Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { secret } from '../config';

const protectedRouter: Router = Router();

protectedRouter.use((request: Request & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;
    verify(token, secret, function (tokenError) {
        if (tokenError) {
            return response.json({
                message: 'Invalid token.'
            });
        }

        next();
    });
});

protectedRouter.get('/checktoken', (request: Request, response: Response) => {
    response.json({
        message: 'Valid token.',
        title: 'Protected call'
    });
});

export { protectedRouter }





