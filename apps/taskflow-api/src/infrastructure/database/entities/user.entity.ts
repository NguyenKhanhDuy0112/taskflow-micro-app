import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { UserRole } from '@repo/domains';
import { ProjectOrmEntity } from './project.entity';
import { ProjectMemberOrmEntity } from './project-member.entity';
import { IssueOrmEntity } from './issue.entity';
import { CommentOrmEntity } from './comment.entity';
import { WorklogOrmEntity } from './worklog.entity';

@Entity('users')
export class UserOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column({ name: 'password_hash', nullable: true })
    passwordHash: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.MEMBER,
    })
    role: UserRole;

    @Column({ nullable: true })
    avatar: string;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'email_verified', default: false })
    emailVerified: boolean;

    @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
    lastLoginAt: Date | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @OneToMany(() => ProjectOrmEntity, (project) => project.owner)
    ownedProjects: ProjectOrmEntity[];

    @OneToMany(() => ProjectMemberOrmEntity, (member) => member.user)
    projectMemberships: ProjectMemberOrmEntity[];

    @OneToMany(() => IssueOrmEntity, (issue) => issue.assignee)
    assignedIssues: IssueOrmEntity[];

    @OneToMany(() => IssueOrmEntity, (issue) => issue.reporter)
    reportedIssues: IssueOrmEntity[];

    @OneToMany(() => CommentOrmEntity, (comment) => comment.author)
    comments: CommentOrmEntity[];

    @OneToMany(() => WorklogOrmEntity, (worklog) => worklog.author)
    worklogs: WorklogOrmEntity[];
}