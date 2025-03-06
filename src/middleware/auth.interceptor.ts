import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { HttpError } from '../controllers/errors.controller.js';
import createDebug from 'debug';

const debug = createDebug('films:interceptors:auth');

export class AuthInterceptor {
    constructor() {
        debug('Instanciando');
    }

    authenticate = async (req: Request, _res: Response, next: NextFunction) => {
        debug('authenticate Token');

        //req.cookies
        const { authorization } = req.headers;

        if (!authorization || authorization.includes('Bearer') === false) {
            const newError = new HttpError(
                'Token not found',
                401,
                'Unauthorized',
            );
            next(newError);
            return;
        }

        const token = authorization.split(' ')[1];
        try {
            await AuthService.verifyToken(token);
            next();
        } catch (err) {
            const newError = new HttpError(
                (err as Error).message,
                401,
                'Unauthorized',
            );
            next(newError);
        }
    };
}
