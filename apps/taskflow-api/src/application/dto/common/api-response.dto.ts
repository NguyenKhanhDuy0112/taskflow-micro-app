import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    message?: string;

    @ApiProperty()
    data?: T;

    @ApiProperty()
    error?: string;

    constructor(success: boolean, message?: string, data?: T, error?: string) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    static success<T>(data?: T, message?: string): ApiResponseDto<T> {
        return new ApiResponseDto(true, message, data);
    }

    static error(error: string, message?: string): ApiResponseDto {
        return new ApiResponseDto(false, message, undefined, error);
    }
}