import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../infrastructure/database/entities/user.entity';
import { AuthController } from '../presentation/controllers/auth.controller';
import { AuthUserRepository } from '../infrastructure/repositories/auth-user.repository';
import { LoginUseCase } from 'src/application/use-cases/user/auth/login.use-case';
import { RegisterUseCase } from 'src/application/use-cases/user/auth/register.use-case';
import { GetProfileUseCase } from 'src/application/use-cases/user/auth/get-profile.use-case';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserOrmEntity]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN', '7d'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [
        LoginUseCase,
        RegisterUseCase,
        GetProfileUseCase,

        // ✅ Add concrete class first
        AuthUserRepository,

        // ✅ Then provide interface
        {
            provide: 'AuthUserRepositoryInterface',
            useExisting: AuthUserRepository,
        },
    ],
    exports: [
        JwtModule,
        'AuthUserRepositoryInterface',
    ],
})
export class AuthModule { }