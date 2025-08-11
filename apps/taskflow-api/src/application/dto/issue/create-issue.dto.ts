import { IsString, IsEnum, IsOptional, MinLength, MaxLength, IsInt, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IssueType, IssuePriority } from '../../../infrastructure/database/entities/issue.entity';

export class CreateIssueDto {
    @ApiProperty({ example: 'Implement user authentication' })
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    title: string;

    @ApiProperty({ example: 'Add JWT-based authentication system with login/register endpoints', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(2000)
    description?: string;

    @ApiProperty({ enum: IssueType, default: IssueType.TASK })
    @IsEnum(IssueType)
    type: IssueType;

    @ApiProperty({ enum: IssuePriority, default: IssuePriority.MEDIUM })
    @IsEnum(IssuePriority)
    priority: IssuePriority;

    @ApiProperty({ example: 'user-uuid', required: false })
    @IsOptional()
    @IsString()
    assigneeId?: string;

    @ApiProperty({ example: 'sprint-uuid', required: false })
    @IsOptional()
    @IsString()
    sprintId?: string;

    @ApiProperty({ example: 'parent-issue-uuid', required: false })
    @IsOptional()
    @IsString()
    parentId?: string;

    @ApiProperty({ example: 5, required: false, minimum: 1, maximum: 100 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    storyPoints?: number;

    @ApiProperty({ example: '2024-12-31', required: false })
    @IsOptional()
    @IsDateString()
    dueDate?: string;
}