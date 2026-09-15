// Temporary visual verification harness while other projects are being edited.
// Uses the actual Castle workspace, package, lesson navigation, and persistence adapter.
import { Component, computed, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import data from '../public/projects/castle-archive-rescue/project.json';
import plans from '../src/app/projects/project-lesson-plans.json';
import { requireEscapeMission } from '../src/app/templates/heist/escape/domain/escape.validation';
import { createLocalPreviewSession } from '../src/app/core/context/project-session-context';
import { validateLessonPlan, lessonNumber } from '../src/app/shared/project-lessons/project-lesson.models';
import { PROJECT_LESSON_FOCUS } from '../src/app/shared/project-lessons/project-lesson-focus';
import { ProjectLessonNavComponent } from '../src/app/shared/project-lessons/project-lesson-nav.component';
import { CurriculumDisclosureComponent } from '../src/app/shared/project-lessons/curriculum-disclosure.component';
import { ESCAPE_MISSION } from '../src/app/templates/heist/escape/runtime/escape-runtime';
import { ExpeditionWeekWorkspaceComponent } from '../src/app/templates/heist/escape/weekly/expedition-week-workspace.component';
import { ExpeditionPreviewRuntime } from '../src/app/templates/heist/escape/weekly/expedition-preview.runtime';
import { LocalExpeditionPreviewAdapter, EXPEDITION_PREVIEW_SESSION, EXPEDITION_PREVIEW_PERSISTENCE } from '../src/app/templates/heist/escape/weekly/expedition-preview.persistence';
import { ExpeditionExampleComponent } from '../src/app/templates/heist/escape/expedition/expedition-example.component';
const mission = requireEscapeMission(data);
document.title = 'Castle Rescue | Forge PBL';
const session = createLocalPreviewSession(mission.projectId, mission.projectVersion);
const plan = validateLessonPlan(plans.find(p => p.projectId === mission.projectId));
@Component({
  imports: [ProjectLessonNavComponent, CurriculumDisclosureComponent, ExpeditionWeekWorkspaceComponent, ExpeditionExampleComponent],
  providers: [
    { provide: ESCAPE_MISSION, useValue: mission },
    { provide: EXPEDITION_PREVIEW_SESSION, useValue: session },
    { provide: EXPEDITION_PREVIEW_PERSISTENCE, useFactory: () => new LocalExpeditionPreviewAdapter(session, mission) },
    ExpeditionPreviewRuntime,
    { provide: PROJECT_LESSON_FOCUS, useFactory: () => {
      const query = toSignal(inject(ActivatedRoute).queryParamMap);
      return computed(() => plan.lessons[lessonNumber(query()?.get('lesson') ?? null) - 1]);
    } },
  ],
  template: `<app-project-lesson-nav [plan]="plan" [route]="['/projects', mission.projectId, 'experience']" [selected]="focus()!.number" [finalExampleRoute]="['/projects', mission.projectId, 'final-demo']" [finalExampleActive]="example()" />
    <app-curriculum-disclosure [plan]="plan" [selected]="focus()!.number" />
    @if (example()) { <app-expedition-example /> } @else { <app-expedition-week-workspace /> }`,
})
class CastleVerificationHost {
  readonly mission = mission;
  readonly plan = plan;
  readonly focus = inject(PROJECT_LESSON_FOCUS);
  private readonly url = toSignal(inject(ActivatedRoute).url);
  readonly example = computed(() => this.url()?.at(-1)?.path === 'final-demo');
}
@Component({ selector: 'app-root', imports: [RouterOutlet], template: '<router-outlet />' })
class CastleVerificationApp {}
bootstrapApplication(CastleVerificationApp, { providers: [provideRouter([{ path: '**', component: CastleVerificationHost }])] }).catch(console.error);
