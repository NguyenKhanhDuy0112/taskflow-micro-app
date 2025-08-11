import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../infrastructure/database/entities/user.entity';

export class AuthResponseDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    user: {
        id: string;
        email: string;
        name: string;
        role: UserRole;
        isActive: boolean;
        emailVerified: boolean;
    };

    constructor(accessToken: string, user: any) {
        this.accessToken = accessToken;
        this.user = user;
    }
}