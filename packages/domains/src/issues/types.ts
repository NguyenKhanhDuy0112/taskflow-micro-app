import { IssuePriority, IssueStatus, IssueType } from './enums';
import { Issue } from './models';

export interface IssueFilters {
    status?: IssueStatus;
    assigneeId?: string;
    priority?: IssuePriority;
    type?: IssueType;
    search?: string;
}

export interface KanbanColumn {
    status: IssueStatus;
    title: string;
    issues: Issue[];
}

export interface DragResult {
    issueId: string;
    sourceStatus: IssueStatus;
    destinationStatus: IssueStatus;
    sourceIndex: number;
    destinationIndex: number;
}