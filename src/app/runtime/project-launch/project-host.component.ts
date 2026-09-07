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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
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

@Component({
  selector: 'app-project-host',
  imports: [NgComponentOutlet, RouterLink],
  templateUrl: './project-host.component.html',
  styleUrl: './project-host.component.scss',
})
export class ProjectHostComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly parentInjector = inject(EnvironmentInjector);
  private readonly documentTitle = inject(Title);
  private readonly catalog = inject(ProjectCatalogService);
  private readonly sessionResolver = inject(PROJECT_SESSION_RESOLVER, { optional: true });
  private readonly source = new LocalProjectDefinitionSource();
  private readonly subscription: Subscription;
  private readonly outlet = viewChild(NgComponentOutlet);
  private readonly introPersistence = inject(PROJECT_INTRO_PERSISTENCE, { optional: true });
  private generation = 0;

  readonly project = signal<ProjectCatalogEntry | undefined>(undefined);
  readonly component = signal<Type<unknown> | null>(null);
  readonly projectInjector = signal<EnvironmentInjector | undefined>(undefined);
  readonly loading = signal(true);
  readonly error = signal<string | undefined>(undefined);
  readonly isActivity = signal(false);
  readonly hasIntro = signal(false);
  readonly usesIntegratedActivityHeader = computed(
    () => this.isActivity() && this.project()?.template.id === 'journey-replay',
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
    this.documentTitle.setTitle(`${project.title} | Forge PBL`);

    try {
      const intro = projectIntroRegistry.find(project.id);
      this.hasIntro.set(!!intro);
      const view = this.route.snapshot.paramMap.get('view');
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
      if (view === 'final-demo' || (view === null && intro)) {
        if (!intro)
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
            { provide: PROJECT_INTRO_CONFIG, useValue: intro },
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
      const injector = createEnvironmentInjector(
        [
          { provide: PROJECT_CATALOG_ENTRY, useValue: project },
          { provide: PROJECT_DEFINITION, useValue: definition },
          { provide: PROJECT_SESSION_CONTEXT, useValue: session },
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
