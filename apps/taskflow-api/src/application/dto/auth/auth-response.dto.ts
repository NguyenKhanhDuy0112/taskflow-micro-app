import { ApiProperty } from '@nestjs/swagger';
import { AuthResponse, UserRole } from '@repo/domains';

export class AuthResponseDto implements AuthResponse {
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