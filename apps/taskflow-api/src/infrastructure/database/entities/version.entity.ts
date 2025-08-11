import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
} from 'typeorm';
import { ProjectOrmEntity } from './project.entity';

export enum VersionStatus {
    UNRELEASED = 'unreleased',
    RELEASED = 'released',
    ARCHIVED = 'archived',
}

@Entity('versions')
@Unique(['name', 'projectId'])
export class VersionOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ name: 'project_id' })
    projectId: string;

    @Column({
        type: 'enum',
        enum: VersionStatus,
        default: VersionStatus.UNRELEASED,
    })
    status: VersionStatus;

    @Column({ name: 'release_date', type: 'timestamp', nullable: true }) // Fix: explicit type
    releaseDate: Date | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    // Relations
    @ManyToOne(() => ProjectOrmEntity, (project) => project.versions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: ProjectOrmEntity;
}