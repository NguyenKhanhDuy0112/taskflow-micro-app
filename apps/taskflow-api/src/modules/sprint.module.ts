// apps/api/src/modules/sprint.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintOrmEntity } from '../infrastructure/database/entities/sprint.entity';
import { ProjectOrmEntity } from '../infrastructure/database/entities/project.entity';
import { ProjectMemberOrmEntity } from '../infrastructure/database/entities/project-member.entity';
import { IssueOrmEntity } from '../infrastructure/database/entities/issue.entity';
import { SprintController } from '../presentation/controllers/sprint.controller';
import { CreateSprintUseCase } from '../application/use-cases/sprint/create-sprint.use-case';
import { StartSprintUseCase } from '../application/use-cases/sprint/start-sprint.use-case';
import { CompleteSprintUseCase } from '../application/use-cases/sprint/complete-sprint.use-case';
import { GetProjectSprintsUseCase } from '../application/use-cases/sprint/get-project-sprints.use-case';
import { GetActiveSprintUseCase } from '../application/use-cases/sprint/get-active-sprint.use-case';
import { SprintRepository } from '../infrastructure/repositories/sprint.repository';
import { ProjectRepository } from '../infrastructure/repositories/project.repository';
import { ProjectMemberRepository } from '../infrastructure/repositories/project-member.repository';
import { IssueRepository } from '../infrastructure/repositories/issue.repository';

import { AuthModule } from './auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SprintOrmEntity,
            ProjectOrmEntity,
            ProjectMemberOrmEntity,
            IssueOrmEntity,
        ]),
        AuthModule
    ],
    controllers: [SprintController],
    providers: [
        // Use Cases
        CreateSprintUseCase,
        StartSprintUseCase,
        CompleteSprintUseCase,
        GetProjectSprintsUseCase,
        GetActiveSprintUseCase,

        SprintRepository,
        ProjectRepository,
        ProjectMemberRepository,
        IssueRepository,

        // Provide interfaces
        {
            provide: 'SprintRepositoryInterface',
            useExisting: SprintRepository,
        },
        {
            provide: 'ProjectRepositoryInterface',
            useExisting: ProjectRepository,
        },
        {
            provide: 'ProjectMemberRepositoryInterface',
            useExisting: ProjectMemberRepository,
        },
        {
            provide: 'IssueRepositoryInterface',
            useExisting: IssueRepository,
        },
    ],
    exports: [
        'SprintRepositoryInterface',
    ],
})
export class SprintModule { }