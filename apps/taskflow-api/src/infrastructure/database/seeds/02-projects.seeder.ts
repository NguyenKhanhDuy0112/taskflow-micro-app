import { BaseSeeder } from './base-seeder';
import { ProjectOrmEntity } from '../entities/project.entity';
import { ProjectMemberOrmEntity, ProjectMemberRole } from '../entities/project-member.entity';
import { ProjectStatus } from '@repo/domains';

export class ProjectsSeeder extends BaseSeeder {
    async run(): Promise<void> {
        const projectRepository = this.dataSource.getRepository(ProjectOrmEntity);
        const memberRepository = this.dataSource.getRepository(ProjectMemberOrmEntity);

        // Check if projects already exist
        const existingCount = await projectRepository.count();
        if (existingCount > 0) {
            this.log('Projects already exist, skipping...');
            return;
        }

        const projects = [
            {
                id: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                name: 'TaskFlow MVP',
                key: 'TASK',
                description: 'Core project management system with drag & drop functionality',
                status: ProjectStatus.ACTIVE,
                ownerId: '11111111-1111-1111-1111-111111111111', // Admin
                issueCounter: 15,
            },
            {
                id: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                name: 'Mobile App Development',
                key: 'MOBILE',
                description: 'React Native app for TaskFlow',
                status: ProjectStatus.ACTIVE,
                ownerId: '22222222-2222-2222-2222-222222222222', // John
                issueCounter: 8,
            },
            {
                id: 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                name: 'Marketing Website',
                key: 'WEB',
                description: 'Landing page and marketing site',
                status: ProjectStatus.ON_HOLD,
                ownerId: '33333333-3333-3333-3333-333333333333', // Jane
                issueCounter: 3,
            },
        ];

        await projectRepository.save(projects);
        this.log(`Created ${projects.length} projects`);

        // Add project members
        const members = [
            // TaskFlow MVP members
            { projectId: projects[0].id, userId: '11111111-1111-1111-1111-111111111111', role: ProjectMemberRole.ADMIN },
            { projectId: projects[0].id, userId: '22222222-2222-2222-2222-222222222222', role: ProjectMemberRole.MEMBER },
            { projectId: projects[0].id, userId: '33333333-3333-3333-3333-333333333333', role: ProjectMemberRole.MEMBER },
            { projectId: projects[0].id, userId: '44444444-4444-4444-4444-444444444444', role: ProjectMemberRole.VIEWER },

            // Mobile App members
            { projectId: projects[1].id, userId: '22222222-2222-2222-2222-222222222222', role: ProjectMemberRole.ADMIN },
            { projectId: projects[1].id, userId: '33333333-3333-3333-3333-333333333333', role: ProjectMemberRole.MEMBER },

            // Marketing Website members
            { projectId: projects[2].id, userId: '33333333-3333-3333-3333-333333333333', role: ProjectMemberRole.ADMIN },
            { projectId: projects[2].id, userId: '44444444-4444-4444-4444-444444444444', role: ProjectMemberRole.VIEWER },
        ];

        await memberRepository.save(members);
        this.log(`Added ${members.length} project members`);
    }
}