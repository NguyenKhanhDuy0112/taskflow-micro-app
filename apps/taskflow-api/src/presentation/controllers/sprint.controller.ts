import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiParam,
} from '@nestjs/swagger';
import { CreateSprintUseCase } from '../../application/use-cases/sprint/create-sprint.use-case';
import { StartSprintUseCase } from '../../application/use-cases/sprint/start-sprint.use-case';
import { CompleteSprintUseCase } from '../../application/use-cases/sprint/complete-sprint.use-case';
import { GetProjectSprintsUseCase } from '../../application/use-cases/sprint/get-project-sprints.use-case';
import { GetActiveSprintUseCase } from '../../application/use-cases/sprint/get-active-sprint.use-case';
import type { CreateSprintDto } from '../../application/dto/sprint/create-sprint.dto';
import { StartSprintDto } from '../../application/dto/sprint/start-sprint.dto';
import { ApiResponseDto } from '../../application/dto/common/api-response.dto';
import { Auth } from '../../infrastructure/decorators/auth.decorator';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';

@ApiTags('Sprints')
@Controller('sprints')
@Auth()
export class SprintController {
    constructor(
        private readonly createSprintUseCase: CreateSprintUseCase,
        private readonly startSprintUseCase: StartSprintUseCase,
        private readonly completeSprintUseCase: CompleteSprintUseCase,
        private readonly getProjectSprintsUseCase: GetProjectSprintsUseCase,
        private readonly getActiveSprintUseCase: GetActiveSprintUseCase
    ) { }

    @Post('projects/:projectId')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new sprint' })
    @ApiParam({ name: 'projectId', description: 'Project ID' })
    @ApiResponse({ status: 201, description: 'Sprint created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid sprint data' })
    async createSprint(
        @Param('projectId') projectId: string,
        @Body() createSprintDto: CreateSprintDto,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const sprint = await this.createSprintUseCase.execute(projectId, createSprintDto, userId);
            return ApiResponseDto.success(sprint.toJSON(), 'Sprint created successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Get('projects/:projectId')
    @ApiOperation({ summary: 'Get all sprints in a project' })
    @ApiParam({ name: 'projectId', description: 'Project ID' })
    @ApiResponse({ status: 200, description: 'Sprints retrieved successfully' })
    async getProjectSprints(
        @Param('projectId') projectId: string,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const sprints = await this.getProjectSprintsUseCase.execute(projectId, userId);
            const sprintsJson = sprints.map(sprint => sprint.toJSON());
            return ApiResponseDto.success(sprintsJson, 'Sprints retrieved successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Get('projects/:projectId/active')
    @ApiOperation({ summary: 'Get active sprint in a project' })
    @ApiParam({ name: 'projectId', description: 'Project ID' })
    @ApiResponse({ status: 200, description: 'Active sprint retrieved successfully' })
    async getActiveSprint(
        @Param('projectId') projectId: string,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const sprint = await this.getActiveSprintUseCase.execute(projectId, userId);
            return ApiResponseDto.success(
                sprint ? sprint.toJSON() : null,
                sprint ? 'Active sprint retrieved successfully' : 'No active sprint found'
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Post(':id/start')
    @ApiOperation({ summary: 'Start a sprint' })
    @ApiParam({ name: 'id', description: 'Sprint ID' })
    @ApiResponse({ status: 200, description: 'Sprint started successfully' })
    async startSprint(
        @Param('id') sprintId: string,
        @Body() startSprintDto: StartSprintDto,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const sprint = await this.startSprintUseCase.execute(sprintId, startSprintDto, userId);
            return ApiResponseDto.success(sprint.toJSON(), 'Sprint started successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Post(':id/complete')
    @ApiOperation({ summary: 'Complete a sprint' })
    @ApiParam({ name: 'id', description: 'Sprint ID' })
    @ApiResponse({ status: 200, description: 'Sprint completed successfully' })
    async completeSprint(
        @Param('id') sprintId: string,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const result = await this.completeSprintUseCase.execute(sprintId, userId);
            return ApiResponseDto.success(
                {
                    sprint: result.sprint.toJSON(),
                    statistics: {
                        completedIssues: result.completedIssues,
                        incompletedIssues: result.incompletedIssues,
                        completionRate: Math.round((result.completedIssues / (result.completedIssues + result.incompletedIssues)) * 100) || 0
                    }
                },
                'Sprint completed successfully'
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }
}