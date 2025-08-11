import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserRepositoryInterface } from '../../domain/repositories/auth-user.repository.interface';
import { AuthUserEntity } from '../../domain/entities/auth-user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { UserOrmEntity } from '../database/entities/user.entity';

@Injectable()
export class AuthUserRepository implements AuthUserRepositoryInterface {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly userRepository: Repository<UserOrmEntity>
    ) { }

    async save(user: AuthUserEntity): Promise<AuthUserEntity> {
        const ormEntity = new UserOrmEntity();
        ormEntity.id = user.getId();
        ormEntity.email = user.getEmail().getValue();
        ormEntity.name = user.getName();
        ormEntity.role = user.getRole();

        // Store password hash (add password field to UserOrmEntity)
        (ormEntity as any).passwordHash = user.getPasswordHash();
        (ormEntity as any).isActive = user.isUserActive();
        (ormEntity as any).emailVerified = user.isEmailVerified();
        (ormEntity as any).lastLoginAt = user.getLastLoginAt();

        const saved = await this.userRepository.save(ormEntity);

        return AuthUserEntity.reconstruct(
            saved.id,
            saved.email,
            saved.name,
            (saved as any).passwordHash,
            saved.role,
            (saved as any).isActive,
            (saved as any).emailVerified,
            (saved as any).lastLoginAt,
            saved.createdAt,
            saved.updatedAt
        );
    }

    async findById(id: string): Promise<AuthUserEntity | null> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) return null;

        return AuthUserEntity.reconstruct(
            user.id,
            user.email,
            user.name,
            (user as any).passwordHash || '',
            user.role,
            (user as any).isActive ?? true,
            (user as any).emailVerified ?? false,
            (user as any).lastLoginAt,
            user.createdAt,
            user.updatedAt
        );
    }

    async findByEmail(email: Email): Promise<AuthUserEntity | null> {
        const user = await this.userRepository.findOne({
            where: { email: email.getValue() }
        });

        if (!user) return null;

        return AuthUserEntity.reconstruct(
            user.id,
            user.email,
            user.name,
            (user as any).passwordHash || '',
            user.role,
            (user as any).isActive ?? true,
            (user as any).emailVerified ?? false,
            (user as any).lastLoginAt,
            user.createdAt,
            user.updatedAt
        );
    }

    async exists(id: string): Promise<boolean> {
        const count = await this.userRepository.count({ where: { id } });
        return count > 0;
    }

    async existsByEmail(email: Email): Promise<boolean> {
        const count = await this.userRepository.count({
            where: { email: email.getValue() }
        });
        return count > 0;
    }
}