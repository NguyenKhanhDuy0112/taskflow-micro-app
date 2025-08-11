import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { IssueOrmEntity } from './issue.entity';
import { UserOrmEntity } from './user.entity';

@Entity('comments')
export class CommentOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ name: 'issue_id' })
    issueId: string;

    @Column({ name: 'author_id' })
    authorId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => IssueOrmEntity, (issue) => issue.comments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'issue_id' })
    issue: IssueOrmEntity;

    @ManyToOne(() => UserOrmEntity, (user) => user.comments)
    @JoinColumn({ name: 'author_id' })
    author: UserOrmEntity;
}