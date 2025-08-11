import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../domain/entities/user.entity';
import type { UserRepositoryInterface } from '../../../domain/repositories/user.repository.interface';
import { Email } from '../../../domain/value-objects/email.vo';
import { CreateUserDto } from '../../dto/user/create-user.dto';

@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) { }

    async execute(dto: CreateUserDto): Promise<UserEntity> {
        // Check if user already exists
        const email = Email.from(dto.email);
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create new user
        const user = UserEntity.create(
            dto.email,
            dto.name,
            dto.role
        );

        if (dto.avatar) {
            user.updateAvatar(dto.avatar);
        }

        // Save and return
        return await this.userRepository.save(user);
    }
}