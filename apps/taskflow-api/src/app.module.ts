import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { ProjectModule } from './modules/project.module';
import { IssueModule } from './modules/issue.module';
import { SprintModule } from './modules/sprint.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    DatabaseModule,
    AuthModule,
    ProjectModule,
    IssueModule,
    SprintModule,
  ],
})
export class AppModule { }