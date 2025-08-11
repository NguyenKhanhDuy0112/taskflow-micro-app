import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectMemberRole } from '../../../infrastructure/database/entities/project-member.entity';

export class UpdateMemberRoleDto {
    @ApiProperty({ enum: ProjectMemberRole })
    @IsEnum(ProjectMemberRole)
    role: ProjectMemberRole;
}
