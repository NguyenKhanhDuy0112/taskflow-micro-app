import { BaseEntity } from './base/entity.base';
import { Id } from '../value-objects/id.vo';
import { ProjectKey } from '../value-objects/project-key.vo';
import { ProjectStatus } from '../../infrastructure/database/entities/project.entity';

export class ProjectEntity extends BaseEntity {
    private constructor(
        id: string,
        private name: string,
        private key: ProjectKey,
        private description: string | null,
        private status: ProjectStatus,
        private ownerId: string,
        private issueCounter: number = 0,
        private readonly createdAt: Date = new Date(),
        private updatedAt: Date = new Date()
    ) {
        super(id);
    }

    public static create(
        name: string,
        key: string,
        ownerId: string,
        description?: string
    ): ProjectEntity {
        return new ProjectEntity(
            Id.generate().getValue(),
            name.trim(),
            ProjectKey.from(key),
            description || null,
            ProjectStatus.ACTIVE,
            ownerId
        );
    }

    public static reconstruct(
        id: string,
        name: string,
        key: string,
        description: string | null,
        status: ProjectStatus,
        ownerId: string,
        issueCounter: number = 0,
        createdAt?: Date,
        updatedAt?: Date
    ): ProjectEntity {
        return new ProjectEntity(
            id,
            name,
            ProjectKey.from(key),
            description,
            status,
            ownerId,
            issueCounter,
            createdAt,
            updatedAt
        );
    }

    // Getters
    public getName(): string {
        return this.name;
    }

    public getKey(): ProjectKey {
        return this.key;
    }

    public getDescription(): string | null {
        return this.description;
    }

    public getStatus(): ProjectStatus {
        return this.status;
    }

    public getOwnerId(): string {
        return this.ownerId;
    }

    public getIssueCounter(): number {
        return this.issueCounter;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    // Business methods
    public updateName(newName: string): void {
        if (!newName || newName.trim().length === 0) {
            throw new Error('Project name cannot be empty');
        }
        if (newName.trim().length > 100) {
            throw new Error('Project name cannot exceed 100 characters');
        }
        this.name = newName.trim();
        this.updatedAt = new Date();
    }

    public updateDescription(newDescription: string): void {
        this.description = newDescription.trim() || null;
        this.updatedAt = new Date();
    }

    public archive(): void {
        if (this.status === ProjectStatus.ARCHIVED) {
            throw new Error('Project is already archived');
        }
        this.status = ProjectStatus.ARCHIVED;
        this.updatedAt = new Date();
    }

    public activate(): void {
        if (this.status === ProjectStatus.ACTIVE) {
            throw new Error('Project is already active');
        }
        this.status = ProjectStatus.ACTIVE;
        this.updatedAt = new Date();
    }

    public putOnHold(): void {
        if (this.status === ProjectStatus.ON_HOLD) {
            throw new Error('Project is already on hold');
        }
        this.status = ProjectStatus.ON_HOLD;
        this.updatedAt = new Date();
    }

    public isActive(): boolean {
        return this.status === ProjectStatus.ACTIVE;
    }

    public canBeModified(): boolean {
        return this.status === ProjectStatus.ACTIVE || this.status === ProjectStatus.ON_HOLD;
    }

    public generateNextIssueKey(): string {
        this.issueCounter += 1;
        this.updatedAt = new Date();
        return this.key.generateIssueKey(this.issueCounter);
    }

    public isOwner(userId: string): boolean {
        return this.ownerId === userId;
    }

    public toJSON() {
        return {
            id: this._id,
            name: this.name,
            key: this.key.getValue(),
            description: this.description,
            status: this.status,
            ownerId: this.ownerId,
            issueCounter: this.issueCounter,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}