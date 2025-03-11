import createDebug from 'debug';
import { PrismaClient, User } from '@prisma/client';

const debug = createDebug('films:repository:films');

export class UserRepository {
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

    async getByEmail(email: string): Promise<User | null> {
        debug('Getting user by email:', email);
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }

    async login(email: string): Promise<User> {
        const row = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!row) {
            throw new Error('Usuario no encontrado');
        }
        return row;
    }
}
