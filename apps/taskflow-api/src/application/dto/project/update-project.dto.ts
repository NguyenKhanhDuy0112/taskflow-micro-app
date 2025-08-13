import { IsString, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateProjectRequest, ProjectStatus, PROJECT_CONSTANTS } from '@repo/domains';

export class UpdateProjectDto implements UpdateProjectRequest {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(PROJECT_CONSTANTS.MAX_NAME_LENGTH)
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(PROJECT_CONSTANTS.MAX_DESCRIPTION_LENGTH)
    description?: string;

    @ApiProperty({ enum: ProjectStatus, required: false })
    @IsOptional()
    @IsEnum(ProjectStatus)
    status?: ProjectStatus;
}