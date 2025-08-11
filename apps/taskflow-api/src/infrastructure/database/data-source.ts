import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import {
    UserOrmEntity,
    ProjectOrmEntity,
    ProjectMemberOrmEntity,
    IssueOrmEntity,
    SprintOrmEntity,
    LabelOrmEntity,
    IssueLabelOrmEntity,
    CommentOrmEntity,
    WorklogOrmEntity,
    AttachmentOrmEntity,
    VersionOrmEntity,
} from './entities';

// Load environment variables
config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'taskflow',
    entities: [
        UserOrmEntity,
        ProjectOrmEntity,
        ProjectMemberOrmEntity,
        IssueOrmEntity,
        SprintOrmEntity,
        LabelOrmEntity,
        IssueLabelOrmEntity,
        CommentOrmEntity,
        WorklogOrmEntity,
        AttachmentOrmEntity,
        VersionOrmEntity,
    ],
    migrations: ['src/infrastructure/database/migrations/*{.ts,.js}'],
    synchronize: false, // Use migrations in production
    logging: process.env.NODE_ENV === 'development',
});