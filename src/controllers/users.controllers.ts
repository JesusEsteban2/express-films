import { NextFunction, Request, Response } from 'express';
import { Film, User } from '@prisma/client';
import { Repository, UserRepo } from '../repo/repositorytype.js';
import { AppResponse } from '../middleware/responseJson.js';
import debug from 'debug';

export class UsersController {
    constructor(private repoUser: UserRepo<User>) {}

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req.body;
            const films = await this.repoFilms.create(body);
            const data: AppResponse<Film> = {
                data: [films],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req.body;
            const films = await this.repoFilms.create(body);
            const data: AppResponse<Film> = {
                data: [films],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}
