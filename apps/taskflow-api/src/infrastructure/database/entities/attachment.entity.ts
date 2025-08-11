import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { IssueOrmEntity } from './issue.entity';

@Entity('attachments')
export class AttachmentOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    filename: string;

    @Column({ name: 'file_url' })
    fileUrl: string;

    @Column({ name: 'file_size' }) // bytes
    fileSize: number;

    @Column({ name: 'mime_type' })
    mimeType: string;

    @Column({ name: 'issue_id' })
    issueId: string;

    @Column({ name: 'uploaded_by' })
    uploadedBy: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    // Relations
    @ManyToOne(() => IssueOrmEntity, (issue) => issue.attachments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'issue_id' })
    issue: IssueOrmEntity;
}