import { IssueStatus, IssuePriority, IssueType } from './enums';

export const ISSUE_CONSTANTS = {
    DEFAULT_PRIORITY: IssuePriority.MEDIUM,
    DEFAULT_TYPE: IssueType.TASK,
    DEFAULT_STATUS: IssueStatus.TODO,
    MAX_TITLE_LENGTH: 255,
    MAX_DESCRIPTION_LENGTH: 2000,
    MIN_TITLE_LENGTH: 3,
    MAX_STORY_POINTS: 100,
    MIN_STORY_POINTS: 1,
} as const;

export const ISSUE_STATUS_CONFIG = {
    [IssueStatus.TODO]: {
        label: 'To Do',
        color: 'gray',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        icon: 'Circle'
    },
    [IssueStatus.IN_PROGRESS]: {
        label: 'In Progress',
        color: 'blue',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        icon: 'Clock'
    },
    [IssueStatus.IN_REVIEW]: {
        label: 'In Review',
        color: 'yellow',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        icon: 'Eye'
    },
    [IssueStatus.DONE]: {
        label: 'Done',
        color: 'green',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        icon: 'CheckCircle'
    }
} as const;

export const ISSUE_PRIORITY_CONFIG = {
    [IssuePriority.LOWEST]: {
        label: 'Lowest',
        color: 'gray',
        icon: 'ArrowDown',
        order: 1
    },
    [IssuePriority.LOW]: {
        label: 'Low',
        color: 'blue',
        icon: 'ArrowDown',
        order: 2
    },
    [IssuePriority.MEDIUM]: {
        label: 'Medium',
        color: 'yellow',
        icon: 'Minus',
        order: 3
    },
    [IssuePriority.HIGH]: {
        label: 'High',
        color: 'orange',
        icon: 'ArrowUp',
        order: 4
    },
    [IssuePriority.HIGHEST]: {
        label: 'Highest',
        color: 'red',
        icon: 'ArrowUp',
        order: 5
    }
} as const;

export const ISSUE_TYPE_CONFIG = {
    [IssueType.TASK]: {
        label: 'Task',
        color: 'blue',
        icon: 'CheckSquare'
    },
    [IssueType.BUG]: {
        label: 'Bug',
        color: 'red',
        icon: 'Bug'
    },
    [IssueType.STORY]: {
        label: 'Story',
        color: 'green',
        icon: 'BookOpen'
    },
    [IssueType.EPIC]: {
        label: 'Epic',
        color: 'purple',
        icon: 'Zap'
    },
    [IssueType.SUBTASK]: {
        label: 'Subtask',
        color: 'gray',
        icon: 'List'
    }
} as const;