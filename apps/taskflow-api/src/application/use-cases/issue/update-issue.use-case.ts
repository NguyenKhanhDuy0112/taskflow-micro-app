import { Injectable, Inject } from '@nestjs/common';
import type { IssueRepositoryInterface } from '../../../domain/repositories/issue.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';
import { IssueEntity } from '../../../domain/entities/issue.entity';
import type { UpdateIssueDto } from '../../dto/issue/update-issue.dto';

@Injectable()
export class UpdateIssueUseCase {
    constructor(
        @Inject('IssueRepositoryInterface')
        private readonly issueRepository: IssueRepositoryInterface,
        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(issueId: string, dto: UpdateIssueDto, userId: string): Promise<IssueEntity> {
        const issue = await this.issueRepository.findById(issueId);
        if (!issue) {
            throw new Error('Issue not found');
        }

        // Check permissions
        const isMember = await this.memberRepository.exists(issue.getProjectId(), userId);
        if (!isMember) {
            throw new Error('Access denied to this project');
        }

        // Update fields
        if (dto.title) {
            issue.updateTitle(dto.title);
        }

        if (dto.description !== undefined) {
            issue.updateDescription(dto.description);
        }

        if (dto.status) {
            if (!issue.canBeMovedToStatus(dto.status)) {
                throw new Error(`Cannot move issue from ${issue.getStatus()} to ${dto.status}`);
            }

            switch (dto.status) {
                case 'todo':
                    issue.moveToTodo();
                    break;
                case 'in_progress':
                    issue.moveToInProgress();
                    break;
                case 'in_review':
                    issue.moveToReview();
                    break;
                case 'done':
                    issue.moveToDone();
                    break;
            }
        }

        if (dto.priority) {
            issue.setPriority(dto.priority);
        }

        if (dto.assigneeId !== undefined) {
            if (dto.assigneeId) {
                issue.assignTo(dto.assigneeId);
            } else {
                issue.unassign();
            }
        }

        if (dto.sprintId !== undefined) {
            if (dto.sprintId) {
                if (issue.isInSprint()) {
                    issue.moveBetweenSprints(dto.sprintId);
                } else {
                    issue.addToSprint(dto.sprintId);
                }
            } else {
                issue.removeFromSprint();
            }
        }

        if (dto.storyPoints !== undefined) {
            issue.setStoryPoints(dto.storyPoints);
        }

        if (dto.dueDate !== undefined) {
            issue.setDueDate(dto.dueDate ? new Date(dto.dueDate) : null);
        }

        return await this.issueRepository.save(issue);
    }
}