export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRole {
    ADMIN = 'admin',
    MEMBER = 'member',
    VIEWER = 'viewer'
}

// Project types
export interface Project {
    id: string;
    name: string;
    key: string; // Project key like 'PROJ'
    description?: string;
    status: ProjectStatus;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum ProjectStatus {
    ACTIVE = 'active',
    ARCHIVED = 'archived',
    ON_HOLD = 'on_hold'
}

// Issue types
export interface Issue {
    id: string;
    key: string; // Like 'PROJ-123'
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

export enum IssueType {
    TASK = 'task',
    BUG = 'bug',
    STORY = 'story',
    EPIC = 'epic',
    SUBTASK = 'subtask'
}

export enum IssueStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    IN_REVIEW = 'in_review',
    DONE = 'done'
}

export enum IssuePriority {
    LOWEST = 'lowest',
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    HIGHEST = 'highest'
}

// Sprint types
export interface Sprint {
    id: string;
    name: string;
    goal?: string;
    projectId: string;
    status: SprintStatus;
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export enum SprintStatus {
    PLANNED = 'planned',
    ACTIVE = 'active',
    COMPLETED = 'completed'
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Request types
export interface CreateProjectRequest {
    name: string;
    key: string;
    description?: string;
}

export interface CreateIssueRequest {
    title: string;
    description?: string;
    type: IssueType;
    priority: IssuePriority;
    assigneeId?: string;
    projectId: string;
    storyPoints?: number;
    dueDate?: Date;
}

export interface UpdateIssueRequest {
    title?: string;
    description?: string;
    status?: IssueStatus;
    priority?: IssuePriority;
    assigneeId?: string;
    storyPoints?: number;
    dueDate?: Date;
}