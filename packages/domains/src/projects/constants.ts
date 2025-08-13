import { ProjectMemberRole, ProjectStatus } from './enums';

export const PROJECT_CONSTANTS = {
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MIN_KEY_LENGTH: 2,
    MAX_KEY_LENGTH: 10,
    DEFAULT_STATUS: ProjectStatus.ACTIVE,
    KEY_REGEX: /^[A-Z][A-Z0-9]{1,9}$/,
} as const;

export const PROJECT_STATUS_CONFIG = {
    [ProjectStatus.ACTIVE]: {
        label: 'Active',
        color: 'green',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        icon: 'Play'
    },
    [ProjectStatus.ARCHIVED]: {
        label: 'Archived',
        color: 'gray',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        icon: 'Archive'
    },
    [ProjectStatus.ON_HOLD]: {
        label: 'On Hold',
        color: 'yellow',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        icon: 'Pause'
    }
} as const;

export const PROJECT_MEMBER_ROLE_CONFIG = {
    [ProjectMemberRole.ADMIN]: {
        label: 'Admin',
        description: 'Full project access',
        color: 'red',
        permissions: ['read', 'write', 'delete', 'manage_members']
    },
    [ProjectMemberRole.MEMBER]: {
        label: 'Member',
        description: 'Can create and edit issues',
        color: 'blue',
        permissions: ['read', 'write']
    },
    [ProjectMemberRole.VIEWER]: {
        label: 'Viewer',
        description: 'Read-only access',
        color: 'gray',
        permissions: ['read']
    }
} as const;