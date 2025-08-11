import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectRepositoryInterface } from '../../domain/repositories/project.repository.interface';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectKey } from '../../domain/value-objects/project-key.vo';
import { ProjectOrmEntity } from '../database/entities/project.entity';

@Injectable()
export class ProjectRepository implements ProjectRepositoryInterface {
    constructor(
        @InjectRepository(ProjectOrmEntity)
        private readonly repository: Repository<ProjectOrmEntity>
    ) { }

    async save(project: ProjectEntity): Promise<ProjectEntity> {
        const ormEntity = new ProjectOrmEntity();
        ormEntity.id = project.getId();
        ormEntity.name = project.getName();
        ormEntity.key = project.getKey().getValue();
        (ormEntity as any).description = project.getDescription();
        ormEntity.status = project.getStatus();
        ormEntity.ownerId = project.getOwnerId();
        (ormEntity as any).issueCounter = project.getIssueCounter();

        const saved = await this.repository.save(ormEntity);

        return ProjectEntity.reconstruct(
            saved.id,
            saved.name,
            saved.key,
            saved.description,
            saved.status,
            saved.ownerId,
            (saved as any).issueCounter || 0,
            saved.createdAt,
            saved.updatedAt
        );
    }

    async findById(id: string): Promise<ProjectEntity | null> {
        const project = await this.repository.findOne({ where: { id } });
        if (!project) return null;

        return ProjectEntity.reconstruct(
            project.id,
            project.name,
            project.key,
            project.description,
            project.status,
            project.ownerId,
            (project as any).issueCounter || 0,
            project.createdAt,
            project.updatedAt
        );
    }

    async findByKey(key: ProjectKey): Promise<ProjectEntity | null> {
        const project = await this.repository.findOne({
            where: { key: key.getValue() }
        });
        if (!project) return null;

        return ProjectEntity.reconstruct(
            project.id,
            project.name,
            project.key,
            project.description,
            project.status,
            project.ownerId,
            (project as any).issueCounter || 0,
            project.createdAt,
            project.updatedAt
        );
    }

    async findByOwnerId(ownerId: string): Promise<ProjectEntity[]> {
        const projects = await this.repository.find({
            where: { ownerId },
            order: { updatedAt: 'DESC' }
        });

        return projects.map(project => ProjectEntity.reconstruct(
            project.id,
            project.name,
            project.key,
            project.description,
            project.status,
            project.ownerId,
            (project as any).issueCounter || 0,
            project.createdAt,
            project.updatedAt
        ));
    }

    async findByMemberId(userId: string): Promise<ProjectEntity[]> {
        const projects = await this.repository
            .createQueryBuilder('project')
            .innerJoin('project.members', 'member')
            .where('member.userId = :userId', { userId })
            .orderBy('project.updatedAt', 'DESC')
            .getMany();

        return projects.map(project => ProjectEntity.reconstruct(
            project.id,
            project.name,
            project.key,
            project.description,
            project.status,
            project.ownerId,
            (project as any).issueCounter || 0,
            project.createdAt,
            project.updatedAt
        ));
    }

    async findAll(): Promise<ProjectEntity[]> {
        const projects = await this.repository.find({
            order: { updatedAt: 'DESC' }
        });

        return projects.map(project => ProjectEntity.reconstruct(
            project.id,
            project.name,
            project.key,
            project.description,
            project.status,
            project.ownerId,
            (project as any).issueCounter || 0,
            project.createdAt,
            project.updatedAt
        ));
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async exists(id: string): Promise<boolean> {
        const count = await this.repository.count({ where: { id } });
        return count > 0;
    }

    async existsByKey(key: ProjectKey): Promise<boolean> {
        const count = await this.repository.count({
            where: { key: key.getValue() }
        });
        return count > 0;
    }
}