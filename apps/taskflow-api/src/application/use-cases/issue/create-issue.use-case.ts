import { Injectable, Inject } from '@nestjs/common';
import type { IssueRepositoryInterface } from '../../../domain/repositories/issue.repository.interface';
import type { ProjectRepositoryInterface } from '../../../domain/repositories/project.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';
import type { AuthUserRepositoryInterface } from '../../../domain/repositories/auth-user.repository.interface';
import { IssueEntity } from '../../../domain/entities/issue.entity';
import type { CreateIssueDto } from '../../dto/issue/create-issue.dto';

@Injectable()
export class CreateIssueUseCase {
    constructor(
        @Inject('IssueRepositoryInterface')
        private readonly issueRepository: IssueRepositoryInterface,
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface,
        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface,
        @Inject('AuthUserRepositoryInterface')
        private readonly userRepository: AuthUserRepositoryInterface
    ) { }

    async execute(projectId: string, dto: CreateIssueDto, reporterId: string): Promise<IssueEntity> {
        // Check if project exists and user has access
        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        const isOwner = project.isOwner(reporterId);
        const isMember = await this.memberRepository.exists(projectId, reporterId);

        if (!isOwner && !isMember) {
            throw new Error('Access denied to this project');
        }

        // Validate assignee if provided
        if (dto.assigneeId) {
            const assigneeExists = await this.userRepository.exists(dto.assigneeId);
            if (!assigneeExists) {
                throw new Error('Assignee not found');
            }

            const assigneeIsMember = await this.memberRepository.exists(projectId, dto.assigneeId);
            if (!assigneeIsMember && !project.isOwner(dto.assigneeId)) {
                throw new Error('Assignee is not a member of this project');
            }
        }

        // Generate issue key
        const issueKey = project.generateNextIssueKey();
        await this.projectRepository.save(project); // Save updated counter

        // Create issue
        const issue = IssueEntity.create(
            issueKey,
            dto.title,
            dto.type,
            dto.priority,
            reporterId,
            projectId,
            dto.description
        );

        // Set optional fields
        if (dto.assigneeId) {
            issue.assignTo(dto.assigneeId);
        }

        if (dto.sprintId) {
            issue.addToSprint(dto.sprintId);
        }

        if (dto.parentId) {
            issue.setParent(dto.parentId);
        }

        if (dto.storyPoints) {
            issue.setStoryPoints(dto.storyPoints);
        }

        if (dto.dueDate) {
            issue.setDueDate(new Date(dto.dueDate));
        }

        return await this.issueRepository.save(issue);
    }
}
