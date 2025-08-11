import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST', 'localhost'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get<string>('DB_USERNAME', 'postgres'),
                password: configService.get<string>('DB_PASSWORD', 'password'),
                database: configService.get<string>('DB_NAME', 'taskflow'),
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
                ], // Only entity classes, no enums!
                synchronize: configService.get('NODE_ENV') === 'development', // Only in dev
                logging: configService.get('NODE_ENV') === 'development',
                migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
                migrationsRun: false,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }