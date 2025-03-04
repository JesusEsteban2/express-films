import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const UserCreateDTO = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    handlerName: z.string().nonempty(),
    password: z.string().nonempty().min(6),
    email: z.string().nonempty().email(),
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>;

export const UserLoginDTO = z.object({
    password: z.string().nonempty().min(6),
    email: z.string().nonempty().email(),
});

export type UserCreateDTO = z.infer<typeof UserCreateDTO>;
export type UserLoginDTO = z.infer<typeof UserLoginDTO>;
