import { BaseSeeder } from './base-seeder';
import { UserOrmEntity } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '@repo/domains';

export class UsersSeeder extends BaseSeeder {
    async run(): Promise<void> {
        const userRepository = this.dataSource.getRepository(UserOrmEntity);

        // Check if users already exist
        const existingCount = await userRepository.count();
        if (existingCount > 0) {
            this.log('Users already exist, skipping...');
            return;
        }

        const hashedPassword = await bcrypt.hash('password123', 12);

        const users = [
            {
                id: '11111111-1111-1111-1111-111111111111',
                email: 'admin@taskflow.com',
                name: 'System Administrator',
                role: UserRole.ADMIN,
                passwordHash: hashedPassword,
                isActive: true,
                emailVerified: true,
            },
            {
                id: '22222222-2222-2222-2222-222222222222',
                email: 'john.doe@taskflow.com',
                name: 'John Doe',
                role: UserRole.MEMBER,
                passwordHash: hashedPassword,
                isActive: true,
                emailVerified: true,
            },
            {
                id: '33333333-3333-3333-3333-333333333333',
                email: 'jane.smith@taskflow.com',
                name: 'Jane Smith',
                role: UserRole.MEMBER,
                passwordHash: hashedPassword,
                isActive: true,
                emailVerified: true,
            },
            {
                id: '44444444-4444-4444-4444-444444444444',
                email: 'bob.wilson@taskflow.com',
                name: 'Bob Wilson',
                role: UserRole.VIEWER,
                passwordHash: hashedPassword,
                isActive: true,
                emailVerified: true,
            },
        ];

        await userRepository.save(users);
        this.log(`Created ${users.length} users`);
    }
}