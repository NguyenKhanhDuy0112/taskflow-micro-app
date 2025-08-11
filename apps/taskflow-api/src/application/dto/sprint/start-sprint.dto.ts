import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartSprintDto {
    @ApiProperty({ example: '2024-01-15' })
    @IsDateString()
    startDate: string;

    @ApiProperty({ example: '2024-01-29' })
    @IsDateString()
    endDate: string;
}