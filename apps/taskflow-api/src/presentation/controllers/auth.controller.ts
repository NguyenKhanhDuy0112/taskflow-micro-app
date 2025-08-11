import {
    Controller,
    Post,
    Get,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../../application/dto/auth/login.dto';
import { RegisterDto } from '../../application/dto/auth/register.dto';
import { AuthResponseDto } from '../../application/dto/auth/auth-response.dto';
import { ApiResponseDto } from '../../application/dto/common/api-response.dto';
import { Auth } from '../../infrastructure/decorators/auth.decorator';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';
import { LoginUseCase } from 'src/application/use-cases/user/auth/login.use-case';
import { RegisterUseCase } from 'src/application/use-cases/user/auth/register.use-case';
import { GetProfileUseCase } from 'src/application/use-cases/user/auth/get-profile.use-case';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase,
        private readonly getProfileUseCase: GetProfileUseCase
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Login successful', type: AuthResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid credentials' })
    async login(@Body() loginDto: LoginDto): Promise<ApiResponseDto<AuthResponseDto>> {
        try {
            const result = await this.loginUseCase.execute(loginDto);
            return ApiResponseDto.success(result, 'Login successful');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: 201, description: 'Registration successful', type: AuthResponseDto })
    @ApiBadRequestResponse({ description: 'Registration failed' })
    async register(@Body() registerDto: RegisterDto): Promise<ApiResponseDto<AuthResponseDto>> {
        try {
            const result = await this.registerUseCase.execute(registerDto);
            return ApiResponseDto.success(result, 'Registration successful');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Get('profile')
    @Auth()
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
    async getProfile(@CurrentUser('sub') userId: string): Promise<ApiResponseDto> {
        try {
            const profile = await this.getProfileUseCase.execute(userId);
            return ApiResponseDto.success(profile, 'Profile retrieved successfully');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}