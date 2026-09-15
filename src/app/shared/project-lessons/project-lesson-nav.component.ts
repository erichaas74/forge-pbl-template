import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lessonStages, type ProjectLessonPlan } from './project-lesson.models';

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
  readonly weeks = [1, 2, 3, 4];
  readonly selectedWeek = computed(() => Math.ceil(this.selected() / 2));
  readonly weekGroups = computed(() => this.weeks.map(week => ({
    week,
    lessons: lessonStages.flatMap((stage, index) => stage.week === week ? [{
      number: index + 1,
      kind: index % 2 === 0 ? 'Individual' : 'Group',
      title: this.plan()?.lessons[index]?.title ?? stage.label,
    }] : []),
  })));
}
