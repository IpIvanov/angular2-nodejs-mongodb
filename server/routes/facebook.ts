import { Router, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';

const facebookRouter: Router = Router();

facebookRouter.get('/', (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('facebook')(request, response, next);
});

export { facebookRouter };
