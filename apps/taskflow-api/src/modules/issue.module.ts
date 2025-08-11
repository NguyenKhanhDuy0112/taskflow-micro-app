import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueOrmEntity } from '../infrastructure/database/entities/issue.entity';
import { ProjectOrmEntity } from '../infrastructure/database/entities/project.entity';
import { ProjectMemberOrmEntity } from '../infrastructure/database/entities/project-member.entity';
import { UserOrmEntity } from '../infrastructure/database/entities/user.entity';
import { IssueController } from '../presentation/controllers/issue.controller';
import { IssueRepository } from '../infrastructure/repositories/issue.repository';
import { ProjectRepository } from '../infrastructure/repositories/project.repository';
import { ProjectMemberRepository } from '../infrastructure/repositories/project-member.repository';
import { AuthUserRepository } from '../infrastructure/repositories/auth-user.repository';
import { CreateIssueUseCase } from '../application/use-cases/issue/create-issue.use-case';
import { UpdateIssueUseCase } from '../application/use-cases/issue/update-issue.use-case';
import { MoveIssueToSprintUseCase } from '../application/use-cases/issue/move-issue-to-sprint.use-case';
import { MoveIssueStatusUseCase } from '../application/use-cases/issue/move-issue-status.use-case';
import { GetProjectIssuesUseCase } from '../application/use-cases/issue/get-project-issues.use-case';
import { GetProjectBacklogUseCase } from '../application/use-cases/issue/get-project-backlog.use-case';
import { GetSprintIssuesUseCase } from '../application/use-cases/issue/get-sprint-issues.use-case';

import { AuthModule } from './auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            IssueOrmEntity,
            ProjectOrmEntity,
            ProjectMemberOrmEntity,
            UserOrmEntity,
        ]),
        AuthModule
    ],
    controllers: [IssueController],
    providers: [
        // Use Cases
        CreateIssueUseCase,
        UpdateIssueUseCase,
        MoveIssueStatusUseCase,
        MoveIssueToSprintUseCase,
        GetProjectIssuesUseCase,
        GetProjectBacklogUseCase,
        GetSprintIssuesUseCase,

        IssueRepository,
        ProjectRepository,
        ProjectMemberRepository,
        AuthUserRepository,

        //provide interfaces
        {
            provide: 'IssueRepositoryInterface',
            useExisting: IssueRepository,
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
            provide: 'AuthUserRepositoryInterface',
            useExisting: AuthUserRepository,
        },
    ],
    exports: [
        'IssueRepositoryInterface',
    ],
})
export class IssueModule { }