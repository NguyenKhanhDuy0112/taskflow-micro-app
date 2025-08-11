import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { IssueOrmEntity } from './issue.entity';
import { LabelOrmEntity } from './label.entity';

@Entity('issue_labels')
export class IssueLabelOrmEntity {
    @PrimaryColumn({ name: 'issue_id' })
    issueId: string;

    @PrimaryColumn({ name: 'label_id' })
    labelId: string;

    // Relations
    @ManyToOne(() => IssueOrmEntity, (issue) => issue.labels, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'issue_id' })
    issue: IssueOrmEntity;

    @ManyToOne(() => LabelOrmEntity, (label) => label.issues, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'label_id' })
    label: LabelOrmEntity;
}