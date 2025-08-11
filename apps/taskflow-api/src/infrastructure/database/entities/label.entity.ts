import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Unique,
} from 'typeorm';
import { ProjectOrmEntity } from './project.entity';
import { IssueLabelOrmEntity } from './issue-label.entity';

@Entity('labels')
@Unique(['name', 'projectId'])
export class LabelOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ default: '#808080' }) // Hex color
    color: string;

    @Column({ nullable: true })
    description: string;

    @Column({ name: 'project_id' })
    projectId: string;

    // Relations
    @ManyToOne(() => ProjectOrmEntity, (project) => project.labels, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: ProjectOrmEntity;

    @OneToMany(() => IssueLabelOrmEntity, (issueLabel) => issueLabel.label)
    issues: IssueLabelOrmEntity[];
}