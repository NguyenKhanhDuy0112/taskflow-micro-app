import { BaseSeeder } from './base-seeder';
import { IssueOrmEntity, IssueType, IssueStatus, IssuePriority } from '../entities/issue.entity';

export class IssuesSeeder extends BaseSeeder {
    async run(): Promise<void> {
        const issueRepository = this.dataSource.getRepository(IssueOrmEntity);

        const existingCount = await issueRepository.count();
        if (existingCount > 0) {
            this.log('Issues already exist, skipping...');
            return;
        }

        const issues = [
            // TaskFlow MVP - Completed Sprint Issues
            {
                id: '11111111-1111-1111-1111-111111111111',
                key: 'TASK-1',
                title: 'Setup user authentication system',
                description: 'Implement JWT-based authentication with login/register endpoints',
                type: IssueType.STORY,
                status: IssueStatus.DONE,
                priority: IssuePriority.HIGH,
                assigneeId: '22222222-2222-2222-2222-222222222222',
                reporterId: '11111111-1111-1111-1111-111111111111',
                projectId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                sprintId: '11111111-1111-1111-1111-111111111111',
                storyPoints: 8,
                resolvedAt: new Date('2024-12-10'),
            },
            {
                id: '22222222-2222-2222-2222-222222222222',
                key: 'TASK-2',
                title: 'Create project management endpoints',
                description: 'CRUD operations for projects with member management',
                type: IssueType.STORY,
                status: IssueStatus.DONE,
                priority: IssuePriority.HIGH,
                assigneeId: '33333333-3333-3333-3333-333333333333',
                reporterId: '11111111-1111-1111-1111-111111111111',
                projectId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                sprintId: '11111111-1111-1111-1111-111111111111',
                storyPoints: 5,
                resolvedAt: new Date('2024-12-12'),
            },

            // Current Sprint - In Progress
            {
                id: '33333333-3333-3333-3333-333333333333',
                key: 'TASK-3',
                title: 'Implement drag & drop for Kanban board',
                description: 'Allow users to drag issues between TODO, IN_PROGRESS, IN_REVIEW, DONE columns',
                type: IssueType.STORY,
                status: IssueStatus.IN_PROGRESS,
                priority: IssuePriority.HIGH,
                assigneeId: '22222222-2222-2222-2222-222222222222',
                reporterId: '11111111-1111-1111-1111-111111111111',
                projectId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                sprintId: '22222222-2222-2222-2222-222222222222',
                storyPoints: 13,
            },
            {
                id: '44444444-4444-4444-4444-444444444444',
                key: 'TASK-4',
                title: 'Sprint planning drag & drop',
                description: 'Drag issues from backlog to sprint during planning',
                type: IssueType.STORY,
                status: IssueStatus.TODO,
                priority: IssuePriority.MEDIUM,
                assigneeId: '33333333-3333-3333-3333-333333333333',
                reporterId: '22222222-2222-2222-2222-222222222222',
                projectId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                sprintId: '22222222-2222-2222-2222-222222222222',
                storyPoints: 8,
            },
            {
                id: '55555555-5555-5555-5555-555555555555',
                key: 'TASK-5',
                title: 'Add comments to issues',
                description: 'Allow team members to comment on issues for collaboration',
                type: IssueType.STORY,
                status: IssueStatus.IN_REVIEW,
                priority: IssuePriority.MEDIUM,
                assigneeId: '44444444-4444-4444-4444-444444444444',
                reporterId: '33333333-3333-3333-3333-333333333333',
                projectId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                sprintId: '22222222-2222-2222-2222-222222222222',
                storyPoints: 3,
            },

            // Backlog Issues
            {
                id: '66666666-6666-6666-6666-666666666666',
                key: 'TASK-6',
                title: 'Implement file attachments',
                description: 'Allow users to attach files to issues',
                type: IssueType.STORY,
                status: IssueStatus.TODO,
                priority: IssuePriority.LOW,
                assigneeId: null,
                reporterId: '11111111-1111-1111-1111-111111111111',
                projectId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                sprintId: null, // Backlog
                storyPoints: 5,
            },
            {
                id: '77777777-7777-7777-7777-777777777777',
                key: 'TASK-7',
                title: 'Fix responsive design on mobile',
                description: 'Kanban board is not responsive on mobile devices',
                type: IssueType.BUG,
                status: IssueStatus.TODO,
                priority: IssuePriority.MEDIUM,
                assigneeId: null,
                reporterId: '44444444-4444-4444-4444-444444444444',
                projectId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                sprintId: null,
                storyPoints: 2,
            },

            // Mobile App Issues
            {
                id: '88888888-8888-8888-8888-888888888888',
                key: 'MOBILE-1',
                title: 'Setup React Native project',
                description: 'Initialize React Native project with navigation',
                type: IssueType.TASK,
                status: IssueStatus.TODO,
                priority: IssuePriority.HIGH,
                assigneeId: '22222222-2222-2222-2222-222222222222',
                reporterId: '22222222-2222-2222-2222-222222222222',
                projectId: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                sprintId: null,
                storyPoints: 5,
            },
        ];

        await issueRepository.save(issues);
        this.log(`Created ${issues.length} issues`);
    }
}