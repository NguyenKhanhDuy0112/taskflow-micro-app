import { IsString, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectRequest, PROJECT_CONSTANTS } from '@repo/domains';

export class CreateProjectDto implements CreateProjectRequest {
    @ApiProperty({ example: 'TaskFlow MVP' })
    @IsString()
    @MinLength(2)
    @MaxLength(PROJECT_CONSTANTS.MAX_NAME_LENGTH)
    name: string;

    @ApiProperty({ example: 'TASK' })
    @IsString()
    @MinLength(PROJECT_CONSTANTS.MIN_KEY_LENGTH)
    @MaxLength(PROJECT_CONSTANTS.MAX_KEY_LENGTH)
    @Matches(/^[A-Z][A-Z0-9]{1,9}$/, {
        message: 'Key must be 2-10 uppercase characters, starting with a letter'
    })
    key: string;

    @ApiProperty({ example: 'Project management system for agile teams', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(PROJECT_CONSTANTS.MAX_DESCRIPTION_LENGTH)
    description?: string;
}