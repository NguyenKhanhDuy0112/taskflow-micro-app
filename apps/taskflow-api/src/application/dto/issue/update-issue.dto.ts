import { IsString, IsEnum, IsOptional, MinLength, MaxLength, IsInt, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
    UpdateIssueRequest,
    IssueStatus,
    IssuePriority,
    ISSUE_CONSTANTS
} from '@repo/domains';

export class UpdateIssueDto implements UpdateIssueRequest {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MinLength(ISSUE_CONSTANTS.MIN_TITLE_LENGTH)
    @MaxLength(ISSUE_CONSTANTS.MAX_TITLE_LENGTH)
    title?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(ISSUE_CONSTANTS.MAX_DESCRIPTION_LENGTH)
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

    @ApiProperty({ required: false, minimum: ISSUE_CONSTANTS.MIN_STORY_POINTS, maximum: ISSUE_CONSTANTS.MAX_STORY_POINTS })
    @IsOptional()
    @IsInt()
    @Min(ISSUE_CONSTANTS.MIN_STORY_POINTS)
    @Max(ISSUE_CONSTANTS.MAX_STORY_POINTS)
    storyPoints?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    dueDate?: string;
}
