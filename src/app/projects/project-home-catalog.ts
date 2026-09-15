import type { ProjectCatalogEntry } from './project-catalog';
import { projectTypeOverviews } from './project-type-overviews';

export interface ProjectHomeCard {
  readonly id: string;
  readonly projectType: string;
  readonly description: string;
  readonly demoTitle?: string;
  readonly grade?: string;
  readonly coverImage?: string;
  readonly symbol?: string;
  readonly route: string | null;
  readonly status: string;
}

// Homepage presentation only; unbuilt concepts are not registered runtime packages.
const homepageOverrides: Readonly<
  Record<string, { typeId?: string; unavailable?: boolean } | undefined>
> = {
  'shadow-gallery': { typeId: 'historical-forgery' },
  'calendar-monument': { typeId: 'astronomy-calendar-monument' },
};

const plannedTypes = [
  { id: 'engineering-design', coverImage: '/project-types/race-car-design-v1.png' },
  { id: 'research-symposium', coverImage: '/project-types/research-symposium-v1.png' },
] as const;

export function createProjectHomeCards(
  projects: readonly ProjectCatalogEntry[],
): readonly ProjectHomeCard[] {
  return [
    ...projects.map((project): ProjectHomeCard => {
      const override = homepageOverrides[project.id];
      const overview = projectTypeOverviews[override?.typeId ?? project.template.id];
      return {
        id: project.id,
        projectType: overview?.title ?? project.projectType,
        description: overview?.description ?? project.description,
        demoTitle: override?.unavailable ? undefined : project.title,
        grade: project.grade,
        coverImage: project.coverImage,
        symbol: project.symbol,
        route: override?.unavailable ? null : project.route,
        status: override?.unavailable ? 'Not built yet' : project.status,
      };
    }),
    ...plannedTypes.map((type): ProjectHomeCard => ({
      id: type.id,
      projectType: projectTypeOverviews[type.id]!.title,
      description: projectTypeOverviews[type.id]!.description,
      coverImage: type.coverImage,
      route: null,
      status: 'Not built yet',
    })),
  ];
}
