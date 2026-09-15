import {
  Component,
  computed,
  createEnvironmentInjector,
  EnvironmentInjector,
  inject,
  OnDestroy,
  signal,
  viewChild,
  type Type,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, Title, type SafeResourceUrl } from '@angular/platform-browser';
import type { Subscription } from 'rxjs';

import { localProjectSession } from './local-project-session';
import { createLocalPreviewSession } from '../../core/context/project-session-context';
import { projectIntroRegistry } from './project-intro.registry';
import {
  PROJECT_INTRO_CONFIG,
  PROJECT_INTRO_PERSISTENCE,
} from '../../shared/project-intro/project-intro.runtime';
import { BrowserProjectIntroAdapter } from '../../infrastructure/persistence/browser-project-intro.adapter';
import type { ProjectLaunchTarget } from './project-launch.contracts';
import type { ProjectCatalogEntry } from '../../projects/project-catalog';
import { ProjectCatalogService } from './project-catalog.service';
import { LocalProjectDefinitionSource } from './local-project-definition.source';
import {
  PROJECT_CATALOG_ENTRY,
  PROJECT_DEFINITION,
  PROJECT_SESSION_CONTEXT,
  PROJECT_SESSION_RESOLVER,
} from './project-launch.tokens';
import { createLocalTemplateLauncherRegistry } from './template-launcher.registry';
import { projectLessonRegistry } from './project-lesson.registry';
import {
  lessonNumber,
  type ProjectLessonPlan,
} from '../../shared/project-lessons/project-lesson.models';
import { ProjectLessonNavComponent } from '../../shared/project-lessons/project-lesson-nav.component';
import { PROJECT_LESSON_FOCUS } from '../../shared/project-lessons/project-lesson-focus';
import { StandardsReviewComponent } from '../../shared/project-lessons/standards-review.component';
import { CurriculumDisclosureComponent } from '../../shared/project-lessons/curriculum-disclosure.component';
import { findProjectStandardsReview, forgeReviewStandards, curriculumConnections } from './project-standards.registry';

@Component({
  selector: 'app-project-host',
  imports: [NgComponentOutlet, RouterLink, ProjectLessonNavComponent, StandardsReviewComponent, CurriculumDisclosureComponent],
  templateUrl: './project-host.component.html',
  styleUrl: './project-host.component.scss',
})
export class ProjectHostComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly query = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });
  private readonly parentInjector = inject(EnvironmentInjector);
  private readonly documentTitle = inject(Title);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly catalog = inject(ProjectCatalogService);
  private readonly sessionResolver = inject(PROJECT_SESSION_RESOLVER, { optional: true });
  private readonly source = new LocalProjectDefinitionSource();
  private readonly subscription: Subscription;
  private readonly outlet = viewChild(NgComponentOutlet);
  private readonly introPersistence = inject(PROJECT_INTRO_PERSISTENCE, { optional: true });
  private generation = 0;

  readonly project = signal<ProjectCatalogEntry | undefined>(undefined);
  readonly lessonPlan = signal<ProjectLessonPlan | undefined>(undefined);
  readonly standardsReview = computed(() =>
    findProjectStandardsReview(this.project(), this.lessonPlan()),
  );
  readonly reviewStandards = forgeReviewStandards;
  readonly curriculumConnections = curriculumConnections;
  readonly isLessonView = signal(false);
  readonly currentRoute = signal<readonly string[]>([]);
  readonly lessonFocus = computed(() => this.lessonPlan()?.lessons[this.selectedLesson() - 1]);
  readonly workspaceFocus = computed(() =>
    this.isActivity() && (this.isLessonView() || this.query().has('lesson'))
      ? this.lessonFocus()
      : undefined,
  );
  readonly workspaceRoute = computed(() =>
    (this.isActivity() || this.isLessonView()) &&
    !['final-demo', 'builder-info'].includes(this.currentRoute().at(-1) ?? '')
      ? this.currentRoute()
      : ['/projects', this.project()?.id ?? '', 'lessons'],
  );
  readonly selectedLesson = computed(() => lessonNumber(this.query().get('lesson')));
  readonly component = signal<Type<unknown> | null>(null);
  readonly projectInjector = signal<EnvironmentInjector | undefined>(undefined);
  readonly loading = signal(true);
  readonly previewUrl = signal<SafeResourceUrl | null>(null);
  readonly error = signal<string | undefined>(undefined);
  readonly isActivity = signal(false);
  readonly hasIntro = signal(false);
  readonly hasFinalExample = signal(false);
  readonly integratedHeader = signal(false);
  readonly usesIntegratedActivityHeader = computed(
    () =>
      this.isActivity() &&
      (this.integratedHeader() || this.project()?.template.id === 'journey-replay'),
  );

  constructor() {
    this.subscription = this.route.paramMap.subscribe(() => void this.load());
  }

  ngOnDestroy(): void {
    this.generation++;
    this.subscription.unsubscribe();
    this.projectInjector()?.destroy();
  }

  canLeave(): boolean | Promise<boolean> {
    const component = this.outlet()?.componentInstance as {
      canLeave?: () => boolean | Promise<boolean>;
    } | null;
    return component?.canLeave?.() ?? true;
  }

  private async load(): Promise<void> {
    const generation = ++this.generation;
    this.loading.set(true);
    this.previewUrl.set(null);
    this.integratedHeader.set(false);
    this.lessonPlan.set(undefined);
    this.isLessonView.set(false);
    this.hasIntro.set(false);
    this.hasFinalExample.set(false);
    this.isActivity.set(false);
    this.error.set(undefined);
    this.component.set(null);
    this.projectInjector()?.destroy();
    this.projectInjector.set(undefined);

    const projectId = this.route.snapshot.paramMap.get('projectId');
    await this.catalog.load();
    if (generation !== this.generation) return;
    const project = this.catalog.find(projectId);
    if (project === undefined) {
      this.loading.set(false);
      this.error.set('This project is not registered in the project catalog.');
      return;
    }
    this.project.set(project);
    const currentView = this.route.snapshot.paramMap.get('view');
    this.currentRoute.set(['/projects', project.id, ...(currentView ? [currentView] : [])]);
    this.documentTitle.setTitle(`${project.title} | Forge PBL`);

    try {
      const plan = projectLessonRegistry.find(project.id, project.projectVersion);
      this.lessonPlan.set(plan);
      this.hasFinalExample.set(
        project.entryMode === 'preview' ||
          !!projectIntroRegistry.find(project.id) ||
          project.finalExampleMode === 'template',
      );
      if (this.route.snapshot.paramMap.get('view') === 'lessons') {
        if (!plan)
          throw new Error(
            'LESSON_PLAN_UNAVAILABLE: This project version has no reviewed eight-lesson plan.',
          );
        this.isLessonView.set(true);
      }
      // Content-only previews never resolve a student session or load a runtime package.
      if (project.entryMode === 'preview') {
        const view = this.route.snapshot.paramMap.get('view');
        if (
          !/^[a-z0-9][a-z0-9-]*$/.test(project.id) ||
          (view !== null && view !== 'final-demo' && view !== 'lessons')
        ) {
          throw new Error('This project offers an introduction and a mock showcase only.');
        }
        const page = view === 'final-demo' ? 'showcase' : 'launch';
        this.previewUrl.set(
          this.sanitizer.bypassSecurityTrustResourceUrl(`/projects/${project.id}/${page}.html`),
        );
        return;
      }
      const intro = projectIntroRegistry.find(project.id);
      const directEntry = project.entryMode === 'activity';
      this.hasIntro.set(!directEntry);
      this.hasFinalExample.set(!!intro || project.finalExampleMode === 'template');
      const view = this.isLessonView()
        ? (plan?.workspaceView ?? 'experience')
        : this.route.snapshot.paramMap.get('view');
      this.isActivity.set(view !== null && view !== 'final-demo');
      const session =
        view === 'final-demo'
          ? createLocalPreviewSession(project.id, project.projectVersion)
          : this.sessionResolver === null
            ? localProjectSession(project)
            : await this.sessionResolver.resolve(project);
      if (session.projectId !== project.id || session.projectVersion !== project.projectVersion) {
        throw new Error('The authenticated project session does not match the selected package.');
      }
      let definition: unknown;
      let target: ProjectLaunchTarget;
      if (
        (view === 'final-demo' && project.finalExampleMode !== 'template') ||
        (view === null && !directEntry)
      ) {
        if (view === 'final-demo' && !intro)
          throw new Error(
            'CAPABILITY_NOT_INSTALLED: This project has no final-example configuration.',
          );
        target = {
          component:
            view === 'final-demo'
              ? (await import('../../features/project-intro/project-final-example.component'))
                  .ProjectFinalExampleComponent
              : (await import('../../features/project-intro/project-intro.component'))
                  .ProjectIntroComponent,
          providers: [
            ...(intro ? [{ provide: PROJECT_INTRO_CONFIG, useValue: intro }] : []),
            ...(view === 'final-demo'
              ? []
              : [
                  {
                    provide: PROJECT_INTRO_PERSISTENCE,
                    useValue: this.introPersistence ?? new BrowserProjectIntroAdapter(),
                  },
                ]),
          ],
        };
      } else {
        this.isActivity.set(true);
        const registry = createLocalTemplateLauncherRegistry();
        definition = await this.source.load(project);
        const launcher = await registry.require(project.template.id);
        target = await launcher.load({
          project,
          projectDefinition: definition,
          session,
          view: view ?? undefined,
        });
      }
      if (generation !== this.generation) return;
      this.integratedHeader.set(target.integratedHeader === true);
      const injector = createEnvironmentInjector(
        [
          { provide: PROJECT_CATALOG_ENTRY, useValue: project },
          { provide: PROJECT_DEFINITION, useValue: definition },
          { provide: PROJECT_SESSION_CONTEXT, useValue: session },
          { provide: PROJECT_LESSON_FOCUS, useValue: this.workspaceFocus },
          ...target.providers,
        ],
        this.parentInjector,
        `project:${project.id}`,
      );
      this.projectInjector.set(injector);
      this.component.set(target.component);
    } catch (error: unknown) {
      if (generation !== this.generation) return;
      this.error.set(error instanceof Error ? error.message : 'The project could not be launched.');
    } finally {
      if (generation === this.generation) this.loading.set(false);
    }
  }
}
