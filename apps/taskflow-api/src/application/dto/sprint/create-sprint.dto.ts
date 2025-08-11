import { IsString, IsOptional, MinLength, MaxLength, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSprintDto {
    @ApiProperty({ example: 'Sprint 1' })
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'Complete user authentication features', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    goal?: string;

    @ApiProperty({ example: '2024-01-15', required: false })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiProperty({ example: '2024-01-29', required: false })
    @IsOptional()
    @IsDateString()
    endDate?: string;
}