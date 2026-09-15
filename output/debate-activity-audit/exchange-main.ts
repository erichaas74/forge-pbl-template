import { Component, computed, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ActivatedRoute, RouterOutlet, provideRouter } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DebateExchangeComponent } from '../../src/app/templates/debate-studio/exchange/debate-exchange.component';
import { DebateExchangeRuntime } from '../../src/app/templates/debate-studio/exchange/debate-exchange-runtime.service';
import { BrowserDebateExchangeAdapter, DEBATE_EXCHANGE_PORT } from '../../src/app/templates/debate-studio/exchange/debate-exchange.persistence';
import { DEBATE_STUDIO_CONFIG } from '../../src/app/templates/debate-studio/runtime/debate-studio.tokens';
import { romanSenateDebateConfig } from '../../src/app/projects/roman-senate-debate/roman-senate-debate.config';
import { hammurabiOnTrialConfig } from '../../src/app/projects/hammurabi-on-trial/hammurabi-on-trial.config';
import { projectLessonRegistry } from '../../src/app/runtime/project-launch/project-lesson.registry';
import { projectLessonStandards } from '../../src/app/projects/project-lesson-standards';
import { forgeReviewStandards, curriculumConnections } from '../../src/app/runtime/project-launch/project-standards.registry';
import { ProjectLessonNavComponent } from '../../src/app/shared/project-lessons/project-lesson-nav.component';
import { StandardsReviewComponent } from '../../src/app/shared/project-lessons/standards-review.component';
import { PROJECT_LESSON_FOCUS } from '../../src/app/shared/project-lessons/project-lesson-focus';

// Production components and curriculum, audit-only storage scope.
const config = location.pathname.includes('hammurabi-on-trial') ? hammurabiOnTrialConfig : romanSenateDebateConfig;
@Component({
  selector: 'audit-page',
  imports: [DebateExchangeComponent, ProjectLessonNavComponent, StandardsReviewComponent],
  providers: [
    { provide: DEBATE_STUDIO_CONFIG, useValue: config },
    { provide: DEBATE_EXCHANGE_PORT, useFactory: () => new BrowserDebateExchangeAdapter(config, { tenantId: 'debate-audit-2026-09-15', projectId: config.projectId, projectVersion: config.projectVersion, classId: 'audit-class', actorId: config.viewer.studentId }) },
    { provide: PROJECT_LESSON_FOCUS, useFactory: () => inject(AuditPage).focus },
    DebateExchangeRuntime,
  ],
  styleUrl: '../../src/app/runtime/project-launch/project-host.component.scss',
  template: `
    <app-project-lesson-nav [plan]="plan" [route]="route" [selected]="selected()" />
    <app-standards-review [review]="review" [plan]="plan" [selected]="selected()" [standards]="standards" [connections]="connections" [compact]="true" />
    <div class="project-surface lesson-focused"><app-debate-exchange /></div>
  `,
})
class AuditPage {
  readonly query = toSignal(inject(ActivatedRoute).queryParamMap);
  readonly selected = computed(() => Math.max(1, Math.min(8, Number(this.query()?.get('lesson') ?? 1))));
  readonly route = ['/projects', config.projectId, 'lessons'];
  readonly plan = projectLessonRegistry.find(config.projectId, config.projectVersion)!;
  readonly focus = computed(() => this.plan.lessons[this.selected() - 1]);
  readonly review = projectLessonStandards.find(review => review.projectId === this.plan.projectId)!;
  readonly standards = forgeReviewStandards;
  readonly connections = curriculumConnections;
}
@Component({ selector: 'app-root', imports: [RouterOutlet], template: '<router-outlet />' })
class AuditRoot {}
bootstrapApplication(AuditRoot, { providers: [provideRouter([{ path: '**', component: AuditPage }])] }).catch(console.error);
