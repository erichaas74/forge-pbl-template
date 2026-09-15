import { Component, computed, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ActivatedRoute, RouterOutlet, provideRouter } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DebateStudioPageComponent } from '../../src/app/templates/debate-studio/ui/debate-studio-page.component';
import { DebateStudioRuntimeService } from '../../src/app/templates/debate-studio/runtime/debate-studio-runtime.service';
import { DEBATE_STUDIO_CONFIG } from '../../src/app/templates/debate-studio/runtime/debate-studio.tokens';
import { DEBATE_STUDIO_SESSION, DEBATE_STUDIO_MEDIA, DEBATE_STUDIO_PERSISTENCE, MemoryDebateSessionAdapter, MemoryDebateMediaAdapter } from '../../src/app/templates/debate-studio/persistence/debate-studio.persistence';
import { romanSenateDebateConfig } from '../../src/app/projects/roman-senate-debate/roman-senate-debate.config';
import { projectLessonRegistry } from '../../src/app/runtime/project-launch/project-lesson.registry';
import { projectLessonStandards } from '../../src/app/projects/project-lesson-standards';
import { forgeReviewStandards, curriculumConnections } from '../../src/app/runtime/project-launch/project-standards.registry';
import { ProjectLessonNavComponent } from '../../src/app/shared/project-lessons/project-lesson-nav.component';
import { StandardsReviewComponent } from '../../src/app/shared/project-lessons/standards-review.component';
import { PROJECT_LESSON_FOCUS } from '../../src/app/shared/project-lessons/project-lesson-focus';

// Audit harness only: production components, configuration and shell styles.
// Session/media use the same memory adapters as the current local-demo launcher.
// Private draft persistence is disabled to keep the user's saved work untouched.
@Component({
  selector: 'audit-page',
  imports: [DebateStudioPageComponent, ProjectLessonNavComponent, StandardsReviewComponent],
  providers: [
    { provide: DEBATE_STUDIO_CONFIG, useValue: romanSenateDebateConfig },
    { provide: DEBATE_STUDIO_SESSION, useClass: MemoryDebateSessionAdapter },
    { provide: DEBATE_STUDIO_MEDIA, useClass: MemoryDebateMediaAdapter },
    { provide: DEBATE_STUDIO_PERSISTENCE, useValue: { load: () => undefined, save: () => {}, clear: () => {} } },
    { provide: PROJECT_LESSON_FOCUS, useFactory: () => inject(AuditPage).focus },
    DebateStudioRuntimeService,
  ],
  styleUrl: '../../src/app/runtime/project-launch/project-host.component.scss',
  template: `
    <app-project-lesson-nav [plan]="plan" [route]="route" [selected]="selected()" [finalExampleRoute]="['/projects', 'the-fate-of-the-republic', 'final-demo']" />
    <app-standards-review [review]="review" [plan]="plan" [selected]="selected()" [standards]="standards" [connections]="connections" />
    <div class="project-surface lesson-focused"><app-debate-studio-page /></div>
  `,
})
class AuditPage {
  readonly query = toSignal(inject(ActivatedRoute).queryParamMap);
  readonly selected = computed(() => Math.max(1, Math.min(8, Number(this.query()?.get('lesson') ?? 1))));
  readonly route = ['/projects', 'the-fate-of-the-republic', 'lessons'];
  readonly plan = projectLessonRegistry.find('the-fate-of-the-republic', '2.0.0')!;
  readonly focus = computed(() => this.plan.lessons[this.selected() - 1]);
  readonly review = projectLessonStandards.find(review => review.projectId === this.plan.projectId)!;
  readonly standards = forgeReviewStandards;
  readonly connections = curriculumConnections;
}

@Component({ selector: 'app-root', imports: [RouterOutlet], template: '<router-outlet />' })
class AuditRoot {}
bootstrapApplication(AuditRoot, { providers: [provideRouter([{ path: '**', component: AuditPage }])] }).catch(console.error);
