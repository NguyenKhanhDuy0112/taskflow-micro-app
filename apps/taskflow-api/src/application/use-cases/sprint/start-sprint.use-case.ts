import { Injectable, Inject } from '@nestjs/common';
import type { SprintRepositoryInterface } from '../../../domain/repositories/sprint.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';
import { SprintEntity } from '../../../domain/entities/sprint.entity';
import type { StartSprintDto } from '../../dto/sprint/start-sprint.dto';

@Injectable()
export class StartSprintUseCase {
    constructor(
        @Inject('SprintRepositoryInterface')
        private readonly sprintRepository: SprintRepositoryInterface,
        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(sprintId: string, dto: StartSprintDto, userId: string): Promise<SprintEntity> {
        const sprint = await this.sprintRepository.findById(sprintId);
        if (!sprint) {
            throw new Error('Sprint not found');
        }

        // Check permissions
        const member = await this.memberRepository.findByProjectAndUser(sprint.getProjectId(), userId);
        if (!member || !member.canManage()) {
            throw new Error('Access denied - admin permissions required');
        }

        // Check if there's already an active sprint
        const activeSprint = await this.sprintRepository.findActiveSprint(sprint.getProjectId());
        if (activeSprint && activeSprint.getId() !== sprintId) {
            throw new Error('Cannot start sprint - another sprint is already active');
        }

        // Start sprint
        const startDate = new Date(dto.startDate);
        const endDate = new Date(dto.endDate);

        sprint.start(startDate, endDate);

        return await this.sprintRepository.save(sprint);
    }
}
