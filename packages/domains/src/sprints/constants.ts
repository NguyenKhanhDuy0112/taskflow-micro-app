import { SprintStatus } from './enums';

export const SPRINT_CONSTANTS = {
    MAX_NAME_LENGTH: 100,
    MAX_GOAL_LENGTH: 500,
    MIN_NAME_LENGTH: 3,
    DEFAULT_STATUS: SprintStatus.PLANNED,
    MIN_DURATION_DAYS: 1,
    MAX_DURATION_DAYS: 30,
    DEFAULT_DURATION_DAYS: 14,
} as const;

export const SPRINT_STATUS_CONFIG = {
    [SprintStatus.PLANNED]: {
        label: 'Planned',
        color: 'gray',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        icon: 'Calendar',
        description: 'Sprint is planned but not started'
    },
    [SprintStatus.ACTIVE]: {
        label: 'Active',
        color: 'blue',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        icon: 'Play',
        description: 'Sprint is currently running'
    },
    [SprintStatus.COMPLETED]: {
        label: 'Completed',
        color: 'green',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        icon: 'CheckCircle',
        description: 'Sprint has been completed'
    }
} as const;