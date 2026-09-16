import { lessonWeek, validateLessonPlan } from './project-lesson.models';
import plans from '../../projects/project-lesson-plans.json';
describe('configurable weekly sessions', () => {
  it('uses all eight explicit trading weeks while retaining paired defaults', () => {
    const plan = validateLessonPlan(plans.find((p) => p.projectId === 'frontier-trading-company'));
    expect(plan.lessons.map((l) => lessonWeek(plan, l.number))).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(lessonWeek(undefined, 7)).toBe(4);
    expect(() =>
      validateLessonPlan({ ...plan, lessons: plan.lessons.map((l) => ({ ...l, week: 9 })) }),
    ).toThrow('LESSON_PLAN_INVALID');
  });
});
