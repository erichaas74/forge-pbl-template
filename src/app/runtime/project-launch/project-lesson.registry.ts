import plans from '../../projects/project-lesson-plans.json';
import {
  validateLessonPlan,
  type ProjectLessonPlan,
} from '../../shared/project-lessons/project-lesson.models';

export class ProjectLessonRegistry {
  private readonly entries = new Map<string, ProjectLessonPlan>();
  constructor(values: readonly unknown[]) {
    for (const value of values) {
      const plan = validateLessonPlan(value);
      const key = `${plan.projectId}@${plan.projectVersion}`;
      if (this.entries.has(key)) throw new Error(`LESSON_PLAN_DUPLICATE: ${key}`);
      this.entries.set(
        key,
        Object.freeze({
          ...plan,
          ...(plan.presentation ? { presentation: Object.freeze({ ...plan.presentation }) } : {}),
          evidenceCriteria: Object.freeze([...plan.evidenceCriteria]),
          lessons: Object.freeze(
            plan.lessons.map((lesson) =>
              Object.freeze({ ...lesson, criteria: Object.freeze([...lesson.criteria]) }),
            ),
          ),
        }),
      );
    }
  }

  find(projectId: string, projectVersion: string): ProjectLessonPlan | undefined {
    return this.entries.get(`${projectId}@${projectVersion}`);
  }
}

export const projectLessonRegistry = new ProjectLessonRegistry(plans);
