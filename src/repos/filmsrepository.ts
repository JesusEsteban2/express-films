import createDebug from 'debug';
import type { Repository } from './repositorytype';
import { PrismaClient } from '@prisma/client';
import { Film } from '@prisma/client';

const debug = createDebug('films:repository:films');

export class FilmPrismaRepo implements Repository<Film> {
    prisma: PrismaClient;
    constructor() {
        debug('Instancite repo for films');
        this.prisma = new PrismaClient();
    }

    async read(): Promise<Film[]> {
        const rows = await this.prisma.film.findMany();
        return rows;
    }

    async readById(id: string): Promise<Film> {
        const row = await this.prisma.film.findUniqueOrThrow({
            where: { id },
        });

        return row;
    }

    async create(data: Omit<Film, 'id'>): Promise<Film> {
        const row = await this.prisma.film.create({
            data,
        });
        return row;
    }

    async update(id: string, data: Partial<Omit<Film, 'id'>>): Promise<Film> {
        const row = await this.prisma.film.update({
            where: { id },
            data,
        });

        return row;
    }

    async delete(id: string): Promise<Film> {
        const row = await this.prisma.film.delete({
            where: { id },
        });
        return row;
    }
}
