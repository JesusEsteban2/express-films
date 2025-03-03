import createDebug from 'debug';
import type { Repository } from './repositorytype';
import { PrismaClient, User } from '@prisma/client';

const debug = createDebug('films:repository:films');

export class UserRepository implements UserRepo<User> {
    prisma: PrismaClient;
    constructor() {
        debug('Instancite repo for films');
        this.prisma = new PrismaClient();
    }

    async create(data: Omit<Film, 'id'>): Promise<Film> {
        const row = await this.prisma.film.create({
            data,
        });
        return row;
    }
}
