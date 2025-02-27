import { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';
import { AppRespose } from '../middleware/responseJson';

const debug = createDebug('films:errorManager');

export class HttpError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public status: string,
    ) {
        super(message);
        this.name = 'HttpError';
    }
}

export const errorManager = (
    err: HttpError | Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
) => {
    if (!('status' in err)) {
        err = {
            ...err,
            statusCode: 500,
            status: 'Internal Server Error',
        };
    }

    const publicMessage = `Error: ${err.statusCode} ${err.status}`;
    // const view = new ErrorPage();
    debug(publicMessage, err.message);

    res.status(err.statusCode);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const response: AppRespose<string> = {
        data: [],
        error: 'Error: ' + err.statusCode + ' ' + err.status,
    };
    res.json(response);
};
