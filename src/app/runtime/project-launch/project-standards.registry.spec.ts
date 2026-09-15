import { projectCatalog } from '../../projects/project-catalog';
import { projectLessonStandards } from '../../projects/project-lesson-standards';
import sourceStandards from '../../projects/forge-review-standards.json';
import { projectLessonRegistry } from './project-lesson.registry';
import { findProjectStandardsReview } from './project-standards.registry';

describe('lesson standards review coverage', () => {
  it('maps every grade 4–6 project and all eight lessons to exact same-grade source standards', () => {
    const eligible = projectCatalog.filter((project) => /^Grade [456]$/.test(project.grade));
    expect(projectLessonStandards).toHaveLength(eligible.length);
    expect(new Set(projectLessonStandards.map((review) => `${review.projectId}@${review.projectVersion}`)).size).toBe(eligible.length);
    const sources = new Map(sourceStandards.map((standard) => [standard.id, standard]));
    const used = new Set<string>();
    for (const project of eligible) {
      const plan = projectLessonRegistry.find(project.id, project.projectVersion)!;
      const review = findProjectStandardsReview(project, plan)!;
      expect(review, project.id).toBeDefined();
      expect(review.lessons.map((lesson) => lesson.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
      for (const lesson of review.lessons) {
        expect(lesson.targets.length).toBeGreaterThan(0);
        expect(new Set(lesson.targets.map((target) => target.standardId)).size).toBe(lesson.targets.length);
        for (const target of lesson.targets) {
          const source = sources.get(target.standardId)!;
          expect(source, target.standardId).toBeDefined();
          expect(source.grade).toBe(review.grade);
          expect(source.description.length).toBeGreaterThan(10);
          expect(source.sourceFile.endsWith('.csv')).toBe(true);
          expect(target.addressed.trim().length).toBeGreaterThan(10);
          expect(target.evidence.trim().length).toBeGreaterThan(10);
          used.add(target.standardId);
        }
      }
    }
    expect(used.size).toBe(sources.size);
  });

  it('does not attach review notes to older versions, other grades, or different lesson plans', () => {
    const project = projectCatalog.find((p) => p.id === 'mystery-substance')!;
    const plan = projectLessonRegistry.find(project.id, project.projectVersion)!;
    expect(findProjectStandardsReview(undefined, plan)).toBeUndefined();
    expect(findProjectStandardsReview(project, undefined)).toBeUndefined();
    expect(findProjectStandardsReview({ ...project, grade: 'Grade 7' }, plan)).toBeUndefined();
    expect(findProjectStandardsReview({ ...project, projectVersion: '99.0.0' }, plan)).toBeUndefined();
    expect(findProjectStandardsReview(project, { ...plan, planVersion: '99.0.0' })).toBeUndefined();
    for (const older of projectCatalog.filter((p) => /^Grade [78]$/.test(p.grade))) {
      expect(findProjectStandardsReview(older, projectLessonRegistry.find(older.id, older.projectVersion))).toBeUndefined();
    }
  });
});
