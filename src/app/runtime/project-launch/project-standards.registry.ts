import { projectLessonRegistry } from './project-lesson.registry';
import { projectLessonStandards } from '../../projects/project-lesson-standards';
import sourceStandards from '../../projects/forge-review-standards.json';
import { projectCatalog, type ProjectCatalogEntry } from '../../projects/project-catalog';
import type { ProjectLessonPlan } from '../../shared/project-lessons/project-lesson.models';
import type { ForgeReviewStandard, ProjectStandardsReview, StandardCurriculumConnection } from '../../shared/project-lessons/standards-review.models';

export const forgeReviewStandards: ReadonlyMap<string, ForgeReviewStandard> = new Map(
  sourceStandards.map((standard) => [standard.id, standard]),
);

const reviews = new Map(projectLessonStandards.map((review) => [
  `${review.projectId}@${review.projectVersion}`, review,
]));

export function findProjectStandardsReview(
  project: ProjectCatalogEntry | undefined,
  plan: ProjectLessonPlan | undefined,
): ProjectStandardsReview | undefined {
  if (!project || !plan || project.id !== plan.projectId || project.projectVersion !== plan.projectVersion) return undefined;
  const review = reviews.get(`${project.id}@${project.projectVersion}`);
  return review && review.planVersion === plan.planVersion && project.grade === `Grade ${review.grade}` ? review : undefined;
}

export const curriculumConnections: readonly StandardCurriculumConnection[] = projectCatalog.flatMap(project => {
  const plan = projectLessonRegistry.find(project.id, project.projectVersion);
  const review = findProjectStandardsReview(project, plan);
  return review && plan ? review.lessons.flatMap(lesson => lesson.targets.map(target => ({
    standardId: target.standardId,
    projectId: project.id,
    projectTitle: project.title,
    lessonNumber: lesson.number,
    lessonTitle: plan.lessons[lesson.number - 1].title,
    addressed: target.addressed,
  }))) : [];
});
