import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { HttpError } from '../controllers/errors.controller.js';
import createDebug from 'debug';
import { ReviewRepo } from '../repo/review.repository.js';

const debug = createDebug('films:interceptors:auth');

enum Role {
    USER = 'USER',
    EDITOR = 'EDITOR',
    ADMIN = 'ADMIN',
}

export class AuthInterceptor {
    constructor(public repoReviews: ReviewRepo) {
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

    hasRole = (role: Role) => {
        return (req: Request, _res: Response, next: NextFunction) => {
            debug('hasRole');

            if (
                !req.user ||
                (req.user.role !== role && req.user.role !== Role.ADMIN)
            ) {
                const newError = new HttpError(
                    'You do not have permission',
                    403,
                    'Forbidden',
                );
                next(newError);
                return;
            }

            next();
        };
    };

    isOwnerReview = async (
        req: Request,
        _res: Response,
        next: NextFunction,
    ) => {
        debug('isOwner');

        if (!req.user) {
            const newError = new HttpError(
                'You do not have permission',
                403,
                'Forbidden',
            );
            next(newError);
            return;
        }

        // Item -> req.params.id
        const { id: reviewId } = req.params;
        // User -> req.user.id
        const { id: userId } = req.user;
        try {
            const review = await this.repoReviews.readById(reviewId);

            if (review.userId === userId || req.user.role === Role.ADMIN) {
                next();
            } else {
                next(
                    new HttpError(
                        'You do not have permission',
                        403,
                        'Forbidden',
                    ),
                );
            }
        } catch (error) {
            next(error);
        }
    };
}
