import { IsString, IsEnum, IsOptional, MinLength, MaxLength, IsInt, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IssueStatus, IssuePriority } from '../../../infrastructure/database/entities/issue.entity';

export class UpdateIssueDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    title?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(2000)
    description?: string;

    @ApiProperty({ enum: IssueStatus, required: false })
    @IsOptional()
    @IsEnum(IssueStatus)
    status?: IssueStatus;

    @ApiProperty({ enum: IssuePriority, required: false })
    @IsOptional()
    @IsEnum(IssuePriority)
    priority?: IssuePriority;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    assigneeId?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    sprintId?: string;

    @ApiProperty({ required: false, minimum: 1, maximum: 100 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    storyPoints?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    dueDate?: string;
}