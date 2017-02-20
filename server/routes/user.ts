import { Router, Response, Request, NextFunction } from 'express';
import { User } from '../models/user/model';

const userRouter: Router = Router();

/** @description get users from db
 */
userRouter.post('/get-user', async (request: Request, response: Response) => {
    const user = await User.find({
        'username': request.body.username
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

/** @description set user in db
*/
userRouter.post('/add-user', async (request: Request, response: Response, next) => {
    const user = await User.create(request.body, function (err) {
        if (err) {
            response.json({ error: err.errmsg, message: 'Username already exists.' });
        } else {
            response
                .status(200)
                .json({ message: 'User saved successfully.' });
        }
    });
});

export { userRouter };
