import { IsString, IsEnum, IsOptional, MinLength, MaxLength, IsInt, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
    CreateIssueRequest,
    IssueType,
    IssuePriority,
    ISSUE_CONSTANTS
} from '@repo/domains';

export class CreateIssueDto implements CreateIssueRequest {
    @ApiProperty({ example: 'Implement user authentication' })
    @IsString()
    @MinLength(ISSUE_CONSTANTS.MIN_TITLE_LENGTH)
    @MaxLength(ISSUE_CONSTANTS.MAX_TITLE_LENGTH)
    title: string;

    @ApiProperty({ example: 'Add JWT-based authentication system with login/register endpoints', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(ISSUE_CONSTANTS.MAX_DESCRIPTION_LENGTH)
    description?: string;

    @ApiProperty({ enum: IssueType, default: ISSUE_CONSTANTS.DEFAULT_TYPE })
    @IsEnum(IssueType)
    type: IssueType;

    @ApiProperty({ enum: IssuePriority, default: ISSUE_CONSTANTS.DEFAULT_PRIORITY })
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

    @ApiProperty({ example: 5, required: false, minimum: ISSUE_CONSTANTS.MIN_STORY_POINTS, maximum: ISSUE_CONSTANTS.MAX_STORY_POINTS })
    @IsOptional()
    @IsInt()
    @Min(ISSUE_CONSTANTS.MIN_STORY_POINTS)
    @Max(ISSUE_CONSTANTS.MAX_STORY_POINTS)
    storyPoints?: number;

    @ApiProperty({ example: '2024-12-31', required: false })
    @IsOptional()
    @IsDateString()
    dueDate?: string;
}