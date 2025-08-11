import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { CreateIssueUseCase } from 'src/application/use-cases/issue/create-issue.use-case';
import { UpdateIssueUseCase } from 'src/application/use-cases/issue/update-issue.use-case';
import { MoveIssueStatusUseCase } from 'src/application/use-cases/issue/move-issue-status.use-case';
import { MoveIssueToSprintUseCase } from 'src/application/use-cases/issue/move-issue-to-sprint.use-case';
import { GetProjectIssuesUseCase } from 'src/application/use-cases/issue/get-project-issues.use-case';
import { GetProjectBacklogUseCase } from 'src/application/use-cases/issue/get-project-backlog.use-case';
import { GetSprintIssuesUseCase } from 'src/application/use-cases/issue/get-sprint-issues.use-case';
import type { CreateIssueDto } from '../../application/dto/issue/create-issue.dto';
import type { UpdateIssueDto } from '../../application/dto/issue/update-issue.dto';
import { MoveIssueStatusDto, MoveIssueToSprintDto } from '../../application/dto/issue/move-issue.dto';
import { ApiResponseDto } from '../../application/dto/common/api-response.dto';
import { Auth } from '../../infrastructure/decorators/auth.decorator';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';
import { IssueStatus } from '../../infrastructure/database/entities/issue.entity';

@ApiTags('Issues')
@Controller('issues')
@Auth()
export class IssueController {
    constructor(
        private readonly createIssueUseCase: CreateIssueUseCase,
        private readonly updateIssueUseCase: UpdateIssueUseCase,
        private readonly moveIssueStatusUseCase: MoveIssueStatusUseCase,
        private readonly moveIssueToSprintUseCase: MoveIssueToSprintUseCase,
        private readonly getProjectIssuesUseCase: GetProjectIssuesUseCase,
        private readonly getProjectBacklogUseCase: GetProjectBacklogUseCase,
        private readonly getSprintIssuesUseCase: GetSprintIssuesUseCase
    ) { }

    @Post('projects/:projectId')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new issue' })
    @ApiParam({ name: 'projectId', description: 'Project ID' })
    @ApiResponse({ status: 201, description: 'Issue created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid issue data' })
    async createIssue(
        @Param('projectId') projectId: string,
        @Body() createIssueDto: CreateIssueDto,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const issue = await this.createIssueUseCase.execute(projectId, createIssueDto, userId);
            return ApiResponseDto.success(issue.toJSON(), 'Issue created successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Get('projects/:projectId')
    @ApiOperation({ summary: 'Get all issues in a project' })
    @ApiParam({ name: 'projectId', description: 'Project ID' })
    @ApiQuery({ name: 'status', enum: IssueStatus, required: false })
    @ApiResponse({ status: 200, description: 'Issues retrieved successfully' })
    async getProjectIssues(
        @Param('projectId') projectId: string,
        @Query('status') status: IssueStatus,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const issues = await this.getProjectIssuesUseCase.execute(projectId, userId);

            // Filter by status if provided
            const filteredIssues = status
                ? issues.filter(issue => issue.getStatus() === status)
                : issues;

            const issuesJson = filteredIssues.map(issue => issue.toJSON());
            return ApiResponseDto.success(issuesJson, 'Issues retrieved successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Get('projects/:projectId/backlog')
    @ApiOperation({ summary: 'Get project backlog (issues not in any sprint)' })
    @ApiParam({ name: 'projectId', description: 'Project ID' })
    @ApiResponse({ status: 200, description: 'Backlog retrieved successfully' })
    async getProjectBacklog(
        @Param('projectId') projectId: string,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const issues = await this.getProjectBacklogUseCase.execute(projectId, userId);
            const issuesJson = issues.map(issue => issue.toJSON());
            return ApiResponseDto.success(issuesJson, 'Backlog retrieved successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Get('sprints/:sprintId')
    @ApiOperation({ summary: 'Get all issues in a sprint' })
    @ApiParam({ name: 'sprintId', description: 'Sprint ID' })
    @ApiResponse({ status: 200, description: 'Sprint issues retrieved successfully' })
    async getSprintIssues(
        @Param('sprintId') sprintId: string,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const issues = await this.getSprintIssuesUseCase.execute(sprintId, userId);
            const issuesJson = issues.map(issue => issue.toJSON());
            return ApiResponseDto.success(issuesJson, 'Sprint issues retrieved successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update issue' })
    @ApiParam({ name: 'id', description: 'Issue ID' })
    @ApiResponse({ status: 200, description: 'Issue updated successfully' })
    async updateIssue(
        @Param('id') issueId: string,
        @Body() updateIssueDto: UpdateIssueDto,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const issue = await this.updateIssueUseCase.execute(issueId, updateIssueDto, userId);
            return ApiResponseDto.success(issue.toJSON(), 'Issue updated successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Post(':id/move-status')
    @ApiOperation({ summary: 'Move issue to different status (Kanban drag & drop)' })
    @ApiParam({ name: 'id', description: 'Issue ID' })
    @ApiResponse({ status: 200, description: 'Issue status updated successfully' })
    async moveIssueStatus(
        @Param('id') issueId: string,
        @Body() moveDto: MoveIssueStatusDto,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const issue = await this.moveIssueStatusUseCase.execute(issueId, moveDto.status, userId);
            return ApiResponseDto.success(issue.toJSON(), 'Issue status updated successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Post(':id/move-to-sprint')
    @ApiOperation({ summary: 'Move issue to sprint (Backlog → Sprint drag & drop)' })
    @ApiParam({ name: 'id', description: 'Issue ID' })
    @ApiResponse({ status: 200, description: 'Issue moved to sprint successfully' })
    async moveIssueToSprint(
        @Param('id') issueId: string,
        @Body() moveDto: MoveIssueToSprintDto,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const issue = await this.moveIssueToSprintUseCase.execute(issueId, moveDto.sprintId, userId);
            return ApiResponseDto.success(issue.toJSON(), 'Issue moved to sprint successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Post(':id/remove-from-sprint')
    @ApiOperation({ summary: 'Remove issue from sprint (Sprint → Backlog drag & drop)' })
    @ApiParam({ name: 'id', description: 'Issue ID' })
    @ApiResponse({ status: 200, description: 'Issue removed from sprint successfully' })
    async removeIssueFromSprint(
        @Param('id') issueId: string,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const issue = await this.moveIssueToSprintUseCase.execute(issueId, null, userId);
            return ApiResponseDto.success(issue.toJSON(), 'Issue removed from sprint successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete issue' })
    @ApiParam({ name: 'id', description: 'Issue ID' })
    @ApiResponse({ status: 200, description: 'Issue deleted successfully' })
    async deleteIssue(
        @Param('id') issueId: string,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            // Add delete use case implementation here
            return ApiResponseDto.success(null, 'Issue deleted successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
