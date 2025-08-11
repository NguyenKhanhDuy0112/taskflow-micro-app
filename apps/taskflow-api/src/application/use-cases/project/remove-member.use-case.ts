import { Inject, Injectable } from '@nestjs/common';
import type { ProjectRepositoryInterface } from '../../../domain/repositories/project.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';

@Injectable()
export class RemoveMemberUseCase {
    constructor(
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface,

        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(projectId: string, userId: string, currentUserId: string): Promise<void> {
        // Check if project exists
        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        // Cannot remove project owner
        if (project.isOwner(userId)) {
            throw new Error('Cannot remove project owner');
        }

        // Check permissions - only admin members can remove members
        const currentMember = await this.memberRepository.findByProjectAndUser(projectId, currentUserId);
        const isOwner = project.isOwner(currentUserId);

        if (!isOwner && (!currentMember || !currentMember.isAdmin())) {
            throw new Error('Access denied - admin permissions required');
        }

        // Remove member
        await this.memberRepository.deleteByProjectAndUser(projectId, userId);
    }
}