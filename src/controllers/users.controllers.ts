import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';
import { AppResponse } from '../middleware/responseJson.js';
import { UserCreateDTO, UserLoginDTO } from '../DTO/users.dto.js';
import { AuthService } from '../services/auth.service.js';
import { HttpError } from './errors.controller.js';
import { ZodError } from 'zod';
import { UserRepository } from '../repo/users.repo.js';

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
    constructor(private repoUser = new UserRepository()) {}

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
        const error = new HttpError(
            'User or password not valid',
            401,
            'Unauthorized',
        );

        try {
            const { email, password: clientPassword } = req.body;

            // if (!email || !clientPassword) {
            //     throw error;
            // }

            try {
                UserLoginDTO.parse({ email, password: clientPassword });
            } catch (err) {
                error.message = (err as ZodError).message; //.errors[0].message;
                throw error;
            }

            const user = await this.repoUser.getByEmail(email);
            if (user === null) {
                throw error;
            }
            // password; // cliente -> sin encriptar
            // user.password; // base de datos -> encriptado

            const { password: hashedPassword, ...userWithoutPasswd } = user;

            const isValid = await AuthService.comparePassword(
                clientPassword,
                hashedPassword,
            );
            if (!isValid) {
                throw error;
            }

            const token = await AuthService.generateToken({
                id: userWithoutPasswd.id,
                email: userWithoutPasswd.email,
                role: userWithoutPasswd.role,
            });

            const results = {
                token,
            };

            res.cookie('token', token);
            res.json([
                {
                    results,
                    error: '',
                },
            ]);
        } catch (error) {
            next(error);
        }
    }
}
