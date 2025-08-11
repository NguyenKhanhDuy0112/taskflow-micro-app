import { BaseEntity } from './base/entity.base';
import { Id } from '../value-objects/id.vo';
import { SprintStatus } from '../../infrastructure/database/entities/sprint.entity';

export class SprintEntity extends BaseEntity {
    private constructor(
        id: string,
        private name: string,
        private goal: string | null,
        private projectId: string,
        private status: SprintStatus,
        private startDate: Date | null,
        private endDate: Date | null,
        private readonly createdAt: Date = new Date(),
        private updatedAt: Date = new Date()
    ) {
        super(id);
    }

    public static create(
        name: string,
        projectId: string,
        goal?: string
    ): SprintEntity {
        return new SprintEntity(
            Id.generate().getValue(),
            name.trim(),
            goal?.trim() || null,
            projectId,
            SprintStatus.PLANNED,
            null,
            null
        );
    }

    public static reconstruct(
        id: string,
        name: string,
        goal: string | null,
        projectId: string,
        status: SprintStatus,
        startDate: Date | null,
        endDate: Date | null,
        createdAt?: Date,
        updatedAt?: Date
    ): SprintEntity {
        return new SprintEntity(
            id,
            name,
            goal,
            projectId,
            status,
            startDate,
            endDate,
            createdAt,
            updatedAt
        );
    }

    // Getters
    public getName(): string {
        return this.name;
    }

    public getGoal(): string | null {
        return this.goal;
    }

    public getProjectId(): string {
        return this.projectId;
    }

    public getStatus(): SprintStatus {
        return this.status;
    }

    public getStartDate(): Date | null {
        return this.startDate;
    }

    public getEndDate(): Date | null {
        return this.endDate;
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
            throw new Error('Sprint name cannot be empty');
        }
        if (newName.trim().length > 100) {
            throw new Error('Sprint name cannot exceed 100 characters');
        }
        this.name = newName.trim();
        this.updatedAt = new Date();
    }

    public updateGoal(newGoal: string): void {
        this.goal = newGoal.trim() || null;
        this.updatedAt = new Date();
    }

    public start(startDate: Date, endDate: Date): void {
        if (this.status !== SprintStatus.PLANNED) {
            throw new Error('Can only start planned sprints');
        }

        if (startDate >= endDate) {
            throw new Error('Start date must be before end date');
        }

        if (startDate < new Date()) {
            throw new Error('Start date cannot be in the past');
        }

        this.status = SprintStatus.ACTIVE;
        this.startDate = startDate;
        this.endDate = endDate;
        this.updatedAt = new Date();
    }

    public complete(): void {
        if (this.status !== SprintStatus.ACTIVE) {
            throw new Error('Can only complete active sprints');
        }

        this.status = SprintStatus.COMPLETED;
        this.updatedAt = new Date();
    }

    public reopen(): void {
        if (this.status !== SprintStatus.COMPLETED) {
            throw new Error('Can only reopen completed sprints');
        }

        this.status = SprintStatus.ACTIVE;
        this.updatedAt = new Date();
    }

    public updateDates(startDate: Date, endDate: Date): void {
        if (this.status === SprintStatus.COMPLETED) {
            throw new Error('Cannot update dates of completed sprint');
        }

        if (startDate >= endDate) {
            throw new Error('Start date must be before end date');
        }

        this.startDate = startDate;
        this.endDate = endDate;
        this.updatedAt = new Date();
    }

    // Query methods
    public isPlanned(): boolean {
        return this.status === SprintStatus.PLANNED;
    }

    public isActive(): boolean {
        return this.status === SprintStatus.ACTIVE;
    }

    public isCompleted(): boolean {
        return this.status === SprintStatus.COMPLETED;
    }

    public canBeStarted(): boolean {
        return this.status === SprintStatus.PLANNED;
    }

    public canBeCompleted(): boolean {
        return this.status === SprintStatus.ACTIVE;
    }

    public canBeModified(): boolean {
        return this.status !== SprintStatus.COMPLETED;
    }

    public getDurationInDays(): number | null {
        if (!this.startDate || !this.endDate) return null;

        const diffTime = this.endDate.getTime() - this.startDate.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    public getProgressPercentage(): number | null {
        if (!this.startDate || !this.endDate) return null;
        if (this.status !== SprintStatus.ACTIVE) return null;

        const now = new Date();
        const totalTime = this.endDate.getTime() - this.startDate.getTime();
        const elapsedTime = now.getTime() - this.startDate.getTime();

        const progress = Math.min(Math.max((elapsedTime / totalTime) * 100, 0), 100);
        return Math.round(progress);
    }

    public isOverdue(): boolean {
        if (!this.endDate || this.status !== SprintStatus.ACTIVE) return false;
        return new Date() > this.endDate;
    }

    public toJSON() {
        return {
            id: this._id,
            name: this.name,
            goal: this.goal,
            projectId: this.projectId,
            status: this.status,
            startDate: this.startDate,
            endDate: this.endDate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            durationInDays: this.getDurationInDays(),
            progressPercentage: this.getProgressPercentage(),
            isOverdue: this.isOverdue()
        };
    }
}