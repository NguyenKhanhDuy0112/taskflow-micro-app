import { IsEmail, IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../domain/entities/user.entity';

export class CreateUserDto {
    @ApiProperty({ example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty({ enum: UserRole, default: UserRole.MEMBER })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole = UserRole.MEMBER;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    avatar?: string;
}