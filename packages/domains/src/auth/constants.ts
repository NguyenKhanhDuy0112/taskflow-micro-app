import { UserRole } from "./enums";

export const AUTH_CONSTANTS = {
    TOKEN_KEY: 'auth_token',
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 128,
    SESSION_TIMEOUT: 7 * 24 * 60 * 60 * 1000, // 7 days
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
} as const;

export const USER_ROLE_CONFIG = {
    [UserRole.ADMIN]: {
        label: 'Administrator',
        description: 'Full access to all features',
        color: 'red'
    },
    [UserRole.MEMBER]: {
        label: 'Member',
        description: 'Can create and manage projects',
        color: 'blue'
    },
    [UserRole.VIEWER]: {
        label: 'Viewer',
        description: 'Read-only access',
        color: 'gray'
    }
} as const;