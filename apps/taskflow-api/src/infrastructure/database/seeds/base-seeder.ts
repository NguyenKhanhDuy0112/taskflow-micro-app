import { DataSource } from 'typeorm';

export abstract class BaseSeeder {
    constructor(protected dataSource: DataSource) { }

    abstract run(): Promise<void>;

    protected async clearTable(tableName: string): Promise<void> {
        await this.dataSource.query(`DELETE FROM ${tableName}`);
        console.log(`✅ Cleared table: ${tableName}`);
    }

    protected log(message: string): void {
        console.log(`🌱 ${message}`);
    }
}