import { UserRole } from './enums';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    name: string;
    password: string;
    role?: UserRole;
}

export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: UserRole;
        isActive: boolean;
        emailVerified: boolean;
    };
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserRequest {
    email: string;
    name: string;
    role?: UserRole;
    avatar?: string;
}

export interface UpdateUserRequest {
    name?: string;
    role?: UserRole;
    avatar?: string;
}
