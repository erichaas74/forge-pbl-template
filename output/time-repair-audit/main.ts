import { Component, computed, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import raw from '../../public/projects/exploration-time-repair/versions/2.0.0/project.json';
import { InventionWorkspaceComponent } from '../../src/app/templates/time-repair/invention/invention-workspace.component';
import { INVENTION_PROJECT, INVENTION_CONTEXT, INVENTION_EXAMPLE } from '../../src/app/templates/time-repair/invention/invention.runtime';
import { requireInventionProject } from '../../src/app/templates/time-repair/invention/invention.validation';
import { createLocalPreviewSession } from '../../src/app/core/context/project-session-context';
import { PROJECT_LESSON_FOCUS } from '../../src/app/shared/project-lessons/project-lesson-focus';
import { ProjectLessonNavComponent } from '../../src/app/shared/project-lessons/project-lesson-nav.component';
import { CurriculumDisclosureComponent } from '../../src/app/shared/project-lessons/curriculum-disclosure.component';
import { projectLessonRegistry } from '../../src/app/runtime/project-launch/project-lesson.registry';
import { lessonNumber } from '../../src/app/shared/project-lessons/project-lesson.models';
const project = requireInventionProject(raw);
const plan = projectLessonRegistry.find(project.projectId, project.projectVersion)!;
@Component({
  imports: [InventionWorkspaceComponent, ProjectLessonNavComponent, CurriculumDisclosureComponent],
  providers: [
    { provide: INVENTION_PROJECT, useValue: project },
    { provide: INVENTION_CONTEXT, useValue: createLocalPreviewSession(project.projectId, project.projectVersion, { actorId: 'visual-audit' }) },
    { provide: INVENTION_EXAMPLE, useFactory: () => inject(ActivatedRoute).snapshot.url.at(-1)?.path === 'final-demo' },
    { provide: PROJECT_LESSON_FOCUS, useFactory: () => {
      const route = inject(ActivatedRoute), query = toSignal(route.queryParamMap, { initialValue: route.snapshot.queryParamMap });
      return computed(() => plan.lessons[lessonNumber(query().get('lesson'))-1]);
    } },
  ],
  template: `<app-project-lesson-nav [plan]="plan" [route]="route" [selected]="example ? 8 : selected()" [finalExampleActive]="example" [finalExampleRoute]="['/projects', plan.projectId, 'final-demo']"/><app-curriculum-disclosure [plan]="plan" [selected]="example ? 8 : selected()"/><app-invention-workspace/>`,
})
class AuditFrame {
  readonly plan = plan;
  readonly route = ['/projects', project.projectId, 'lessons'];
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly query = toSignal(this.activatedRoute.queryParamMap, { initialValue: this.activatedRoute.snapshot.queryParamMap });
  readonly selected = computed(() => lessonNumber(this.query().get('lesson')));
  readonly example = inject(INVENTION_EXAMPLE);
}
@Component({selector:'app-root', imports:[RouterOutlet], template:'<router-outlet/>'})
class AuditApp {}
bootstrapApplication(AuditApp, {providers:[provideRouter([{path:'**', component:AuditFrame}])]}).catch(console.error);
