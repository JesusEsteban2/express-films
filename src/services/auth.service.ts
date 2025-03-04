import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALTS = 10;

interface Payloadv extends Payload {
    id: string;
    email: string;
}

export class AuthService {
    static async hashPassword(password: string) {
        return hash(password, SALTS);
    }

    static async comparePassword(password: string, hash: string): Promise<> {}

    static async generateToken() {}

    static async verifyToken(token: string) {
        const secret = process.env.JWT_SECRET as string;
        const result = jwt.verify(token, secret);
    }
}
