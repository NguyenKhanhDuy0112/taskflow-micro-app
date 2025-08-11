import { Injectable, Inject } from '@nestjs/common';
import type { ProjectRepositoryInterface } from '../../../domain/repositories/project.repository.interface';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';
import { ProjectEntity } from '../../../domain/entities/project.entity';
import { ProjectMemberEntity } from '../../../domain/entities/project-member.entity';
import { ProjectKey } from '../../../domain/value-objects/project-key.vo';
import { ProjectMemberRole } from '../../../infrastructure/database/entities/project-member.entity';
import { CreateProjectDto } from '../../dto/project/create-project.dto';

@Injectable()
export class CreateProjectUseCase {
    constructor(
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface,

        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface
    ) { }

    async execute(dto: CreateProjectDto, ownerId: string): Promise<ProjectEntity> {
        // Check if project key already exists
        const projectKey = ProjectKey.from(dto.key);
        const existingProject = await this.projectRepository.findByKey(projectKey);

        if (existingProject) {
            throw new Error('Project with this key already exists');
        }

        // Create project
        const project = ProjectEntity.create(
            dto.name,
            dto.key,
            ownerId,
            dto.description
        );

        // Save project
        const savedProject = await this.projectRepository.save(project);

        // Add owner as admin member
        const ownerMember = ProjectMemberEntity.create(
            savedProject.getId(),
            ownerId,
            ProjectMemberRole.ADMIN
        );

        await this.memberRepository.save(ownerMember);

        return savedProject;
    }
}