import createDebug from 'debug';
import type { Repository } from './repositorytype';
import { PrismaClient } from '@prisma/client';
import { Category } from '@prisma/client';

const debug = createDebug('category:repository:categories');

export class CategoryPrismaRepo implements Repository<Category> {
    prisma: PrismaClient;
    constructor() {
        debug('Instance repo for category');
        this.prisma = new PrismaClient();
    }

    async read(): Promise<Category[]> {
        const rows = await this.prisma.category.findMany();
        return rows;
    }

    async readById(id: string): Promise<Category> {
        const row = await this.prisma.category.findUniqueOrThrow({
            where: { id },
        });

        return row;
    }

    async create(data: Omit<Category, 'id'>): Promise<Category> {
        const row = await this.prisma.category.create({
            data,
        });
        return row;
    }

    async update(
        id: string,
        data: Partial<Omit<Category, 'id'>>,
    ): Promise<Category> {
        const row = await this.prisma.category.update({
            where: { id },
            data,
        });

        return row;
    }

    async delete(id: string): Promise<Category> {
        const row = await this.prisma.category.delete({
            where: { id },
        });
        return row;
    }
}
