import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lessonStages, lessonWeek, type ProjectLessonPlan } from './project-lesson.models';

@Component({
  selector: 'app-project-lesson-nav',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-lesson-nav.component.html',
  styleUrl: './project-lesson-nav.component.scss',
  host: { '[class.activity-first]': "plan()?.presentation?.layout === 'activity-first'" },
})
export class ProjectLessonNavComponent {
  readonly plan = input<ProjectLessonPlan>();
  readonly route = input.required<readonly string[]>();
  readonly selected = input.required<number>();
  readonly finalExampleRoute = input<readonly string[] | null>(null);
  readonly finalExampleActive = input(false);
  readonly selectedWeek = computed(() => lessonWeek(this.plan(), this.selected()));
  readonly weeks = computed(() => [...new Set(lessonStages.map((_, index) => lessonWeek(this.plan(), index + 1)))]);
  readonly weekGroups = computed(() => this.weeks().map(week => ({
    week,
    lessons: lessonStages.flatMap((stage, index) => lessonWeek(this.plan(), index + 1) === week ? [{
      number: index + 1,
      kind: this.plan()?.lessons[index]?.week ? 'Weekly session' : index % 2 === 0 ? 'Individual' : 'Group',
      title: this.plan()?.lessons[index]?.title ?? stage.label,
    }] : []),
  })));
}
