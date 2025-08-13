import { SprintStatus } from './enums';

export interface CreateSprintRequest {
    name: string;
    goal?: string;
    startDate?: string;
    endDate?: string;
}

export interface UpdateSprintRequest {
    name?: string;
    goal?: string;
    startDate?: string;
    endDate?: string;
}

export interface StartSprintRequest {
    startDate: string;
    endDate: string;
}

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
    // Computed fields
    durationInDays?: number;
    progressPercentage?: number;
    isOverdue?: boolean;
}

export interface SprintWithStats extends Sprint {
    issueCount: number;
    completedIssueCount: number;
    totalStoryPoints: number;
    completedStoryPoints: number;
    completionRate: number;
}

export interface SprintStatistics {
    sprint: Sprint;
    completedIssues: number;
    incompletedIssues: number;
    completionRate: number;
    totalStoryPoints: number;
    completedStoryPoints: number;
    burndownData?: BurndownPoint[];
}

export interface BurndownPoint {
    date: string;
    remaining: number;
    ideal: number;
}
