import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
} from 'typeorm';
import { UserOrmEntity } from './user.entity';
import { ProjectMemberOrmEntity } from './project-member.entity';
import { IssueOrmEntity } from './issue.entity';
import { SprintOrmEntity } from './sprint.entity';
import { LabelOrmEntity } from './label.entity';
import { VersionOrmEntity } from './version.entity';

export enum ProjectStatus {
    ACTIVE = 'active',
    ARCHIVED = 'archived',
    ON_HOLD = 'on_hold',
}

@Entity('projects')
export class ProjectOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    @Index()
    key: string; // PROJ, TASK, etc.

    @Column({ nullable: true, type: 'text' })
    description: string;

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.ACTIVE,
    })
    status: ProjectStatus;

    @Column({ name: 'owner_id' })
    ownerId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => UserOrmEntity, (user) => user.ownedProjects)
    @JoinColumn({ name: 'owner_id' })
    owner: UserOrmEntity;

    @OneToMany(() => ProjectMemberOrmEntity, (member) => member.project)
    members: ProjectMemberOrmEntity[];

    @OneToMany(() => IssueOrmEntity, (issue) => issue.project)
    issues: IssueOrmEntity[];

    @OneToMany(() => SprintOrmEntity, (sprint) => sprint.project)
    sprints: SprintOrmEntity[];

    @OneToMany(() => LabelOrmEntity, (label) => label.project)
    labels: LabelOrmEntity[];

    @OneToMany(() => VersionOrmEntity, (version) => version.project)
    versions: VersionOrmEntity[];
}