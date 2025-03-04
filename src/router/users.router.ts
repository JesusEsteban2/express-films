import { Router } from 'express';
import { User } from '@prisma/client';
import { UserRepository } from '../repo/users.repo.js';
import { UsersController } from '../controllers/users.controllers.js';
import { UserRepo } from '../repo/repositorytype.js';

export const userRouter = Router();

const userRepo: UserRepo<User> = new UserRepository();
const userController = new UsersController(userRepo);

userRouter.post('/', userController.register.bind(userController));
userRouter.post('/login', userController.login.bind(userController));
