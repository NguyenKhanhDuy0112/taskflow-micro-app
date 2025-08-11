// apps/api/src/modules/project.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectOrmEntity } from '../infrastructure/database/entities/project.entity';
import { ProjectMemberOrmEntity } from '../infrastructure/database/entities/project-member.entity';
import { UserOrmEntity } from '../infrastructure/database/entities/user.entity';

// Controllers
import { ProjectController } from '../presentation/controllers/project.controller';

// Use Cases
import { CreateProjectUseCase } from '../application/use-cases/project/create-project.use-case';
import { GetProjectUseCase } from '../application/use-cases/project/get-project.use-case';
import { UpdateProjectUseCase } from '../application/use-cases/project/update-project.use-case';
import { GetUserProjectsUseCase } from '../application/use-cases/project/get-user-projects.use-case';
import { AddMemberUseCase } from '../application/use-cases/project/add-member.use-case';
import { RemoveMemberUseCase } from '../application/use-cases/project/remove-member.use-case';
import { GetProjectMembersUseCase } from '../application/use-cases/project/get-project-members.use-case';

// Repositories
import { ProjectRepository } from '../infrastructure/repositories/project.repository';
import { ProjectMemberRepository } from '../infrastructure/repositories/project-member.repository';
import { AuthUserRepository } from '../infrastructure/repositories/auth-user.repository';

import { AuthModule } from './auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProjectOrmEntity,
            ProjectMemberOrmEntity,
            UserOrmEntity,
        ]),
        AuthModule
    ],
    controllers: [ProjectController],
    providers: [
        // Use Cases
        CreateProjectUseCase,
        GetProjectUseCase,
        UpdateProjectUseCase,
        GetUserProjectsUseCase,
        AddMemberUseCase,
        RemoveMemberUseCase,
        GetProjectMembersUseCase,

        // Repositories with proper token injection
        ProjectRepository,
        {
            provide: 'ProjectRepositoryInterface',
            useExisting: ProjectRepository,
        },
        ProjectMemberRepository,
        {
            provide: 'ProjectMemberRepositoryInterface',
            useExisting: ProjectMemberRepository,
        },
        AuthUserRepository,
        {
            provide: 'AuthUserRepositoryInterface',
            useExisting: AuthUserRepository,
        },
    ],
    exports: [
        'ProjectRepositoryInterface',
        'ProjectMemberRepositoryInterface',
    ],
})
export class ProjectModule { }