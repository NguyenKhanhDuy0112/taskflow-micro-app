import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
    MoveIssueStatusRequest,
    MoveIssueToSprintRequest,
    IssueStatus
} from '@repo/domains';

export class MoveIssueStatusDto implements MoveIssueStatusRequest {
    @ApiProperty({ enum: IssueStatus })
    @IsEnum(IssueStatus)
    status: IssueStatus;
}

export class MoveIssueToSprintDto implements MoveIssueToSprintRequest {
    @ApiProperty({ example: 'sprint-uuid' })
    @IsString()
    sprintId: string;
}

export class RemoveIssueFromSprintDto {
    // Empty DTO for removing from sprint
}