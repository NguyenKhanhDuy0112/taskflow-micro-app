import { Injectable, Inject } from '@nestjs/common';
import type { IssueRepositoryInterface } from '../../../domain/repositories/issue.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';
import { IssueEntity } from '../../../domain/entities/issue.entity';
import { IssueStatus } from '../../../infrastructure/database/entities/issue.entity';

@Injectable()
export class MoveIssueStatusUseCase {
    constructor(
        @Inject('IssueRepositoryInterface')
        private readonly issueRepository: IssueRepositoryInterface,
        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(issueId: string, newStatus: IssueStatus, userId: string): Promise<IssueEntity> {
        const issue = await this.issueRepository.findById(issueId);
        if (!issue) {
            throw new Error('Issue not found');
        }

        // Check permissions
        const isMember = await this.memberRepository.exists(issue.getProjectId(), userId);
        if (!isMember) {
            throw new Error('Access denied to this project');
        }

        // Check if move is valid
        if (!issue.canBeMovedToStatus(newStatus)) {
            throw new Error(`Cannot move issue from ${issue.getStatus()} to ${newStatus}`);
        }

        // Apply status change
        switch (newStatus) {
            case IssueStatus.TODO:
                issue.moveToTodo();
                break;
            case IssueStatus.IN_PROGRESS:
                issue.moveToInProgress();
                break;
            case IssueStatus.IN_REVIEW:
                issue.moveToReview();
                break;
            case IssueStatus.DONE:
                issue.moveToDone();
                break;
        }

        return await this.issueRepository.save(issue);
    }
}