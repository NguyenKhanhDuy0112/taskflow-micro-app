import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { AuthUserRepositoryInterface } from 'src/domain/repositories/auth-user.repository.interface';
import { AuthResponseDto } from 'src/application/dto/auth/auth-response.dto';
import { Email } from 'src/domain/value-objects/email.vo';
import { LoginDto } from 'src/application/dto/auth/login.dto';

export interface JwtPayload {
    sub: string; // user id
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('AuthUserRepositoryInterface')
        private readonly authUserRepository: AuthUserRepositoryInterface,
        private readonly jwtService: JwtService
    ) { }

    async execute(dto: LoginDto): Promise<AuthResponseDto> {
        // Find user by email
        const email = Email.from(dto.email);
        const user = await this.authUserRepository.findByEmail(email);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Validate password
        const isPasswordValid = await user.validatePassword(dto.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Record login
        user.recordLogin();
        await this.authUserRepository.save(user);

        // Generate JWT token
        const payload: JwtPayload = {
            sub: user.getId(),
            email: user.getEmail().getValue(),
            role: user.getRole(),
        };

        const accessToken = this.jwtService.sign(payload);

        return new AuthResponseDto(accessToken, {
            id: user.getId(),
            email: user.getEmail().getValue(),
            name: user.getName(),
            role: user.getRole(),
            isActive: user.isUserActive(),
            emailVerified: user.isEmailVerified(),
        });
    }
}
