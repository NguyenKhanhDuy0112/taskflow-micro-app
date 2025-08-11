import { BaseEntity } from './base/entity.base';
import { Id } from '../value-objects/id.vo';
import { IssueType, IssueStatus, IssuePriority } from '../../infrastructure/database/entities/issue.entity';

export class IssueEntity extends BaseEntity {
    private constructor(
        id: string,
        private key: string,
        private title: string,
        private description: string | null,
        private type: IssueType,
        private status: IssueStatus,
        private priority: IssuePriority,
        private assigneeId: string | null,
        private reporterId: string,
        private projectId: string,
        private sprintId: string | null,
        private parentId: string | null,
        private storyPoints: number | null,
        private originalEstimate: number | null,
        private remainingEstimate: number | null,
        private dueDate: Date | null,
        private resolvedAt: Date | null,
        private readonly createdAt: Date = new Date(),
        private updatedAt: Date = new Date()
    ) {
        super(id);
    }

    public static create(
        key: string,
        title: string,
        type: IssueType,
        priority: IssuePriority,
        reporterId: string,
        projectId: string,
        description?: string
    ): IssueEntity {
        return new IssueEntity(
            Id.generate().getValue(),
            key,
            title.trim(),
            description?.trim() || null,
            type,
            IssueStatus.TODO,
            priority,
            null, // No assignee initially
            reporterId,
            projectId,
            null, // No sprint initially
            null, // No parent initially
            null, // No story points initially
            null,
            null,
            null,
            null
        );
    }

    public static reconstruct(
        id: string,
        key: string,
        title: string,
        description: string | null,
        type: IssueType,
        status: IssueStatus,
        priority: IssuePriority,
        assigneeId: string | null,
        reporterId: string,
        projectId: string,
        sprintId: string | null,
        parentId: string | null,
        storyPoints: number | null,
        originalEstimate: number | null,
        remainingEstimate: number | null,
        dueDate: Date | null,
        resolvedAt: Date | null,
        createdAt?: Date,
        updatedAt?: Date
    ): IssueEntity {
        return new IssueEntity(
            id,
            key,
            title,
            description,
            type,
            status,
            priority,
            assigneeId,
            reporterId,
            projectId,
            sprintId,
            parentId,
            storyPoints,
            originalEstimate,
            remainingEstimate,
            dueDate,
            resolvedAt,
            createdAt,
            updatedAt
        );
    }

    // Getters
    public getKey(): string {
        return this.key;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string | null {
        return this.description;
    }

    public getType(): IssueType {
        return this.type;
    }

    public getStatus(): IssueStatus {
        return this.status;
    }

    public getPriority(): IssuePriority {
        return this.priority;
    }

    public getAssigneeId(): string | null {
        return this.assigneeId;
    }

    public getReporterId(): string {
        return this.reporterId;
    }

    public getProjectId(): string {
        return this.projectId;
    }

    public getSprintId(): string | null {
        return this.sprintId;
    }

    public getParentId(): string | null {
        return this.parentId;
    }

    public getStoryPoints(): number | null {
        return this.storyPoints;
    }

    public getDueDate(): Date | null {
        return this.dueDate;
    }

    public getResolvedAt(): Date | null {
        return this.resolvedAt;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    // Business methods
    public updateTitle(newTitle: string): void {
        if (!newTitle || newTitle.trim().length === 0) {
            throw new Error('Issue title cannot be empty');
        }
        if (newTitle.trim().length > 255) {
            throw new Error('Issue title cannot exceed 255 characters');
        }
        this.title = newTitle.trim();
        this.updatedAt = new Date();
    }

    public updateDescription(newDescription: string): void {
        this.description = newDescription.trim() || null;
        this.updatedAt = new Date();
    }

    public assignTo(userId: string): void {
        this.assigneeId = userId;
        this.updatedAt = new Date();
    }

    public unassign(): void {
        this.assigneeId = null;
        this.updatedAt = new Date();
    }

    public setPriority(priority: IssuePriority): void {
        this.priority = priority;
        this.updatedAt = new Date();
    }

    public setStoryPoints(points: number | null): void {
        if (points !== null && (points < 0 || points > 100)) {
            throw new Error('Story points must be between 0 and 100');
        }
        this.storyPoints = points;
        this.updatedAt = new Date();
    }

    public setDueDate(date: Date | null): void {
        this.dueDate = date;
        this.updatedAt = new Date();
    }

    // Status transitions (Drag & Drop logic)
    public moveToInProgress(): void {
        if (this.status !== IssueStatus.TODO) {
            throw new Error('Can only move TODO issues to In Progress');
        }
        this.status = IssueStatus.IN_PROGRESS;
        this.updatedAt = new Date();
    }

    public moveToReview(): void {
        if (this.status !== IssueStatus.IN_PROGRESS) {
            throw new Error('Can only move In Progress issues to Review');
        }
        this.status = IssueStatus.IN_REVIEW;
        this.updatedAt = new Date();
    }

    public moveToDone(): void {
        if (this.status === IssueStatus.DONE) {
            throw new Error('Issue is already done');
        }
        this.status = IssueStatus.DONE;
        this.resolvedAt = new Date();
        this.updatedAt = new Date();
    }

    public moveToTodo(): void {
        this.status = IssueStatus.TODO;
        this.resolvedAt = null;
        this.updatedAt = new Date();
    }

    // Sprint assignment (Drag & Drop from backlog to sprint)
    public addToSprint(sprintId: string): void {
        if (this.sprintId === sprintId) {
            throw new Error('Issue is already in this sprint');
        }
        this.sprintId = sprintId;
        this.updatedAt = new Date();
    }

    public removeFromSprint(): void {
        if (!this.sprintId) {
            throw new Error('Issue is not in any sprint');
        }
        this.sprintId = null;
        this.updatedAt = new Date();
    }

    public moveBetweenSprints(newSprintId: string): void {
        this.sprintId = newSprintId;
        this.updatedAt = new Date();
    }

    // Hierarchy management (subtasks)
    public setParent(parentId: string): void {
        if (this.type !== IssueType.SUBTASK) {
            throw new Error('Only subtasks can have parents');
        }
        this.parentId = parentId;
        this.updatedAt = new Date();
    }

    public removeParent(): void {
        this.parentId = null;
        this.updatedAt = new Date();
    }

    // Query methods
    public isAssigned(): boolean {
        return this.assigneeId !== null;
    }

    public isInSprint(): boolean {
        return this.sprintId !== null;
    }

    public isDone(): boolean {
        return this.status === IssueStatus.DONE;
    }

    public isInProgress(): boolean {
        return this.status === IssueStatus.IN_PROGRESS;
    }

    public canBeMovedToStatus(newStatus: IssueStatus): boolean {
        switch (newStatus) {
            case IssueStatus.TODO:
                return true; // Can always move back to TODO
            case IssueStatus.IN_PROGRESS:
                return this.status === IssueStatus.TODO || this.status === IssueStatus.IN_REVIEW;
            case IssueStatus.IN_REVIEW:
                return this.status === IssueStatus.IN_PROGRESS;
            case IssueStatus.DONE:
                return this.status !== IssueStatus.DONE;
            default:
                return false;
        }
    }

    public isSubtask(): boolean {
        return this.type === IssueType.SUBTASK;
    }

    public isEpic(): boolean {
        return this.type === IssueType.EPIC;
    }

    public toJSON() {
        return {
            id: this._id,
            key: this.key,
            title: this.title,
            description: this.description,
            type: this.type,
            status: this.status,
            priority: this.priority,
            assigneeId: this.assigneeId,
            reporterId: this.reporterId,
            projectId: this.projectId,
            sprintId: this.sprintId,
            parentId: this.parentId,
            storyPoints: this.storyPoints,
            originalEstimate: this.originalEstimate,
            remainingEstimate: this.remainingEstimate,
            dueDate: this.dueDate,
            resolvedAt: this.resolvedAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}