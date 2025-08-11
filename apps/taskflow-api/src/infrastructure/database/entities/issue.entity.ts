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
import { ProjectOrmEntity } from './project.entity';
import { SprintOrmEntity } from './sprint.entity';
import { CommentOrmEntity } from './comment.entity';
import { WorklogOrmEntity } from './worklog.entity';
import { IssueLabelOrmEntity } from './issue-label.entity';
import { AttachmentOrmEntity } from './attachment.entity';

export enum IssueType {
    TASK = 'task',
    BUG = 'bug',
    STORY = 'story',
    EPIC = 'epic',
    SUBTASK = 'subtask',
}

export enum IssueStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    IN_REVIEW = 'in_review',
    DONE = 'done',
}

export enum IssuePriority {
    LOWEST = 'lowest',
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    HIGHEST = 'highest',
}

@Entity('issues')
export class IssueOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    @Index()
    key: string; // PROJ-123

    @Column()
    title: string;

    @Column({ nullable: true, type: 'text' })
    description: string | null;

    @Column({
        type: 'enum',
        enum: IssueType,
        default: IssueType.TASK,
    })
    type: IssueType;

    @Column({
        type: 'enum',
        enum: IssueStatus,
        default: IssueStatus.TODO,
    })
    @Index()
    status: IssueStatus;

    @Column({
        type: 'enum',
        enum: IssuePriority,
        default: IssuePriority.MEDIUM,
    })
    priority: IssuePriority;

    @Column({ name: 'assignee_id', nullable: true })
    assigneeId: string | null;

    @Column({ name: 'reporter_id' })
    reporterId: string;

    @Column({ name: 'project_id' })
    @Index()
    projectId: string;

    @Column({ name: 'sprint_id', nullable: true })
    @Index()
    sprintId: string | null;

    @Column({ name: 'parent_id', nullable: true })
    parentId: string | null;

    @Column({ name: 'story_points', type: 'int', nullable: true })
    storyPoints: number | null;

    @Column({ name: 'original_estimate', type: 'int', nullable: true })
    originalEstimate: number | null;

    @Column({ name: 'remaining_estimate', type: 'int', nullable: true })
    remainingEstimate: number | null;

    @Column({ name: 'due_date', type: 'timestamp', nullable: true })
    dueDate: Date | null;

    @Column({ name: 'resolved_at', type: 'timestamp', nullable: true })
    resolvedAt: Date | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => UserOrmEntity, (user) => user.assignedIssues)
    @JoinColumn({ name: 'assignee_id' })
    assignee: UserOrmEntity;

    @ManyToOne(() => UserOrmEntity, (user) => user.reportedIssues)
    @JoinColumn({ name: 'reporter_id' })
    reporter: UserOrmEntity;

    @ManyToOne(() => ProjectOrmEntity, (project) => project.issues, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: ProjectOrmEntity;

    @ManyToOne(() => SprintOrmEntity, (sprint) => sprint.issues)
    @JoinColumn({ name: 'sprint_id' })
    sprint: SprintOrmEntity;

    @ManyToOne(() => IssueOrmEntity, (issue) => issue.subtasks)
    @JoinColumn({ name: 'parent_id' })
    parent: IssueOrmEntity;

    @OneToMany(() => IssueOrmEntity, (issue) => issue.parent)
    subtasks: IssueOrmEntity[];

    @OneToMany(() => CommentOrmEntity, (comment) => comment.issue)
    comments: CommentOrmEntity[];

    @OneToMany(() => WorklogOrmEntity, (worklog) => worklog.issue)
    worklogs: WorklogOrmEntity[];

    @OneToMany(() => IssueLabelOrmEntity, (issueLabel) => issueLabel.issue)
    labels: IssueLabelOrmEntity[];

    @OneToMany(() => AttachmentOrmEntity, (attachment) => attachment.issue)
    attachments: AttachmentOrmEntity[];
}
