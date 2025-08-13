import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { SprintRepositoryInterface } from '../../domain/repositories/sprint.repository.interface';
import { SprintEntity } from '../../domain/entities/sprint.entity';
import { SprintOrmEntity } from '../database/entities/sprint.entity';
import { SprintStatus } from '@repo/domains';

@Injectable()
export class SprintRepository implements SprintRepositoryInterface {
    constructor(
        @InjectRepository(SprintOrmEntity)
        private readonly repository: Repository<SprintOrmEntity>
    ) { }

    async save(sprint: SprintEntity): Promise<SprintEntity> {
        const ormEntity = new SprintOrmEntity();
        ormEntity.id = sprint.getId();
        ormEntity.name = sprint.getName();
        ormEntity.goal = sprint.getGoal();
        ormEntity.projectId = sprint.getProjectId();
        ormEntity.status = sprint.getStatus();
        ormEntity.startDate = sprint.getStartDate();
        ormEntity.endDate = sprint.getEndDate();

        const saved = await this.repository.save(ormEntity);

        return SprintEntity.reconstruct(
            saved.id,
            saved.name,
            saved.goal,
            saved.projectId,
            saved.status,
            saved.startDate,
            saved.endDate,
            saved.createdAt,
            saved.updatedAt
        );
    }

    async findById(id: string): Promise<SprintEntity | null> {
        const sprint = await this.repository.findOne({ where: { id } });
        if (!sprint) return null;

        return SprintEntity.reconstruct(
            sprint.id,
            sprint.name,
            sprint.goal,
            sprint.projectId,
            sprint.status,
            sprint.startDate,
            sprint.endDate,
            sprint.createdAt,
            sprint.updatedAt
        );
    }

    async findByProjectId(projectId: string): Promise<SprintEntity[]> {
        const sprints = await this.repository.find({
            where: { projectId },
            order: { createdAt: 'DESC' }
        });

        return sprints.map(sprint => SprintEntity.reconstruct(
            sprint.id,
            sprint.name,
            sprint.goal,
            sprint.projectId,
            sprint.status,
            sprint.startDate,
            sprint.endDate,
            sprint.createdAt,
            sprint.updatedAt
        ));
    }

    async findByStatus(projectId: string, status: SprintStatus): Promise<SprintEntity[]> {
        const sprints = await this.repository.find({
            where: { projectId, status },
            order: { createdAt: 'DESC' }
        });

        return sprints.map(sprint => SprintEntity.reconstruct(
            sprint.id,
            sprint.name,
            sprint.goal,
            sprint.projectId,
            sprint.status,
            sprint.startDate,
            sprint.endDate,
            sprint.createdAt,
            sprint.updatedAt
        ));
    }

    async findActiveSprint(projectId: string): Promise<SprintEntity | null> {
        const sprint = await this.repository.findOne({
            where: { projectId, status: SprintStatus.ACTIVE }
        });

        if (!sprint) return null;

        return SprintEntity.reconstruct(
            sprint.id,
            sprint.name,
            sprint.goal,
            sprint.projectId,
            sprint.status,
            sprint.startDate,
            sprint.endDate,
            sprint.createdAt,
            sprint.updatedAt
        );
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async exists(id: string): Promise<boolean> {
        const count = await this.repository.count({ where: { id } });
        return count > 0;
    }
}
