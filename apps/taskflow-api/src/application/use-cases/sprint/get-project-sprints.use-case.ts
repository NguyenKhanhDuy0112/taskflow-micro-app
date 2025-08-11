import { Injectable, Inject } from '@nestjs/common';
import type { SprintRepositoryInterface } from '../../../domain/repositories/sprint.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';

@Injectable()
export class GetProjectSprintsUseCase {
    constructor(
        @Inject('SprintRepositoryInterface')
        private readonly sprintRepository: SprintRepositoryInterface,
        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(projectId: string, userId: string) {
        // Check permissions
        const isMember = await this.memberRepository.exists(projectId, userId);
        if (!isMember) {
            throw new Error('Access denied to this project');
        }

        return await this.sprintRepository.findByProjectId(projectId);
    }
}