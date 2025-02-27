import type { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { HttpError } from './errors.controller.js';

export const notFoundController = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const debug = createDebug('App:notFoundController');
    debug('Petición recibida');

    const message = `Page ${req.url} not found`;
    const error = new HttpError(message, 404, 'Not Found');
    next(error);
};

export const notMethodController = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const debug = createDebug('films:notMethodController');
    debug('Petición recibida');

    const message = `Method ${req.method}  not allowed`;
    const error = new HttpError(message, 405, 'Method Not Allowed');
    next(error);
};
