import { Router, Response, Request, NextFunction } from 'express';
import { User } from '../models/user/model';

const facebookUserRouter: Router = Router();

/** @description get facebookUser from db
 */
facebookUserRouter.get('/get-user', async (request: Request, response: Response) => {
    const user = await User.find({
        'id': request.body.id
    }, function (err, user) {
        if (user.length) {
            response
                .status(200)
                .json({ message: 'User exists!' });
        } else {
            response
                .status(200)
                .json({ message: 'Username is free.' });
        }
    });
});



export { facebookUserRouter };
