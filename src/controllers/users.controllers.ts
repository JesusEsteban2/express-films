import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { UserRepo } from '../repo/repositorytype.js';
import { AppResponse } from '../middleware/responseJson.js';
import { UserCreateDTO, UserLoginDTO } from '../DTO/users.dto.js';

export class UsersController {
    constructor(private repoUser: UserRepo<User>) {}

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req.body;
            UserCreateDTO.parse(body);
            const user = await this.repoUser.register(body);
            const data: AppResponse<User> = {
                data: [user],
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
            UserLoginDTO.parse(body);
            const user = await this.repoUser.login(body.email, body.password);
            const data: AppResponse<User> = {
                data: [user],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}
