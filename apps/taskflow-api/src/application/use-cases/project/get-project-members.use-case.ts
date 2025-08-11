import { Inject, Injectable } from '@nestjs/common';
import type { ProjectRepositoryInterface } from '../../../domain/repositories/project.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';

@Injectable()
export class GetProjectMembersUseCase {
    constructor(
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface,

        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(projectId: string, userId: string) {
        // Check if project exists and user has access
        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        const isOwner = project.isOwner(userId);
        const isMember = await this.memberRepository.exists(projectId, userId);

        if (!isOwner && !isMember) {
            throw new Error('Access denied to this project');
        }

        return await this.memberRepository.findByProjectId(projectId);
    }
}