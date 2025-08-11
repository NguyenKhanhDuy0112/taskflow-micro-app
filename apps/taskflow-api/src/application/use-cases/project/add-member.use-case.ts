import { Inject, Injectable } from '@nestjs/common';
import type { ProjectMemberRepositoryInterface } from '../../../domain/repositories/project-member.repository.interface';
import type { AuthUserRepositoryInterface } from '../../../domain/repositories/auth-user.repository.interface';
import { ProjectMemberEntity } from '../../../domain/entities/project-member.entity';
import { AddMemberDto } from '../../dto/project/add-member.dto';
import type { ProjectRepositoryInterface } from 'src/domain/repositories/project.repository.interface';

@Injectable()
export class AddMemberUseCase {
    constructor(
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface,

        @Inject('ProjectMemberRepositoryInterface')
        private readonly memberRepository: ProjectMemberRepositoryInterface,

        @Inject('AuthUserRepositoryInterface')
        private readonly userRepository: AuthUserRepositoryInterface
    ) { }

    async execute(projectId: string, dto: AddMemberDto, currentUserId: string): Promise<ProjectMemberEntity> {
        // Check if project exists
        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        // Check permissions - only admin members can add members
        const currentMember = await this.memberRepository.findByProjectAndUser(projectId, currentUserId);
        const isOwner = project.isOwner(currentUserId);

        if (!isOwner && (!currentMember || !currentMember.isAdmin())) {
            throw new Error('Access denied - admin permissions required');
        }

        // Check if user to be added exists
        const userExists = await this.userRepository.exists(dto.userId);
        if (!userExists) {
            throw new Error('User not found');
        }

        // Check if user is already a member
        const existingMember = await this.memberRepository.findByProjectAndUser(projectId, dto.userId);
        if (existingMember) {
            throw new Error('User is already a member of this project');
        }

        // Create and save member
        const member = ProjectMemberEntity.create(projectId, dto.userId, dto.role);
        return await this.memberRepository.save(member);
    }
}