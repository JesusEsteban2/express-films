import { HttpError } from '../controllers/errors.controller.js';

// Opción para intranet con mas información.
// export type AppRespose<T> = {
//     data: T[];
//     error: HttpError|null;
// }

export class AppResponse<T> {
    constructor(data: T[], error: string) {}
}
