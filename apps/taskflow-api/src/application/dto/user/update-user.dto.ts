import { IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../domain/entities/user.entity';

export class UpdateUserDto {
    @ApiProperty({ required: false })
    @IsString()
    @MinLength(2)
    @IsOptional()
    name?: string;

    @ApiProperty({ enum: UserRole, required: false })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    avatar?: string;
}