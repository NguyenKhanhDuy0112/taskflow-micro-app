import { BaseEntity } from './base/entity.base';
import { Id } from '../value-objects/id.vo';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';
import { UserRole } from '../../infrastructure/database/entities/user.entity';

export class AuthUserEntity extends BaseEntity {
    private constructor(
        id: string,
        private email: Email,
        private name: string,
        private password: Password,
        private role: UserRole,
        private isActive: boolean = true,
        private emailVerified: boolean = false,
        private lastLoginAt?: Date,
        private readonly createdAt: Date = new Date(),
        private updatedAt: Date = new Date()
    ) {
        super(id);
    }

    public static async create(
        email: string,
        name: string,
        plainPassword: string,
        role: UserRole = UserRole.MEMBER
    ): Promise<AuthUserEntity> {
        const password = await Password.create(plainPassword);

        return new AuthUserEntity(
            Id.generate().getValue(),
            Email.from(email),
            name.trim(),
            password,
            role
        );
    }

    public static reconstruct(
        id: string,
        email: string,
        name: string,
        hashedPassword: string,
        role: UserRole,
        isActive: boolean = true,
        emailVerified: boolean = false,
        lastLoginAt?: Date,
        createdAt?: Date,
        updatedAt?: Date
    ): AuthUserEntity {
        return new AuthUserEntity(
            id,
            Email.from(email),
            name,
            Password.fromHash(hashedPassword),
            role,
            isActive,
            emailVerified,
            lastLoginAt,
            createdAt,
            updatedAt
        );
    }

    // Getters
    public getEmail(): Email {
        return this.email;
    }

    public getName(): string {
        return this.name;
    }

    public getRole(): UserRole {
        return this.role;
    }

    public getPasswordHash(): string {
        return this.password.getHash();
    }

    public isUserActive(): boolean {
        return this.isActive;
    }

    public isEmailVerified(): boolean {
        return this.emailVerified;
    }

    public getLastLoginAt(): Date | undefined {
        return this.lastLoginAt;
    }

    // Business methods
    public async validatePassword(plainPassword: string): Promise<boolean> {
        if (!this.isActive) {
            throw new Error('User account is deactivated');
        }
        return this.password.compare(plainPassword);
    }

    public async changePassword(newPlainPassword: string): Promise<void> {
        this.password = await Password.create(newPlainPassword);
        this.updatedAt = new Date();
    }

    public recordLogin(): void {
        this.lastLoginAt = new Date();
        this.updatedAt = new Date();
    }

    public deactivate(): void {
        this.isActive = false;
        this.updatedAt = new Date();
    }

    public activate(): void {
        this.isActive = true;
        this.updatedAt = new Date();
    }

    public verifyEmail(): void {
        this.emailVerified = true;
        this.updatedAt = new Date();
    }

    public toJSON() {
        return {
            id: this._id,
            email: this.email.getValue(),
            name: this.name,
            role: this.role,
            isActive: this.isActive,
            emailVerified: this.emailVerified,
            lastLoginAt: this.lastLoginAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
