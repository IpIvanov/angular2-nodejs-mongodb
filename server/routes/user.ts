import { Router, Response, Request } from 'express';
import { User } from '../models/user/model';

const userRouter: Router = Router();

/** @description get users from db
 */
userRouter.get('/users', async (request: Request, response: Response) => {
    const users = await User.find({}).lean().exec();
    response.json(users);
});


/** @description set user in db 
*/
userRouter.post('/user', async (request: Request, response: Response) => {
    console.log(request.body);
    const user = await User.create(request.body);
    response.status(200).json(user);
});

export { userRouter };
