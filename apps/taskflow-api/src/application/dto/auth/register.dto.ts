import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterRequest, UserRole } from '@repo/domains';

export class RegisterDto implements RegisterRequest {
    @ApiProperty({ example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: UserRole, required: false, default: UserRole.MEMBER })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole = UserRole.MEMBER;
}