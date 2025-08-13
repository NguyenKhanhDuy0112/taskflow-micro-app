import { Project, ProjectMember } from './models';
import { ProjectStatus } from './enums';

export interface ProjectFilters {
    status?: ProjectStatus;
    search?: string;
    ownerId?: string;
}

export interface ProjectContextType {
    currentProject: Project | null;
    members: ProjectMember[];
    loading: boolean;
    error: string | null;
    setCurrentProject: (project: Project | null) => void;
    refreshMembers: () => void;
}

export interface MemberPermissions {
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
    canManageMembers: boolean;
    canManageProject: boolean;
}
