import { Inject, Injectable } from '@nestjs/common';
import type { ProjectRepositoryInterface } from '../../../domain/repositories/project.repository.interface';

@Injectable()
export class GetUserProjectsUseCase {
    constructor(
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface
    ) { }

    async execute(userId: string) {
        // Get projects where user is owner or member
        const [ownedProjects, memberProjects] = await Promise.all([
            this.projectRepository.findByOwnerId(userId),
            this.projectRepository.findByMemberId(userId)
        ]);

        // Combine and deduplicate
        const allProjects = [...ownedProjects];
        const ownedIds = new Set(ownedProjects.map(p => p.getId()));

        memberProjects.forEach(project => {
            if (!ownedIds.has(project.getId())) {
                allProjects.push(project);
            }
        });

        // Sort by last updated
        return allProjects.sort((a, b) =>
            b.getUpdatedAt().getTime() - a.getUpdatedAt().getTime()
        );
    }
}
