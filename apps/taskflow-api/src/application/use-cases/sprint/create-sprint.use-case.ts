import { Injectable, Inject } from '@nestjs/common';
import type { SprintRepositoryInterface } from '../../../domain/repositories/sprint.repository.interface';
import type { ProjectRepositoryInterface } from '../../../domain/repositories/project.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';
import { SprintEntity } from '../../../domain/entities/sprint.entity';
import type { CreateSprintDto } from '../../dto/sprint/create-sprint.dto';

@Injectable()
export class CreateSprintUseCase {
    constructor(
        @Inject('SprintRepositoryInterface')
        private readonly sprintRepository: SprintRepositoryInterface,
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface,
        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(projectId: string, dto: CreateSprintDto, userId: string): Promise<SprintEntity> {
        // Check if project exists and user has access
        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        const isOwner = project.isOwner(userId);
        const member = await this.memberRepository.findByProjectAndUser(projectId, userId);

        if (!isOwner && (!member || !member.canManage())) {
            throw new Error('Access denied - admin permissions required');
        }

        // Create sprint
        const sprint = SprintEntity.create(dto.name, projectId, dto.goal);

        // Set dates if provided
        if (dto.startDate && dto.endDate) {
            const startDate = new Date(dto.startDate);
            const endDate = new Date(dto.endDate);

            if (startDate >= endDate) {
                throw new Error('Start date must be before end date');
            }

            sprint.updateDates(startDate, endDate);
        }

        return await this.sprintRepository.save(sprint);
    }
}