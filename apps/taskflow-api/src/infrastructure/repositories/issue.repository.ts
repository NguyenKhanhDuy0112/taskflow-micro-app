// 1. apps/api/src/infrastructure/repositories/issue.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import type { IssueRepositoryInterface } from '../../domain/repositories/issue.repository.interface';
import { IssueEntity } from '../../domain/entities/issue.entity';
import { IssueOrmEntity, IssueStatus } from '../database/entities/issue.entity';

@Injectable()
export class IssueRepository implements IssueRepositoryInterface {
    constructor(
        @InjectRepository(IssueOrmEntity)
        private readonly repository: Repository<IssueOrmEntity>
    ) { }

    async save(issue: IssueEntity): Promise<IssueEntity> {
        const ormEntity = new IssueOrmEntity();
        ormEntity.id = issue.getId();
        ormEntity.key = issue.getKey();
        ormEntity.title = issue.getTitle();
        ormEntity.description = issue.getDescription();
        ormEntity.type = issue.getType();
        ormEntity.status = issue.getStatus();
        ormEntity.priority = issue.getPriority();
        ormEntity.assigneeId = issue.getAssigneeId();
        ormEntity.reporterId = issue.getReporterId();
        ormEntity.projectId = issue.getProjectId();
        ormEntity.sprintId = issue.getSprintId();
        ormEntity.parentId = issue.getParentId();
        ormEntity.storyPoints = issue.getStoryPoints();
        ormEntity.dueDate = issue.getDueDate();
        ormEntity.resolvedAt = issue.getResolvedAt();

        const saved = await this.repository.save(ormEntity);

        return IssueEntity.reconstruct(
            saved.id,
            saved.key,
            saved.title,
            saved.description,
            saved.type,
            saved.status,
            saved.priority,
            saved.assigneeId,
            saved.reporterId,
            saved.projectId,
            saved.sprintId,
            saved.parentId,
            saved.storyPoints,
            saved.originalEstimate,
            saved.remainingEstimate,
            saved.dueDate,
            saved.resolvedAt,
            saved.createdAt,
            saved.updatedAt
        );
    }

    async findById(id: string): Promise<IssueEntity | null> {
        const issue = await this.repository.findOne({ where: { id } });
        if (!issue) return null;

        return IssueEntity.reconstruct(
            issue.id,
            issue.key,
            issue.title,
            issue.description,
            issue.type,
            issue.status,
            issue.priority,
            issue.assigneeId,
            issue.reporterId,
            issue.projectId,
            issue.sprintId,
            issue.parentId,
            issue.storyPoints,
            issue.originalEstimate,
            issue.remainingEstimate,
            issue.dueDate,
            issue.resolvedAt,
            issue.createdAt,
            issue.updatedAt
        );
    }

    async findByKey(key: string): Promise<IssueEntity | null> {
        const issue = await this.repository.findOne({ where: { key } });
        if (!issue) return null;

        return IssueEntity.reconstruct(
            issue.id,
            issue.key,
            issue.title,
            issue.description,
            issue.type,
            issue.status,
            issue.priority,
            issue.assigneeId,
            issue.reporterId,
            issue.projectId,
            issue.sprintId,
            issue.parentId,
            issue.storyPoints,
            issue.originalEstimate,
            issue.remainingEstimate,
            issue.dueDate,
            issue.resolvedAt,
            issue.createdAt,
            issue.updatedAt
        );
    }

    async findByProjectId(projectId: string): Promise<IssueEntity[]> {
        const issues = await this.repository.find({
            where: { projectId },
            order: { createdAt: 'DESC' }
        });

        return issues.map(issue => IssueEntity.reconstruct(
            issue.id,
            issue.key,
            issue.title,
            issue.description,
            issue.type,
            issue.status,
            issue.priority,
            issue.assigneeId,
            issue.reporterId,
            issue.projectId,
            issue.sprintId,
            issue.parentId,
            issue.storyPoints,
            issue.originalEstimate,
            issue.remainingEstimate,
            issue.dueDate,
            issue.resolvedAt,
            issue.createdAt,
            issue.updatedAt
        ));
    }

    async findBySprintId(sprintId: string): Promise<IssueEntity[]> {
        const issues = await this.repository.find({
            where: { sprintId },
            order: { createdAt: 'ASC' }
        });

        return issues.map(issue => IssueEntity.reconstruct(
            issue.id,
            issue.key,
            issue.title,
            issue.description,
            issue.type,
            issue.status,
            issue.priority,
            issue.assigneeId,
            issue.reporterId,
            issue.projectId,
            issue.sprintId,
            issue.parentId,
            issue.storyPoints,
            issue.originalEstimate,
            issue.remainingEstimate,
            issue.dueDate,
            issue.resolvedAt,
            issue.createdAt,
            issue.updatedAt
        ));
    }

    async findBacklogByProjectId(projectId: string): Promise<IssueEntity[]> {
        const issues = await this.repository.find({
            where: {
                projectId,
                sprintId: IsNull()
            },
            order: { createdAt: 'DESC' }
        });

        return issues.map(issue => IssueEntity.reconstruct(
            issue.id,
            issue.key,
            issue.title,
            issue.description,
            issue.type,
            issue.status,
            issue.priority,
            issue.assigneeId,
            issue.reporterId,
            issue.projectId,
            issue.sprintId,
            issue.parentId,
            issue.storyPoints,
            issue.originalEstimate,
            issue.remainingEstimate,
            issue.dueDate,
            issue.resolvedAt,
            issue.createdAt,
            issue.updatedAt
        ));
    }

    async findByAssigneeId(assigneeId: string): Promise<IssueEntity[]> {
        const issues = await this.repository.find({
            where: { assigneeId },
            order: { updatedAt: 'DESC' }
        });

        return issues.map(issue => IssueEntity.reconstruct(
            issue.id,
            issue.key,
            issue.title,
            issue.description,
            issue.type,
            issue.status,
            issue.priority,
            issue.assigneeId,
            issue.reporterId,
            issue.projectId,
            issue.sprintId,
            issue.parentId,
            issue.storyPoints,
            issue.originalEstimate,
            issue.remainingEstimate,
            issue.dueDate,
            issue.resolvedAt,
            issue.createdAt,
            issue.updatedAt
        ));
    }

    async findByStatus(projectId: string, status: IssueStatus): Promise<IssueEntity[]> {
        const issues = await this.repository.find({
            where: { projectId, status },
            order: { updatedAt: 'DESC' }
        });

        return issues.map(issue => IssueEntity.reconstruct(
            issue.id,
            issue.key,
            issue.title,
            issue.description,
            issue.type,
            issue.status,
            issue.priority,
            issue.assigneeId,
            issue.reporterId,
            issue.projectId,
            issue.sprintId,
            issue.parentId,
            issue.storyPoints,
            issue.originalEstimate,
            issue.remainingEstimate,
            issue.dueDate,
            issue.resolvedAt,
            issue.createdAt,
            issue.updatedAt
        ));
    }

    async findByParentId(parentId: string): Promise<IssueEntity[]> {
        const issues = await this.repository.find({
            where: { parentId },
            order: { createdAt: 'ASC' }
        });

        return issues.map(issue => IssueEntity.reconstruct(
            issue.id,
            issue.key,
            issue.title,
            issue.description,
            issue.type,
            issue.status,
            issue.priority,
            issue.assigneeId,
            issue.reporterId,
            issue.projectId,
            issue.sprintId,
            issue.parentId,
            issue.storyPoints,
            issue.originalEstimate,
            issue.remainingEstimate,
            issue.dueDate,
            issue.resolvedAt,
            issue.createdAt,
            issue.updatedAt
        ));
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async exists(id: string): Promise<boolean> {
        const count = await this.repository.count({ where: { id } });
        return count > 0;
    }

    async existsByKey(key: string): Promise<boolean> {
        const count = await this.repository.count({ where: { key } });
        return count > 0;
    }
}