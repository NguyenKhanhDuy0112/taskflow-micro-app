import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { IssueOrmEntity } from './issue.entity';
import { UserOrmEntity } from './user.entity';

@Entity('worklogs')
export class WorklogOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    description: string;

    @Column({ name: 'time_spent_minutes' })
    timeSpentMinutes: number;

    @Column({ name: 'work_date', type: 'date' })
    workDate: Date;

    @Column({ name: 'issue_id' })
    issueId: string;

    @Column({ name: 'author_id' })
    authorId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    // Relations
    @ManyToOne(() => IssueOrmEntity, (issue) => issue.worklogs, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'issue_id' })
    issue: IssueOrmEntity;

    @ManyToOne(() => UserOrmEntity, (user) => user.worklogs)
    @JoinColumn({ name: 'author_id' })
    author: UserOrmEntity;
}