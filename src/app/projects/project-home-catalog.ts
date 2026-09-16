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
  Record<string, { typeId?: string; demoTitle?: string; unavailable?: boolean } | undefined>
> = {
  'expedition-news-network': { demoTitle: 'Endurance Expedition: Survival Newsroom' },
  'hammurabi-on-trial': { demoTitle: 'Hammurabi on Trial: Laws of Ancient Mesopotamia' },
  'exploration-time-repair': { demoTitle: 'Time Repair: Gutenberg & the Reformation' },
  'community-story-network': { demoTitle: 'Community Journalism: Real Stories, Real Voices' },
  'shadow-gallery': {
    typeId: 'historical-forgery',
    demoTitle: 'Age of Exploration: The Art Forgery Hunt',
  },
  'castle-archive-rescue': { demoTitle: 'Castle Animal Rescue: Fractions & Decimals' },
  'championship-show': { demoTitle: 'Math Championship: Decimals & Unit Prices' },
  'live-strategy-league': { demoTitle: 'Market Strategy League: Costs, Demand & Profit' },
  'cascade-bay-crisis': { demoTitle: 'Cascade Bay: Floods & Earth Systems' },
  'robot-delivery-code-lab': { demoTitle: 'Robot Delivery: Geometry, Loops & Code' },
  'mystery-substance': { demoTitle: 'Mystery Substances: Properties & Reactions' },
  'frontier-trading-company': { demoTitle: 'Frontier Trading: Decimals, Costs & Profit' },
  'objects-that-changed-us': { demoTitle: 'Ancient Egypt: Artifacts & Museum Discoveries' },
  'history-live-revolutionary-war': { demoTitle: 'Revolutionary War: Live from the Newsroom' },
  'the-fate-of-the-republic': { demoTitle: 'Rome on Trial: The Fall of the Republic' },
  'race-around-the-world': { demoTitle: 'Age of Exploration: Chart an Atlantic Voyage' },
  'survival-island-story-lab': { demoTitle: 'Survival Island: Choices, Characters & Consequences' },
  'calendar-monument': {
    typeId: 'astronomy-calendar-monument',
    demoTitle: 'Sun Monuments: Shadows, Seasons & Earth’s Tilt',
  },
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
        demoTitle: override?.unavailable ? undefined : (override?.demoTitle ?? project.title),
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
