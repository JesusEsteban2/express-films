import createDebug from 'debug';
import type { UserRepo } from './repositorytype';
import { PrismaClient, User } from '@prisma/client';

const debug = createDebug('films:repository:films');

export class UserRepository implements UserRepo<User> {
    prisma: PrismaClient;
    constructor() {
        debug('Instance repo for User');
        this.prisma = new PrismaClient();
    }

    async register(data: User): Promise<User> {
        const row = await this.prisma.user.create({
            data,
        });
        return row;
    }

    async login(email: string, password: string): Promise<User> {
        const row = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!row) {
            throw new Error('Usuario no encontrado');
        }
        return row;
    }
}
