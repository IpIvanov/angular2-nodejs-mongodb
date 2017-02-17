import { Router, Response, Request, NextFunction } from 'express';

const facebookRouter: Router = Router();

facebookRouter.get('/facebook', function(res: Response){
    console.log(res);
});

export { facebookRouter };
