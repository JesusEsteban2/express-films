import { NextFunction, Request, Response } from 'express';
import { Role, User } from '@prisma/client';
import { UserRepo } from '../repo/repositorytype.js';
import { AppResponse } from '../middleware/responseJson.js';
import { UserCreateDTO, UserLoginDTO } from '../DTO/users.dto.js';
import { AuthService } from '../services/auth.service.js';

type PartialUser = {
    id?: string;
    email: string;
    password?: string;
    handlerName: string;
    firstName: string;
    lastName: string;
    role: Role;
};

export class UsersController {
    constructor(private repoUser: UserRepo<User>) {}

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            console.log(body);
            UserCreateDTO.parse(body);
            body.password = await AuthService.hashPassword(body.password);
            const user: PartialUser = await this.repoUser.register(body);
            delete user.id;
            delete user.password;
            const data: AppResponse<PartialUser> = {
                data: [user],
                error: '',
            };

            console.log(data.data);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            console.log(body);
            UserLoginDTO.parse(body);
            const user: PartialUser = await this.repoUser.login(
                body.email,
                body.password,
            );
            delete user.id;
            delete user.password;
            const data: AppResponse<PartialUser> = {
                data: [user],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}
