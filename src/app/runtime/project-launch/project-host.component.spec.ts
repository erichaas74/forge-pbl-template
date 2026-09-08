import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
import { projectCatalog } from '../../projects/project-catalog';
import { ProjectCatalogService } from './project-catalog.service';
import { ProjectHostComponent } from './project-host.component';
import { LocalProjectDefinitionSource } from './local-project-definition.source';
import { LOAD_OBJECT_MODEL_VIEWER } from '../../shared/media/object-model-viewer.component';
import leagueConfig from '../../../../public/projects/live-strategy-league/project.json';
import { createLeague, requireLeagueConfig } from '../../templates/live-strategy-league/domain/league-engine';
import { BrowserLeaguePersistence } from '../../templates/live-strategy-league/runtime/league.persistence';

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
    const league = projectCatalog.find(project => project.id === 'live-strategy-league')!;
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
    expect(harness.routeNativeElement?.querySelectorAll('nav')).toHaveLength(1);
    expect(harness.routeNativeElement?.querySelectorAll('header')).toHaveLength(1);
    expect(harness.routeNativeElement?.querySelector('.enter-league')?.getAttribute('href')).toBe(league.route + '/activity');
    expect(load).not.toHaveBeenCalled();
    await harness.navigateByUrl(league.route + '/activity', ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('#price')?.value).toBe('27');
    });
    expect(load).toHaveBeenCalledTimes(1);
    expect(save).not.toHaveBeenCalled();
  });

  it('launches a template-owned final demo without an intro or practice persistence', async () => {
    const league = projectCatalog.find(project => project.id === 'live-strategy-league')!;
    TestBed.inject(ProjectCatalogService).projects.set([league]);
    vi.spyOn(LocalProjectDefinitionSource.prototype, 'load').mockResolvedValue(leagueConfig);
    const save = vi.spyOn(Storage.prototype, 'setItem');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(league.route + '/final-demo', ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.querySelector('app-league-final-demo')).not.toBeNull();
    });
    expect(harness.routeNativeElement?.querySelectorAll('nav')).toHaveLength(1);
    expect(harness.routeNativeElement?.querySelectorAll('header')).toHaveLength(1);
    expect(save).not.toHaveBeenCalled();
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
