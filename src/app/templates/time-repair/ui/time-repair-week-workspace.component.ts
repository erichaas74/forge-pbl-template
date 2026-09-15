import { ChangeDetectionStrategy, Component, effect, inject, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import {
  RepairPreviewRuntime,
  REPAIR_PREVIEW_PERSISTENCE,
} from '../runtime/time-repair-preview.runtime';
import { BrowserRepairPreviewPersistence } from '../runtime/time-repair-preview.persistence';
import { TIME_REPAIR_CONFIG, TIME_REPAIR_SESSION } from '../runtime/time-repair.runtime';
import { RepairSceneWorkbenchComponent } from './time-repair-week-scene.component';
import { RepairTimelineWorkbenchComponent } from './time-repair-week-timeline.component';
import { RepairRippleWorkbenchComponent } from './time-repair-week-ripple.component';
import { RepairExhibitWorkbenchComponent } from './time-repair-week-exhibit.component';

@Component({
  selector: 'app-time-repair-week-workspace',
  imports: [
    RouterLink,
    RepairSceneWorkbenchComponent,
    RepairTimelineWorkbenchComponent,
    RepairRippleWorkbenchComponent,
    RepairExhibitWorkbenchComponent,
  ],
  providers: [
    RepairPreviewRuntime,
    {
      provide: REPAIR_PREVIEW_PERSISTENCE,
      useFactory: () =>
        new BrowserRepairPreviewPersistence(
          inject(TIME_REPAIR_CONFIG),
          inject(TIME_REPAIR_SESSION),
        ),
    },
  ],
  templateUrl: './time-repair-week-workspace.component.html',
  styleUrl: './time-repair-week-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRepairWeekWorkspaceComponent {
  readonly r = inject(RepairPreviewRuntime);
  private readonly focus = inject(PROJECT_LESSON_FOCUS, { optional: true });
  readonly standalone = !this.focus;
  constructor() {
    effect(() => {
      const lesson = this.focus?.();
      if (lesson && !this.r.example) untracked(() => this.r.open(lesson.number));
    });
  }
}
