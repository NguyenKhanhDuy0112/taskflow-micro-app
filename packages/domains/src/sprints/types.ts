import { SprintStatus } from './enums';
import { Sprint } from './models';

export interface SprintFilters {
    status?: SprintStatus;
    projectId?: string;
    search?: string;
}

export interface SprintContextType {
    currentSprint: Sprint | null;
    sprints: Sprint[];
    loading: boolean;
    error: string | null;
    setCurrentSprint: (sprint: Sprint | null) => void;
    refreshSprints: () => void;
}

export interface SprintPlanningData {
    backlogIssues: any[];
    sprintIssues: any[];
    sprint: Sprint;
}