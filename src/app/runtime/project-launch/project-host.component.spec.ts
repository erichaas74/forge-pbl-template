import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
// Route tests exercise the host and league, not unrelated Phaser canvas renderers.
vi.mock('phaser', () => ({}));
import { projectCatalog } from '../../projects/project-catalog';
import { ProjectCatalogService } from './project-catalog.service';
import { ProjectHostComponent } from './project-host.component';
import { LocalProjectDefinitionSource } from './local-project-definition.source';
import { LOAD_OBJECT_MODEL_VIEWER } from '../../shared/media/object-model-viewer.component';
import leagueConfig from '../../../../public/projects/live-strategy-league/project.json';
import {
  createLeague,
  requireLeagueConfig,
} from '../../templates/live-strategy-league/domain/league-engine';
import { BrowserLeaguePersistence } from '../../templates/live-strategy-league/runtime/league.persistence';
import { expeditionNewsNetworkConfig } from '../../projects/expedition-news-network/expedition-news-network.config';
import { BrowserHistoryLivePersistenceAdapter } from '../../templates/history-live/persistence/history-live.persistence';

describe('project launch routing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'projects/:projectId/:view', component: ProjectHostComponent },
          { path: 'projects/:projectId', component: ProjectHostComponent },
        ]),
        { provide: LOAD_OBJECT_MODEL_VIEWER, useValue: () => Promise.resolve() },
      ],
    });
    vi.spyOn(TestBed.inject(ProjectCatalogService), 'load').mockResolvedValue();
  });

  afterEach(() => vi.restoreAllMocks());

  it('opens the league lobby without loading practice, then enters the saved activity', async () => {
    const league = projectCatalog.find((project) => project.id === 'live-strategy-league')!;
    TestBed.inject(ProjectCatalogService).projects.set([league]);
    vi.spyOn(LocalProjectDefinitionSource.prototype, 'load').mockResolvedValue(leagueConfig);
    const saved = createLeague(requireLeagueConfig(leagueConfig));
    saved.teams[0].decision.values['price'] = 27;
    const load = vi.spyOn(BrowserLeaguePersistence.prototype, 'load').mockReturnValue(saved);
    const save = vi.spyOn(BrowserLeaguePersistence.prototype, 'save');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(league.route, ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.querySelector('app-league-launch')).not.toBeNull();
    });
    expect(
      harness.routeNativeElement
        ?.querySelector('app-project-lesson-nav .return-link')
        ?.getAttribute('href'),
    ).toBe('/projects');
    expect(
      harness.routeNativeElement?.querySelectorAll('nav[aria-label="Project weeks"] .week-button'),
    ).toHaveLength(4);
    expect(
      harness.routeNativeElement
        ?.querySelector('app-project-lesson-nav .final-example')
        ?.getAttribute('href'),
    ).toBe(league.route + '/final-demo');
    expect(harness.routeNativeElement?.querySelector('.enter-league')?.getAttribute('href')).toBe(
      league.route + '/activity',
    );
    expect(load).not.toHaveBeenCalled();
    await harness.navigateByUrl(league.route + '/activity', ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('#price')?.value).toBe(
        '27',
      );
    });
    expect(load).toHaveBeenCalledTimes(1);
    expect(save).not.toHaveBeenCalled();
  });

  it('launches a template-owned final demo without an intro or practice persistence', async () => {
    const league = projectCatalog.find((project) => project.id === 'live-strategy-league')!;
    TestBed.inject(ProjectCatalogService).projects.set([league]);
    vi.spyOn(LocalProjectDefinitionSource.prototype, 'load').mockResolvedValue(leagueConfig);
    const save = vi.spyOn(Storage.prototype, 'setItem');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(league.route + '/final-demo', ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.querySelector('app-league-final-demo')).not.toBeNull();
    });
    expect(
      harness.routeNativeElement?.querySelectorAll('nav[aria-label="Project weeks"] .week-button'),
    ).toHaveLength(4);
    expect(
      harness.routeNativeElement
        ?.querySelector('app-project-lesson-nav .final-example')
        ?.getAttribute('aria-current'),
    ).toBe('page');
    expect(
      harness.routeNativeElement?.querySelector('app-project-lesson-nav .lessons [aria-current]'),
    ).toBeNull();
    expect(save).not.toHaveBeenCalled();
    harness
      .routeNativeElement!.querySelectorAll<HTMLAnchorElement>(
        'nav[aria-label="Project weeks"] .lessons a:first-child',
      )[3]
      .click();
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.querySelector('app-league-shell')).not.toBeNull();
    });
    expect(
      harness.routeNativeElement?.querySelector('app-project-lesson-nav .lessons [aria-current]')
        ?.textContent,
    ).toContain('Lesson 7');
  });

  it('supports the landing page for every template without loading an activity package', async () => {
    const load = vi.spyOn(LocalProjectDefinitionSource.prototype, 'load');
    const catalog = TestBed.inject(ProjectCatalogService);
    const projects = projectCatalog.map((project) => ({
      ...project,
      entryMode: 'opening' as const,
    }));
    catalog.projects.set(projects);
    const harness = await RouterTestingHarness.create();
    for (const project of projects) {
      await harness.navigateByUrl(project.route, ProjectHostComponent);
      await vi.waitFor(() => {
        harness.detectChanges();
        expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe(project.title);
      });
      expect(harness.routeNativeElement?.querySelector('.primary-button')?.textContent).toContain(
        'Start Project',
      );
    }
    expect(load).not.toHaveBeenCalled();
  });

  it('opens the final broadcast video from the header without loading or saving learner work', async () => {
    const project = projectCatalog.find((item) => item.id === 'expedition-news-network')!;
    TestBed.inject(ProjectCatalogService).projects.set([project]);
    vi.spyOn(LocalProjectDefinitionSource.prototype, 'load').mockResolvedValue(
      expeditionNewsNetworkConfig,
    );
    const load = vi.spyOn(BrowserHistoryLivePersistenceAdapter.prototype, 'load');
    const save = vi.spyOn(Storage.prototype, 'setItem');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(project.route + '/final-demo', ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(
        harness.routeNativeElement?.querySelector('app-inquiry-example-page video'),
      ).not.toBeNull();
    });
    const element = harness.routeNativeElement!;
    expect(element.querySelector('video')?.getAttribute('src')).toBe(
      '/history-live/expedition-examples/final-news-broadcast.mp4',
    );
    expect(element.querySelectorAll('.transcript-section')).toHaveLength(7);
    expect(element.querySelector('app-field-newsroom')).toBeNull();
    expect(element.querySelector('.final-example')?.getAttribute('href')).toBe(
      project.route + '/final-demo',
    );
    expect(element.querySelector('.final-example')?.getAttribute('aria-current')).toBe('page');
    expect(load).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
  });

  it('keeps an unavailable final example explicit for a catalog-only project', async () => {
    const catalog = TestBed.inject(ProjectCatalogService);
    const external = {
      ...projectCatalog[0],
      id: 'external-project',
      finalExampleMode: undefined,
      route: '/projects/external-project',
      entryMode: 'opening' as const,
    };
    catalog.projects.set([external]);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(external.route, ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.querySelector('.primary-button')).not.toBeNull();
    });
    expect(harness.routeNativeElement?.querySelector('.demo-link')).toBeNull();
    await harness.navigateByUrl(external.route + '/final-demo', ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[role="alert"]')?.textContent).toContain(
        'CAPABILITY_NOT_INSTALLED',
      );
    });
  });
});
