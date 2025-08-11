import { IsString, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '../../../infrastructure/database/entities/project.entity';

export class UpdateProjectDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @ApiProperty({ enum: ProjectStatus, required: false })
    @IsOptional()
    @IsEnum(ProjectStatus)
    status?: ProjectStatus;
}
