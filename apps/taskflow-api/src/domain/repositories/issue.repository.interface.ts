import { IssueEntity } from '../entities/issue.entity';
import { IssueStatus } from '../../infrastructure/database/entities/issue.entity';

export interface IssueRepositoryInterface {
    save(issue: IssueEntity): Promise<IssueEntity>;
    findById(id: string): Promise<IssueEntity | null>;
    findByKey(key: string): Promise<IssueEntity | null>;
    findByProjectId(projectId: string): Promise<IssueEntity[]>;
    findBySprintId(sprintId: string): Promise<IssueEntity[]>;
    findBacklogByProjectId(projectId: string): Promise<IssueEntity[]>; // Issues not in any sprint
    findByAssigneeId(assigneeId: string): Promise<IssueEntity[]>;
    findByStatus(projectId: string, status: IssueStatus): Promise<IssueEntity[]>;
    findByParentId(parentId: string): Promise<IssueEntity[]>; // Subtasks
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
    existsByKey(key: string): Promise<boolean>;
}