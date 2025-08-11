import { Injectable, Inject } from '@nestjs/common';
import type { IssueRepositoryInterface } from '../../../domain/repositories/issue.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';

@Injectable()
export class GetSprintIssuesUseCase {
    constructor(
        @Inject('IssueRepositoryInterface')
        private readonly issueRepository: IssueRepositoryInterface,
        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(sprintId: string, userId: string) {
        const issues = await this.issueRepository.findBySprintId(sprintId);

        if (issues.length > 0) {
            // Check permissions using first issue's project
            const projectId = issues[0].getProjectId();
            const isMember = await this.memberRepository.exists(projectId, userId);
            if (!isMember) {
                throw new Error('Access denied to this project');
            }
        }

        return issues;
    }
}