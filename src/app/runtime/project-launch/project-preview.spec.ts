import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
// This route test does not render unrelated canvas activities in jsdom.
vi.mock('phaser', () => ({}));
import { projectCatalog } from '../../projects/project-catalog';
import { ProjectCatalogService } from './project-catalog.service';
import { ProjectHostComponent } from './project-host.component';
import { LocalProjectDefinitionSource } from './local-project-definition.source';
import { PROJECT_SESSION_RESOLVER } from './project-launch.tokens';

describe('content-only project previews', () => {
  const resolve = vi.fn();
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      provideRouter([
        { path: 'projects/:projectId/:view', component: ProjectHostComponent },
        { path: 'projects/:projectId', component: ProjectHostComponent },
      ]),
      { provide: PROJECT_SESSION_RESOLVER, useValue: { resolve } },
    ] });
    vi.spyOn(TestBed.inject(ProjectCatalogService), 'load').mockResolvedValue();
    resolve.mockClear();
  });
  afterEach(() => vi.restoreAllMocks());

  it('opens both static pages without sessions, packages, or persistence', async () => {
    const project = projectCatalog.find(entry => entry.id === 'community-story-network')!;
    const load = vi.spyOn(LocalProjectDefinitionSource.prototype, 'load');
    const save = vi.spyOn(Storage.prototype, 'setItem');
    const harness = await RouterTestingHarness.create();
    for (const [view, page] of [['', 'launch'], ['/final-demo', 'showcase']]) {
      await harness.navigateByUrl(project.route + view, ProjectHostComponent);
      await vi.waitFor(() => {
        harness.detectChanges();
        const frame = harness.routeNativeElement?.querySelector('iframe');
        expect(frame?.getAttribute('src')).toBe(`/projects/${project.id}/${page}.html`);
        expect(frame?.getAttribute('title')).toContain(project.title);
      });
    }
    expect(resolve).not.toHaveBeenCalled();
    expect(load).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
  });

  it('rejects activity routes instead of launching an unimplemented publishing engine', async () => {
    const load = vi.spyOn(LocalProjectDefinitionSource.prototype, 'load');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/community-story-network/activity', ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.textContent).toContain('introduction and a mock showcase only');
      expect(harness.routeNativeElement?.querySelector('iframe')).toBeNull();
    });
    expect(resolve).not.toHaveBeenCalled();
    expect(load).not.toHaveBeenCalled();
  });
});
