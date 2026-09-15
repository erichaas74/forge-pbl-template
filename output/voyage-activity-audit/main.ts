import { Component, computed, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ActivatedRoute, RouterOutlet, provideRouter } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { JourneyPathWorkspaceComponent } from '../../src/app/templates/journey-replay/ui/journey-path-workspace.component';
import { JOURNEY_REPLAY_CONFIG, JOURNEY_REPLAY_ENROLLMENT } from '../../src/app/templates/journey-replay/runtime/journey-replay.tokens';
import { BrowserJourneyPathPersistence, JOURNEY_PATH_PERSISTENCE } from '../../src/app/templates/journey-replay/persistence/journey-path.persistence';
import { ageOfExplorationJourneyConfig as config } from '../../src/app/projects/age-of-exploration-journey/age-of-exploration-journey.config';
import { projectLessonRegistry } from '../../src/app/runtime/project-launch/project-lesson.registry';
import { ProjectLessonNavComponent } from '../../src/app/shared/project-lessons/project-lesson-nav.component';
import { CurriculumDisclosureComponent } from '../../src/app/shared/project-lessons/curriculum-disclosure.component';
import { PROJECT_LESSON_FOCUS } from '../../src/app/shared/project-lessons/project-lesson-focus';

@Component({
  selector: 'audit-page',
  imports: [JourneyPathWorkspaceComponent, ProjectLessonNavComponent, CurriculumDisclosureComponent],
  providers: [
    { provide: JOURNEY_REPLAY_CONFIG, useValue: config },
    { provide: JOURNEY_REPLAY_ENROLLMENT, useValue: { tenantId: 'voyage-review', classId: 'review', studentId: 'navigator', studentDisplayName: 'Review navigator', classLabel: 'Local review', mode: 'demo' } },
    { provide: JOURNEY_PATH_PERSISTENCE, useFactory: () => new BrowserJourneyPathPersistence() },
    { provide: PROJECT_LESSON_FOCUS, useFactory: () => inject(AuditPage).focus },
  ],
  styleUrl: '../../src/app/runtime/project-launch/project-host.component.scss',
  template: `
    <app-project-lesson-nav [plan]="plan" [route]="route" [selected]="selected()" />
    <app-curriculum-disclosure [plan]="plan" [selected]="selected()" />
    <div class="project-surface lesson-focused"><app-journey-path-workspace /></div>
  `,
})
class AuditPage {
  readonly query = toSignal(inject(ActivatedRoute).queryParamMap);
  readonly selected = computed(() => Math.max(1, Math.min(8, Number(this.query()?.get('lesson') ?? 1))));
  readonly route = ['/projects', config.projectId, 'lessons'];
  readonly plan = projectLessonRegistry.find(config.projectId, config.projectVersion)!;
  readonly focus = computed(() => this.plan.lessons[this.selected() - 1]);
}
@Component({ selector: 'app-root', imports: [RouterOutlet], template: '<router-outlet />' })
class AuditRoot {}
bootstrapApplication(AuditRoot, { providers: [provideRouter([{ path: '**', component: AuditPage }])] }).catch(console.error);
