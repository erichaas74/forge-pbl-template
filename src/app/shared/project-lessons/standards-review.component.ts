import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import type { ForgeReviewStandard, ProjectStandardsReview, StandardCurriculumConnection } from './standards-review.models';
import type { ProjectLessonPlan } from './project-lesson.models';

@Component({
  selector: 'app-standards-review',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './standards-review.component.html',
  styleUrl: './standards-review.component.scss',
  host: { '[class.compact-mode]': 'compact()' },
})
export class StandardsReviewComponent {
  readonly compact = input(false);
  readonly review = input.required<ProjectStandardsReview>();
  readonly plan = input.required<ProjectLessonPlan>();
  readonly selected = input.required<number>();
  readonly standards = input.required<ReadonlyMap<string, ForgeReviewStandard>>();
  readonly connections = input<readonly StandardCurriculumConnection[]>([]);
  // Tester-only, in-memory state. No student state, storage, scoring, or progress mutations.
  private readonly checked = signal<ReadonlySet<string>>(new Set());
  readonly week = computed(() => Math.ceil(this.selected() / 2));
  readonly weekConnections = computed(() => {
    const ids = new Set(this.lessons().flatMap(entry => entry.targets.map(target => target.standardId)));
    return this.connections().filter(connection => ids.has(connection.standardId) && connection.projectId !== this.review().projectId);
  });
  readonly lessons = computed(() => this.review().lessons
    .filter((lesson) => Math.ceil(lesson.number / 2) === this.week())
    .map((lesson) => ({
      ...lesson,
      lesson: this.plan().lessons[lesson.number - 1],
      targets: lesson.targets.map((target) => ({ ...target, standard: this.standards().get(target.standardId)! })),
    })));
  readonly total = computed(() => this.lessons().reduce((count, lesson) => count + lesson.targets.length, 0));
  readonly checkedCount = computed(() => this.lessons().reduce((count, lesson) =>
    count + lesson.targets.filter((target) => this.isChecked(lesson.number, target.standardId)).length, 0));

  private key(lesson: number, id: string): string {
    return `${this.review().projectId}@${this.review().projectVersion}:${lesson}:${id}`;
  }
  isChecked(lesson: number, id: string): boolean {
    return this.checked().has(this.key(lesson, id));
  }
  toggle(lesson: number, id: string): void {
    const next = new Set(this.checked());
    const key = this.key(lesson, id);
    if (next.has(key)) next.delete(key); else next.add(key);
    this.checked.set(next);
  }
  reset(): void {
    const prefix = `${this.review().projectId}@${this.review().projectVersion}:`;
    this.checked.update((checked) => new Set([...checked].filter((key) => !key.startsWith(prefix))));
  }
}
