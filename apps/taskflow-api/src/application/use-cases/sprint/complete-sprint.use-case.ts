import { Injectable, Inject } from '@nestjs/common';
import type { SprintRepositoryInterface } from '../../../domain/repositories/sprint.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';
import type { IssueRepositoryInterface } from '../../../domain/repositories/issue.repository.interface';
import { SprintEntity } from '../../../domain/entities/sprint.entity';

@Injectable()
export class CompleteSprintUseCase {
    constructor(
        @Inject('SprintRepositoryInterface')
        private readonly sprintRepository: SprintRepositoryInterface,
        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface,
        @Inject('IssueRepositoryInterface')
        private readonly issueRepository: IssueRepositoryInterface
    ) { }

    async execute(sprintId: string, userId: string): Promise<{
        sprint: SprintEntity;
        completedIssues: number;
        incompletedIssues: number;
    }> {
        const sprint = await this.sprintRepository.findById(sprintId);
        if (!sprint) {
            throw new Error('Sprint not found');
        }

        // Check permissions
        const member = await this.memberRepository.findByProjectAndUser(sprint.getProjectId(), userId);
        if (!member || !member.canManage()) {
            throw new Error('Access denied - admin permissions required');
        }

        // Get sprint statistics
        const sprintIssues = await this.issueRepository.findBySprintId(sprintId);
        const completedIssues = sprintIssues.filter(issue => issue.isDone()).length;
        const incompletedIssues = sprintIssues.length - completedIssues;

        // Complete sprint
        sprint.complete();
        const completedSprint = await this.sprintRepository.save(sprint);

        return {
            sprint: completedSprint,
            completedIssues,
            incompletedIssues
        };
    }
}