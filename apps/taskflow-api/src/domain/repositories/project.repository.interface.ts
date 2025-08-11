import { ProjectEntity } from '../entities/project.entity';
import { ProjectKey } from '../value-objects/project-key.vo';

export interface ProjectRepositoryInterface {
    save(project: ProjectEntity): Promise<ProjectEntity>;
    findById(id: string): Promise<ProjectEntity | null>;
    findByKey(key: ProjectKey): Promise<ProjectEntity | null>;
    findByOwnerId(ownerId: string): Promise<ProjectEntity[]>;
    findAll(): Promise<ProjectEntity[]>;
    findByMemberId(userId: string): Promise<ProjectEntity[]>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
    existsByKey(key: ProjectKey): Promise<boolean>;
}