import { DataSource } from 'typeorm';
import { UsersSeeder } from './01-users.seeder';
import { ProjectsSeeder } from './02-projects.seeder';
import { SprintsSeeder } from './03-sprints.seeder';
import { IssuesSeeder } from './04-issues.seeder';

export class DatabaseSeeder {
    constructor(private dataSource: DataSource) { }

    async run(): Promise<void> {
        console.log('🌱 Starting database seeding...\n');

        const seeders = [
            new UsersSeeder(this.dataSource),
            new ProjectsSeeder(this.dataSource),
            new SprintsSeeder(this.dataSource),
            new IssuesSeeder(this.dataSource),
        ];

        for (const seeder of seeders) {
            await seeder.run();
        }

        console.log('\n✅ Database seeding completed!');
        console.log('\n📊 Sample Data Created:');
        console.log('   👥 4 Users (admin, john, jane, bob)');
        console.log('   📁 3 Projects (TaskFlow MVP, Mobile App, Marketing)');
        console.log('   🏃 4 Sprints (1 completed, 1 active, 2 planned)');
        console.log('   🎫 8 Issues (with different statuses for testing)');
        console.log('\n🔐 Login Credentials:');
        console.log('   admin@taskflow.com / password123');
        console.log('   john.doe@taskflow.com / password123');
        console.log('   jane.smith@taskflow.com / password123');
        console.log('   bob.wilson@taskflow.com / password123');
    }
}