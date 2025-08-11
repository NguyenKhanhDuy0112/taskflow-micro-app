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
} from '@nestjs/swagger';
import { CreateProjectUseCase } from '../../application/use-cases/project/create-project.use-case';
import { GetProjectUseCase } from '../../application/use-cases/project/get-project.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/project/update-project.use-case';
import { GetUserProjectsUseCase } from '../../application/use-cases/project/get-user-projects.use-case';
import { AddMemberUseCase } from '../../application/use-cases/project/add-member.use-case';
import { RemoveMemberUseCase } from '../../application/use-cases/project/remove-member.use-case';
import { GetProjectMembersUseCase } from '../../application/use-cases/project/get-project-members.use-case';
import { CreateProjectDto } from '../../application/dto/project/create-project.dto';
import { UpdateProjectDto } from '../../application/dto/project/update-project.dto';
import { AddMemberDto } from '../../application/dto/project/add-member.dto';
import { ApiResponseDto } from '../../application/dto/common/api-response.dto';
import { Auth } from '../../infrastructure/decorators/auth.decorator';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';

@ApiTags('Projects')
@Controller('projects')
@Auth()
export class ProjectController {
    constructor(
        private readonly createProjectUseCase: CreateProjectUseCase,
        private readonly getProjectUseCase: GetProjectUseCase,
        private readonly updateProjectUseCase: UpdateProjectUseCase,
        private readonly getUserProjectsUseCase: GetUserProjectsUseCase,
        private readonly addMemberUseCase: AddMemberUseCase,
        private readonly removeMemberUseCase: RemoveMemberUseCase,
        private readonly getProjectMembersUseCase: GetProjectMembersUseCase
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new project' })
    @ApiResponse({ status: 201, description: 'Project created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid project data' })
    async createProject(
        @Body() createProjectDto: CreateProjectDto,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const project = await this.createProjectUseCase.execute(createProjectDto, userId);
            return ApiResponseDto.success(project.toJSON(), 'Project created successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get user projects' })
    @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
    async getUserProjects(
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const projects = await this.getUserProjectsUseCase.execute(userId);
            const projectsJson = projects.map(p => p.toJSON());
            return ApiResponseDto.success(projectsJson, 'Projects retrieved successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get project by ID' })
    @ApiParam({ name: 'id', description: 'Project ID' })
    @ApiResponse({ status: 200, description: 'Project retrieved successfully' })
    async getProject(
        @Param('id') projectId: string,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const project = await this.getProjectUseCase.execute(projectId, userId);
            return ApiResponseDto.success(project.toJSON(), 'Project retrieved successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update project' })
    @ApiParam({ name: 'id', description: 'Project ID' })
    @ApiResponse({ status: 200, description: 'Project updated successfully' })
    async updateProject(
        @Param('id') projectId: string,
        @Body() updateProjectDto: UpdateProjectDto,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const project = await this.updateProjectUseCase.execute(projectId, updateProjectDto, userId);
            return ApiResponseDto.success(project.toJSON(), 'Project updated successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Get(':id/members')
    @ApiOperation({ summary: 'Get project members' })
    @ApiParam({ name: 'id', description: 'Project ID' })
    @ApiResponse({ status: 200, description: 'Members retrieved successfully' })
    async getProjectMembers(
        @Param('id') projectId: string,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const members = await this.getProjectMembersUseCase.execute(projectId, userId);
            const membersJson = members.map(m => m.toJSON());
            return ApiResponseDto.success(membersJson, 'Members retrieved successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Post(':id/members')
    @ApiOperation({ summary: 'Add member to project' })
    @ApiParam({ name: 'id', description: 'Project ID' })
    @ApiResponse({ status: 201, description: 'Member added successfully' })
    async addMember(
        @Param('id') projectId: string,
        @Body() addMemberDto: AddMemberDto,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            const member = await this.addMemberUseCase.execute(projectId, addMemberDto, userId);
            return ApiResponseDto.success(member.toJSON(), 'Member added successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Delete(':id/members/:memberId')
    @ApiOperation({ summary: 'Remove member from project' })
    @ApiParam({ name: 'id', description: 'Project ID' })
    @ApiParam({ name: 'memberId', description: 'User ID to remove' })
    @ApiResponse({ status: 200, description: 'Member removed successfully' })
    async removeMember(
        @Param('id') projectId: string,
        @Param('memberId') memberId: string,
        @CurrentUser('sub') userId: string
    ): Promise<ApiResponseDto> {
        try {
            await this.removeMemberUseCase.execute(projectId, memberId, userId);
            return ApiResponseDto.success(null, 'Member removed successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
