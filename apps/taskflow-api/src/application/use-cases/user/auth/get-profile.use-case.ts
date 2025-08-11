import { Inject, Injectable } from '@nestjs/common';
import type { AuthUserRepositoryInterface } from 'src/domain/repositories/auth-user.repository.interface';

@Injectable()
export class GetProfileUseCase {
    constructor(
        @Inject('AuthUserRepositoryInterface')
        private readonly authUserRepository: AuthUserRepositoryInterface
    ) { }

    async execute(userId: string) {
        const user = await this.authUserRepository.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user.getId(),
            email: user.getEmail().getValue(),
            name: user.getName(),
            role: user.getRole(),
            isActive: user.isUserActive(),
            emailVerified: user.isEmailVerified(),
            lastLoginAt: user.getLastLoginAt(),
        };
    }
}