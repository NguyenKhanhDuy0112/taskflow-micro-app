import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
} from 'typeorm';
import { UserOrmEntity } from './user.entity';
import { ProjectOrmEntity } from './project.entity';

export enum ProjectMemberRole {
    ADMIN = 'admin',
    MEMBER = 'member',
    VIEWER = 'viewer',
}

@Entity('project_members')
@Unique(['projectId', 'userId'])
export class ProjectMemberOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'project_id' })
    projectId: string;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({
        type: 'enum',
        enum: ProjectMemberRole,
        default: ProjectMemberRole.MEMBER,
    })
    role: ProjectMemberRole;

    @CreateDateColumn({ name: 'joined_at' })
    joinedAt: Date;

    // Relations
    @ManyToOne(() => ProjectOrmEntity, (project) => project.members, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: ProjectOrmEntity;

    @ManyToOne(() => UserOrmEntity, (user) => user.projectMemberships, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: UserOrmEntity;
}