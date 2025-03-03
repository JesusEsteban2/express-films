import type { ServerResponse } from 'node:http';
import { HttpError } from '../controllers/errors.controller.js';
import createDebug from 'debug';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';
const debug = createDebug('films:server:errors');

export const errorManager = (
    error: Error | HttpError,
    response: ServerResponse,
) => {
    if (error instanceof PrismaClientKnownRequestError) {
        const err = new HttpError(error.message, 400, 'Bad request error.');
        error = err;
    }

    if (!('status' in error)) {
        error = {
            ...error,
            statusCode: 500,
            status: 'Internal Server Error',
        };
    }

    const publicMessage = `Error: ${error.statusCode} ${error.status}`;
    debug(publicMessage, error.message);

    const html = `<p>${publicMessage}</p>`;
    response.statusCode = error.statusCode;
    response.statusMessage = error.status;
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(html);
};
