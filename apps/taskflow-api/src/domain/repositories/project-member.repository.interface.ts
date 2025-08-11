import { ProjectMemberEntity } from '../entities/project-member.entity';

export interface ProjectMemberRepositoryInterface {
    save(member: ProjectMemberEntity): Promise<ProjectMemberEntity>;
    findById(id: string): Promise<ProjectMemberEntity | null>;
    findByProjectId(projectId: string): Promise<ProjectMemberEntity[]>;
    findByUserId(userId: string): Promise<ProjectMemberEntity[]>;
    findByProjectAndUser(projectId: string, userId: string): Promise<ProjectMemberEntity | null>;
    delete(id: string): Promise<void>;
    deleteByProjectAndUser(projectId: string, userId: string): Promise<void>;
    exists(projectId: string, userId: string): Promise<boolean>;
}