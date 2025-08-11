import { SprintEntity } from '../entities/sprint.entity';
import { SprintStatus } from '../../infrastructure/database/entities/sprint.entity';

export interface SprintRepositoryInterface {
    save(sprint: SprintEntity): Promise<SprintEntity>;
    findById(id: string): Promise<SprintEntity | null>;
    findByProjectId(projectId: string): Promise<SprintEntity[]>;
    findByStatus(projectId: string, status: SprintStatus): Promise<SprintEntity[]>;
    findActiveSprint(projectId: string): Promise<SprintEntity | null>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
}