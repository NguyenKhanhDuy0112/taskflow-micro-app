import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException, EntityNotFoundException } from '../exceptions/domain.exception';
import { ApiResponseDto } from '../../application/dto/common/api-response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        } else if (exception instanceof EntityNotFoundException) {
            status = HttpStatus.NOT_FOUND;
            message = exception.message;
        } else if (exception instanceof DomainException) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.message;
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        const errorResponse = ApiResponseDto.error(message);

        response.status(status).json(errorResponse);
    }
}