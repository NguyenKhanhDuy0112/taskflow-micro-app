import { BaseEntity } from './base/entity.base';
import { Id } from '../value-objects/id.vo';
import { Email } from '../value-objects/email.vo';

export enum UserRole {
    ADMIN = 'admin',
    MEMBER = 'member',
    VIEWER = 'viewer'
}

export class UserEntity extends BaseEntity {
    private constructor(
        id: string,
        private email: Email,
        private name: string,
        private role: UserRole,
        private avatar?: string,
        private readonly createdAt: Date = new Date(),
        private updatedAt: Date = new Date()
    ) {
        super(id);
    }

    public static create(
        email: string,
        name: string,
        role: UserRole = UserRole.MEMBER
    ): UserEntity {
        return new UserEntity(
            Id.generate().getValue(),
            Email.from(email),
            name.trim(),
            role
        );
    }

    public static reconstruct(
        id: string,
        email: string,
        name: string,
        role: UserRole,
        avatar?: string,
        createdAt?: Date,
        updatedAt?: Date
    ): UserEntity {
        return new UserEntity(
            id,
            Email.from(email),
            name,
            role,
            avatar,
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

    public getAvatar(): string | undefined {
        return this.avatar;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    // Business methods
    public changeName(newName: string): void {
        if (!newName || newName.trim().length === 0) {
            throw new Error('Name cannot be empty');
        }
        this.name = newName.trim();
        this.updatedAt = new Date();
    }

    public changeRole(newRole: UserRole): void {
        this.role = newRole;
        this.updatedAt = new Date();
    }

    public updateAvatar(avatarUrl: string): void {
        this.avatar = avatarUrl;
        this.updatedAt = new Date();
    }

    public isAdmin(): boolean {
        return this.role === UserRole.ADMIN;
    }

    public canManageProject(): boolean {
        return this.role === UserRole.ADMIN || this.role === UserRole.MEMBER;
    }

    public toJSON() {
        return {
            id: this._id,
            email: this.email.getValue(),
            name: this.name,
            role: this.role,
            avatar: this.avatar,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}