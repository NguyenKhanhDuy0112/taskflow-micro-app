import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './login.use-case';
import type { AuthUserRepositoryInterface } from 'src/domain/repositories/auth-user.repository.interface';
import { AuthUserEntity } from 'src/domain/entities/auth-user.entity';
import { Email } from 'src/domain/value-objects/email.vo';
import { RegisterDto } from 'src/application/dto/auth/register.dto';
import { AuthResponseDto } from 'src/application/dto/auth/auth-response.dto';

@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject('AuthUserRepositoryInterface')
        private readonly authUserRepository: AuthUserRepositoryInterface,
        private readonly jwtService: JwtService
    ) { }

    async execute(dto: RegisterDto): Promise<AuthResponseDto> {
        // Check if user already exists
        const email = Email.from(dto.email);
        const existingUser = await this.authUserRepository.findByEmail(email);

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create new user
        const user = await AuthUserEntity.create(
            dto.email,
            dto.name,
            dto.password,
            dto.role
        );

        // Save user
        const savedUser = await this.authUserRepository.save(user);

        // Generate JWT token
        const payload: JwtPayload = {
            sub: savedUser.getId(),
            email: savedUser.getEmail().getValue(),
            role: savedUser.getRole(),
        };

        const accessToken = this.jwtService.sign(payload);

        return new AuthResponseDto(accessToken, {
            id: savedUser.getId(),
            email: savedUser.getEmail().getValue(),
            name: savedUser.getName(),
            role: savedUser.getRole(),
            isActive: savedUser.isUserActive(),
            emailVerified: savedUser.isEmailVerified(),
        });
    }
}