// Opción para intranet con mas información.
// export type AppRespose<T> = {
//     data: T[];
//     error: HttpError|null;
// }

export class AppResponse<T> {
    constructor(
        public data: T[],
        public error: string,
    ) {}
}

//public data: Omit<T, 'password'>[],
