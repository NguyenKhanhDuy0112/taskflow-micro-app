import { Injectable, Inject } from '@nestjs/common';
import type { IssueRepositoryInterface } from '../../../domain/repositories/issue.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';
import { IssueEntity } from '../../../domain/entities/issue.entity';

@Injectable()
export class MoveIssueToSprintUseCase {
    constructor(
        @Inject('IssueRepositoryInterface')
        private readonly issueRepository: IssueRepositoryInterface,
        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(issueId: string, sprintId: string | null, userId: string): Promise<IssueEntity> {
        const issue = await this.issueRepository.findById(issueId);
        if (!issue) {
            throw new Error('Issue not found');
        }

        // Check permissions
        const isMember = await this.memberRepository.exists(issue.getProjectId(), userId);
        if (!isMember) {
            throw new Error('Access denied to this project');
        }

        // Apply sprint change
        if (sprintId) {
            if (issue.isInSprint()) {
                issue.moveBetweenSprints(sprintId);
            } else {
                issue.addToSprint(sprintId);
            }
        } else {
            issue.removeFromSprint();
        }

        return await this.issueRepository.save(issue);
    }
}