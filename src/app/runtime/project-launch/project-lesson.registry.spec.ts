import { projectCatalog } from '../../projects/project-catalog';
import plans from '../../projects/project-lesson-plans.json';
import {
  lessonNumber,
  lessonStages,
  validateLessonPlan,
} from '../../shared/project-lessons/project-lesson.models';
import { ProjectLessonRegistry, projectLessonRegistry } from './project-lesson.registry';

describe('reviewed project lesson plans', () => {
  it('covers every current catalog version with eight complete lessons and a real workspace or an explicit preview', () => {
    expect(plans).toHaveLength(projectCatalog.length);
    for (const project of projectCatalog) {
      const plan = projectLessonRegistry.find(project.id, project.projectVersion)!;
      expect(plan, project.id).toBeDefined();
      expect(plan.lessons.map((lesson) => lesson.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(new Set(plan.lessons.map((lesson) => lesson.output)).size).toBe(8);
      expect(new Set(plan.lessons.map((lesson) => lesson.checkpoint)).size).toBe(8);
      expect(Boolean(plan.workspaceView)).toBe(project.entryMode !== 'preview');
      expect(Object.isFrozen(plan.lessons[0])).toBe(true);
      expect(projectLessonRegistry.find(project.id, '99.0.0')).toBeUndefined();
    }
    expect(lessonStages.map((stage) => stage.week)).toEqual([1, 1, 2, 2, 3, 3, 4, 4]);
    expect(lessonStages.filter((stage) => stage.format === 'Live + individual')).toHaveLength(4);
  });

  it('rejects missing, duplicate, out-of-order, blank, and unsafe plan content', () => {
    const plan = plans[0];
    expect(() => new ProjectLessonRegistry([plan, plan])).toThrow('LESSON_PLAN_DUPLICATE');
    for (const invalid of [
      { ...plan, lessons: plan.lessons.slice(1) },
      { ...plan, lessons: [...plan.lessons].reverse() },
      {
        ...plan,
        lessons: plan.lessons.map((lesson, i) => (i === 1 ? { ...lesson, number: 1 } : lesson)),
      },
      {
        ...plan,
        lessons: plan.lessons.map((lesson, i) =>
          i === 2 ? { ...lesson, checkpoint: ' ' } : lesson,
        ),
      },
      { ...plan, evidenceCriteria: [] },
      {
        ...plan,
        lessons: plan.lessons.map((lesson, i) => (i === 2 ? { ...lesson, criteria: [] } : lesson)),
      },
      { ...plan, workspaceView: 'final-demo' },
      { ...plan, projectId: '../outside' },
      { ...plan, projectVersion: 'next' },
    ])
      expect(() => validateLessonPlan(invalid)).toThrow('LESSON_PLAN_INVALID');
  });

  it('normalizes invalid deep links to the first lesson', () => {
    for (const value of [null, '', '0', '9', '-1', '2.5', '02', 'NaN', '1junk'])
      expect(lessonNumber(value)).toBe(1);
    expect(lessonNumber('8')).toBe(8);
  });
});
