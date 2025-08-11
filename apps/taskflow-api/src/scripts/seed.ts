import { AppDataSource } from '../infrastructure/database/data-source';
import { DatabaseSeeder } from '../infrastructure/database/seeds';

async function runSeeder() {
    try {
        console.log('🔌 Connecting to database...');
        await AppDataSource.initialize();

        const seeder = new DatabaseSeeder(AppDataSource);
        await seeder.run();

        await AppDataSource.destroy();
        console.log('\n🔌 Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

runSeeder();