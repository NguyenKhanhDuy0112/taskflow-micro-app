import { ValueObject } from './base/value-object.base';
import * as bcrypt from 'bcryptjs';

export class Password extends ValueObject<string> {
    private constructor(value: string, private readonly isHashed: boolean = false) {
        super(value);
    }

    public static async create(plainPassword: string): Promise<Password> {
        if (!plainPassword || plainPassword.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return new Password(hashedPassword, true);
    }

    public static fromHash(hashedPassword: string): Password {
        return new Password(hashedPassword, true);
    }

    public async compare(plainPassword: string): Promise<boolean> {
        if (!this.isHashed) {
            throw new Error('Cannot compare with non-hashed password');
        }
        return bcrypt.compare(plainPassword, this.value);
    }

    public getHash(): string {
        if (!this.isHashed) {
            throw new Error('Password is not hashed');
        }
        return this.value;
    }
}