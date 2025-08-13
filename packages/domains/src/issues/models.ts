import { IssueType, IssueStatus, IssuePriority } from './enums';

export interface CreateIssueRequest {
    title: string;
    description?: string;
    type: IssueType;
    priority: IssuePriority;
    assigneeId?: string;
    sprintId?: string;
    parentId?: string;
    storyPoints?: number;
    dueDate?: string;
}

export interface UpdateIssueRequest {
    title?: string;
    description?: string;
    status?: IssueStatus;
    priority?: IssuePriority;
    assigneeId?: string;
    sprintId?: string;
    storyPoints?: number;
    dueDate?: string;
}

export interface Issue {
    id: string;
    key: string;
    title: string;
    description?: string;
    type: IssueType;
    status: IssueStatus;
    priority: IssuePriority;
    assigneeId?: string;
    reporterId: string;
    projectId: string;
    sprintId?: string;
    storyPoints?: number;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface MoveIssueStatusRequest {
    status: IssueStatus;
}

export interface MoveIssueToSprintRequest {
    sprintId: string;
}