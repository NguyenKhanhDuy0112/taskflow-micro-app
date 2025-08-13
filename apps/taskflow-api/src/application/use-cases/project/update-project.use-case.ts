import { Inject, Injectable } from '@nestjs/common';
import type { ProjectRepositoryInterface } from '../../../domain/repositories/project.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';
import { ProjectEntity } from '../../../domain/entities/project.entity';
import { UpdateProjectDto } from '../../dto/project/update-project.dto';
import { ProjectStatus } from '@repo/domains';

@Injectable()
export class UpdateProjectUseCase {
    constructor(
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface,

        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(projectId: string, dto: UpdateProjectDto, userId: string): Promise<ProjectEntity> {
        const project = await this.projectRepository.findById(projectId);

        if (!project) {
            throw new Error('Project not found');
        }

        // Check permissions - only admin members can update
        const member = await this.memberRepository.findByProjectAndUser(projectId, userId);
        const isOwner = project.isOwner(userId);

        if (!isOwner && (!member || !member.isAdmin())) {
            throw new Error('Access denied - admin permissions required');
        }

        // Update project fields
        if (dto.name) {
            project.updateName(dto.name);
        }

        if (dto.description !== undefined) {
            project.updateDescription(dto.description);
        }

        if (dto.status) {
            switch (dto.status) {
                case ProjectStatus.ACTIVE:
                    project.activate();
                    break;
                case ProjectStatus.ARCHIVED:
                    project.archive();
                    break;
                case ProjectStatus.ON_HOLD:
                    project.putOnHold();
                    break;
            }
        }

        return await this.projectRepository.save(project);
    }
}