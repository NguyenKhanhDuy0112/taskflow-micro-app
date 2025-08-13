import { BaseSeeder } from './base-seeder';
import { SprintOrmEntity } from '../entities/sprint.entity';
import { SprintStatus } from '@repo/domains';

export class SprintsSeeder extends BaseSeeder {
    async run(): Promise<void> {
        const sprintRepository = this.dataSource.getRepository(SprintOrmEntity);

        const existingCount = await sprintRepository.count();
        if (existingCount > 0) {
            this.log('Sprints already exist, skipping...');
            return;
        }

        const now = new Date();
        const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

        const sprints = [
            {
                id: '11111111-1111-1111-1111-111111111111',
                name: 'Sprint 1 - Foundation',
                goal: 'Setup core authentication and project management',
                projectId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // TaskFlow MVP
                status: SprintStatus.COMPLETED,
                startDate: new Date('2024-12-01'),
                endDate: new Date('2024-12-14'),
            },
            {
                id: '22222222-2222-2222-2222-222222222222',
                name: 'Sprint 2 - Issues & Drag Drop',
                goal: 'Implement issue tracking with drag & drop functionality',
                projectId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                status: SprintStatus.ACTIVE,
                startDate: new Date('2024-12-15'),
                endDate: oneWeekFromNow,
            },
            {
                id: '33333333-3333-3333-3333-333333333333',
                name: 'Sprint 3 - Reports & Analytics',
                goal: 'Add burndown charts and sprint reports',
                projectId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
                status: SprintStatus.PLANNED,
                startDate: oneWeekFromNow,
                endDate: twoWeeksFromNow,
            },
            {
                id: '44444444-4444-4444-4444-444444444444',
                name: 'Mobile Sprint 1',
                goal: 'Setup React Native foundation',
                projectId: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // Mobile App
                status: SprintStatus.PLANNED,
                startDate: null,
                endDate: null,
            },
        ];

        await sprintRepository.save(sprints);
        this.log(`Created ${sprints.length} sprints`);
    }
}