import { ProjectMemberRole, ProjectStatus } from "./enums";


export interface CreateProjectRequest {
    name: string;
    key: string;
    description?: string;
}

export interface UpdateProjectRequest {
    name?: string;
    description?: string;
    status?: ProjectStatus;
}

export interface Project {
    id: string;
    name: string;
    key: string;
    description?: string;
    status: ProjectStatus;
    ownerId: string;
    issueCounter: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectMember {
    id: string;
    projectId: string;
    userId: string;
    role: ProjectMemberRole;
    joinedAt: Date;
    // Populated user data
    user?: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
    };
}

export interface AddMemberRequest {
    userId: string;
    role?: ProjectMemberRole;
}

export interface UpdateMemberRoleRequest {
    role: ProjectMemberRole;
}

export interface ProjectWithStats extends Project {
    memberCount: number;
    issueCount: number;
    activeSprintCount: number;
    completedIssueCount: number;
}
