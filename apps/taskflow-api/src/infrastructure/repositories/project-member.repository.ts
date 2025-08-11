import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectMemberRepositoryInterface } from '../../domain/repositories/project-member.repository.interface';
import { ProjectMemberEntity } from '../../domain/entities/project-member.entity';
import { ProjectMemberOrmEntity } from '../database/entities/project-member.entity';

@Injectable()
export class ProjectMemberRepository implements ProjectMemberRepositoryInterface {
    constructor(
        @InjectRepository(ProjectMemberOrmEntity)
        private readonly repository: Repository<ProjectMemberOrmEntity>
    ) { }

    async save(member: ProjectMemberEntity): Promise<ProjectMemberEntity> {
        const ormEntity = new ProjectMemberOrmEntity();
        ormEntity.id = member.getId();
        ormEntity.projectId = member.getProjectId();
        ormEntity.userId = member.getUserId();
        ormEntity.role = member.getRole();

        const saved = await this.repository.save(ormEntity);

        return ProjectMemberEntity.reconstruct(
            saved.id,
            saved.projectId,
            saved.userId,
            saved.role,
            saved.joinedAt
        );
    }

    async findById(id: string): Promise<ProjectMemberEntity | null> {
        const member = await this.repository.findOne({ where: { id } });
        if (!member) return null;

        return ProjectMemberEntity.reconstruct(
            member.id,
            member.projectId,
            member.userId,
            member.role,
            member.joinedAt
        );
    }

    async findByProjectId(projectId: string): Promise<ProjectMemberEntity[]> {
        const members = await this.repository.find({
            where: { projectId },
            relations: ['user'],
            order: { joinedAt: 'ASC' }
        });

        return members.map(member => ProjectMemberEntity.reconstruct(
            member.id,
            member.projectId,
            member.userId,
            member.role,
            member.joinedAt
        ));
    }

    async findByUserId(userId: string): Promise<ProjectMemberEntity[]> {
        const members = await this.repository.find({
            where: { userId },
            order: { joinedAt: 'DESC' }
        });

        return members.map(member => ProjectMemberEntity.reconstruct(
            member.id,
            member.projectId,
            member.userId,
            member.role,
            member.joinedAt
        ));
    }

    async findByProjectAndUser(projectId: string, userId: string): Promise<ProjectMemberEntity | null> {
        const member = await this.repository.findOne({
            where: { projectId, userId }
        });

        if (!member) return null;

        return ProjectMemberEntity.reconstruct(
            member.id,
            member.projectId,
            member.userId,
            member.role,
            member.joinedAt
        );
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteByProjectAndUser(projectId: string, userId: string): Promise<void> {
        await this.repository.delete({ projectId, userId });
    }

    async exists(projectId: string, userId: string): Promise<boolean> {
        const count = await this.repository.count({
            where: { projectId, userId }
        });
        return count > 0;
    }
}