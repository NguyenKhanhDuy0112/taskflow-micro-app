import { BaseEntity } from './base/entity.base';
import { Id } from '../value-objects/id.vo';
import { ProjectMemberRole } from '../../infrastructure/database/entities/project-member.entity';

export class ProjectMemberEntity extends BaseEntity {
    private constructor(
        id: string,
        private projectId: string,
        private userId: string,
        private role: ProjectMemberRole,
        private readonly joinedAt: Date = new Date()
    ) {
        super(id);
    }

    public static create(
        projectId: string,
        userId: string,
        role: ProjectMemberRole = ProjectMemberRole.MEMBER
    ): ProjectMemberEntity {
        return new ProjectMemberEntity(
            Id.generate().getValue(),
            projectId,
            userId,
            role
        );
    }

    public static reconstruct(
        id: string,
        projectId: string,
        userId: string,
        role: ProjectMemberRole,
        joinedAt?: Date
    ): ProjectMemberEntity {
        return new ProjectMemberEntity(
            id,
            projectId,
            userId,
            role,
            joinedAt
        );
    }

    // Getters
    public getProjectId(): string {
        return this.projectId;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getRole(): ProjectMemberRole {
        return this.role;
    }

    public getJoinedAt(): Date {
        return this.joinedAt;
    }

    // Business methods
    public changeRole(newRole: ProjectMemberRole): void {
        this.role = newRole;
    }

    public isAdmin(): boolean {
        return this.role === ProjectMemberRole.ADMIN;
    }

    public canManage(): boolean {
        return this.role === ProjectMemberRole.ADMIN || this.role === ProjectMemberRole.MEMBER;
    }

    public canView(): boolean {
        return true; // All members can view
    }

    public toJSON() {
        return {
            id: this._id,
            projectId: this.projectId,
            userId: this.userId,
            role: this.role,
            joinedAt: this.joinedAt
        };
    }
}