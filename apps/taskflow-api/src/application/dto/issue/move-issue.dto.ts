import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IssueStatus } from '../../../infrastructure/database/entities/issue.entity';

export class MoveIssueStatusDto {
    @ApiProperty({ enum: IssueStatus })
    @IsEnum(IssueStatus)
    status: IssueStatus;
}

export class MoveIssueToSprintDto {
    @ApiProperty({ example: 'sprint-uuid' })
    @IsString()
    sprintId: string;
}

export class RemoveIssueFromSprintDto {
    // Empty DTO for removing from sprint
}