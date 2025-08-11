import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectMemberRole } from '../../../infrastructure/database/entities/project-member.entity';

export class AddMemberDto {
    @ApiProperty({ example: 'user-uuid' })
    @IsString()
    userId: string;

    @ApiProperty({ enum: ProjectMemberRole, default: ProjectMemberRole.MEMBER })
    @IsEnum(ProjectMemberRole)
    @IsOptional()
    role?: ProjectMemberRole = ProjectMemberRole.MEMBER;
}