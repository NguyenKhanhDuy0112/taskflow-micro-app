import { Injectable, Inject } from '@nestjs/common';
import type { IssueRepositoryInterface } from '../../../domain/repositories/issue.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';

@Injectable()
export class GetProjectBacklogUseCase {
    constructor(
        @Inject('IssueRepositoryInterface')
        private readonly issueRepository: IssueRepositoryInterface,
        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(projectId: string, userId: string) {
        // Check permissions
        const isMember = await this.memberRepository.exists(projectId, userId);
        if (!isMember) {
            throw new Error('Access denied to this project');
        }

        return await this.issueRepository.findBacklogByProjectId(projectId);
    }
}