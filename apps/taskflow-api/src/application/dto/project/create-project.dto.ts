import { IsString, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({ example: 'TaskFlow MVP' })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'TASK' })
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    @Matches(/^[A-Z][A-Z0-9]{1,9}$/, {
        message: 'Key must be 2-10 uppercase characters, starting with a letter'
    })
    key: string;

    @ApiProperty({ example: 'Project management system for agile teams', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;
}