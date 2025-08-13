import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { ProjectOrmEntity } from './project.entity';
import { IssueOrmEntity } from './issue.entity';
import { SprintStatus } from '@repo/domains';

@Entity('sprints')
export class SprintOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true, type: 'text' })
    goal: string | null;

    @Column({ name: 'project_id' })
    projectId: string;

    @Column({
        type: 'enum',
        enum: SprintStatus,
        default: SprintStatus.PLANNED,
    })
    status: SprintStatus;

    @Column({ name: 'start_date', type: 'timestamp', nullable: true })
    startDate: Date | null;

    @Column({ name: 'end_date', type: 'timestamp', nullable: true })
    endDate: Date | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => ProjectOrmEntity, (project) => project.sprints, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: ProjectOrmEntity;

    @OneToMany(() => IssueOrmEntity, (issue) => issue.sprint)
    issues: IssueOrmEntity[];
}