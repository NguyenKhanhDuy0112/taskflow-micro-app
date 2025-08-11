import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../domain/entities/user.entity';
import type { UserRepositoryInterface } from 'src/domain/repositories/user.repository.interface';

@Injectable()
export class GetUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) { }

    async execute(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
}
