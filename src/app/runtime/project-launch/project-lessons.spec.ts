import { Component, inject } from '@angular/core';
import { PROJECT_LESSON_FOCUS } from '../../shared/project-lessons/project-lesson-focus';
import * as launchers from './template-launcher.registry';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
// Keep unrelated canvas detection out of the route-only jsdom environment.
vi.mock('phaser', () => ({}));
import { projectCatalog, type ProjectCatalogEntry } from '../../projects/project-catalog';
import { localProjectSession } from './local-project-session';
import { ProjectCatalogService } from './project-catalog.service';
import { ProjectHostComponent } from './project-host.component';
import { LocalProjectDefinitionSource } from './local-project-definition.source';
import { PROJECT_SESSION_RESOLVER } from './project-launch.tokens';
import { projectLessonRegistry } from './project-lesson.registry';
import leagueConfig from '../../../../public/projects/live-strategy-league/project.json';
import { BrowserLeaguePersistence } from '../../templates/live-strategy-league/runtime/league.persistence';
import { LeagueRuntimeService } from '../../templates/live-strategy-league/runtime/league-runtime.service';

@Component({ template: '<h1>{{ focus()?.title }}</h1>' })
class VisualWorkspaceStub {
  readonly focus = inject(PROJECT_LESSON_FOCUS);
}

describe('eight-lesson project navigation', () => {
  const resolve = vi.fn((project: ProjectCatalogEntry) =>
    Promise.resolve(localProjectSession(project)),
  );
  beforeEach(() => {
    resolve.mockClear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'projects/:projectId/:view', component: ProjectHostComponent },
          { path: 'projects/:projectId', component: ProjectHostComponent },
        ]),
        { provide: PROJECT_SESSION_RESOLVER, useValue: { resolve } },
      ],
    });
    vi.spyOn(TestBed.inject(ProjectCatalogService), 'load').mockResolvedValue();
  });
  afterEach(() => vi.restoreAllMocks());

  it('opens every lesson on a mounted visual surface with versioned lesson context and the appropriate standards review', async () => {
    const load = vi.spyOn(LocalProjectDefinitionSource.prototype, 'load').mockResolvedValue({});
    const launch = vi.fn().mockResolvedValue({ component: VisualWorkspaceStub, providers: [] });
    vi.spyOn(launchers.TemplateLauncherRegistry.prototype, 'require').mockImplementation(
      async (templateId) => ({ templateId, load: launch }),
    );
    const save = vi.spyOn(Storage.prototype, 'setItem');
    const harness = await RouterTestingHarness.create();
    for (const project of projectCatalog) {
      const plan = projectLessonRegistry.find(project.id, project.projectVersion)!;
      let firstSurface: Element | null = null;
      for (const lesson of plan.lessons) {
        const host = await harness.navigateByUrl(
          `${project.route}/lessons?lesson=${lesson.number}`,
          ProjectHostComponent,
        );
        await vi.waitFor(() => {
          harness.detectChanges();
          expect(host.loading()).toBe(false);
        });
        expect(host.error()).toBeUndefined();
        expect(host.lessonFocus()?.title).toBe(lesson.title);
        const element = harness.routeNativeElement!;
        const reviewPanel = element.querySelector('app-standards-review');
        if (/^Grade [456]$/.test(project.grade)) {
          expect(reviewPanel, project.id).not.toBeNull();
          expect(reviewPanel?.querySelector('.week-standards')?.textContent).toContain(
            `Week ${Math.ceil(lesson.number / 2)}`,
          );
        } else {
          expect(reviewPanel, project.id).toBeNull();
        }
        expect(element.querySelectorAll('nav[aria-label="Project weeks"] .week-button')).toHaveLength(4);
        expect(element.querySelectorAll('app-project-lesson-nav .lessons a')).toHaveLength(8);
        expect(element.querySelector('app-project-lesson-nav details')).toBeNull();
        expect(
          element.querySelector('app-project-lesson-nav .return-link')?.getAttribute('href'),
        ).toBe('/projects');
        const finalExample = element.querySelector('app-project-lesson-nav .final-example')!;
        expect(finalExample.textContent).toContain('Final example');
        if (host.hasFinalExample())
          expect(finalExample.getAttribute('href')).toBe(`${project.route}/final-demo`);
        else expect(finalExample.hasAttribute('disabled')).toBe(true);
        expect(
          element
            .querySelector('app-project-lesson-nav .lessons [aria-current="step"]')
            ?.getAttribute('aria-label'),
        ).toContain(`Lesson ${lesson.number}:`);
        expect(element.querySelector('app-project-lesson-page')).toBeNull();
        expect(element.querySelector('.project-surface')?.hasAttribute('hidden')).toBe(false);
        if (project.entryMode === 'preview') expect(element.querySelector('iframe')).not.toBeNull();
        else expect(element.querySelector('h1')?.textContent).toContain(lesson.title);
        const surface = element.querySelector('.project-surface');
        if (firstSurface) expect(surface).toBe(firstSurface);
        firstSurface = surface;
      }
    }
    const activityCount = projectCatalog.filter((p) => p.entryMode !== 'preview').length;
    expect(resolve).toHaveBeenCalledTimes(activityCount);
    expect(load).toHaveBeenCalledTimes(activityCount);
    // A real preview session may allocate its stable learner ID; lesson selection writes no activity answers.
    expect(save.mock.calls.every(([key]) => key === 'forge:journey-replay:demo-learner')).toBe(
      true,
    );
  }, 20000);

  it('normalizes invalid lesson numbers and follows visible week and lesson links', async () => {
    vi.spyOn(LocalProjectDefinitionSource.prototype, 'load').mockResolvedValue(leagueConfig);
    vi.spyOn(BrowserLeaguePersistence.prototype, 'load').mockReturnValue(null);
    const harness = await RouterTestingHarness.create();
    const host = await harness.navigateByUrl(
      '/projects/live-strategy-league/lessons?lesson=invalid&lessonPlan=open',
      ProjectHostComponent,
    );
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(host.loading()).toBe(false);
    });
    expect(host.selectedLesson()).toBe(1);
    const element = harness.routeNativeElement!;
    element.querySelectorAll<HTMLAnchorElement>('nav[aria-label="Project weeks"] .lessons a:first-child')[2].click();
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(host.selectedLesson()).toBe(5);
    });
    element.querySelectorAll<HTMLAnchorElement>('app-project-lesson-nav .selected-week .lessons a')[1].click();
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(host.selectedLesson()).toBe(6);
    });
    expect(element.querySelector('app-project-lesson-nav details')).toBeNull();
    expect(TestBed.inject(Router).url).not.toContain('lessonPlan');
    expect(element.querySelector('.project-return-bar')).toBeNull();
    expect(element.querySelector('app-project-lesson-page')).toBeNull();
  });

  it('keeps the active workspace instance and unsaved draft while switching lessons', async () => {
    const load = vi
      .spyOn(LocalProjectDefinitionSource.prototype, 'load')
      .mockResolvedValue(leagueConfig);
    vi.spyOn(BrowserLeaguePersistence.prototype, 'load').mockReturnValue(null);
    const save = vi.spyOn(BrowserLeaguePersistence.prototype, 'save');
    const harness = await RouterTestingHarness.create();
    const host = await harness.navigateByUrl(
      '/projects/live-strategy-league/activity',
      ProjectHostComponent,
    );
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.querySelector('app-league-shell')).not.toBeNull();
    });
    const runtime = host.projectInjector()!.get(LeagueRuntimeService);
    runtime.updateValue('price', 31);
    runtime.updateNote('An unsaved price forecast');
    const shell = harness.routeNativeElement!.querySelector('app-league-shell');
    harness
      .routeNativeElement!.querySelectorAll<HTMLAnchorElement>(
        'nav[aria-label="Project weeks"] .lessons a:first-child',
      )[3]
      .click();
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(host.selectedLesson()).toBe(7);
    });
    harness
      .routeNativeElement!.querySelectorAll<HTMLAnchorElement>(
        'app-project-lesson-nav .selected-week .lessons a',
      )[1]
      .click();
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(host.selectedLesson()).toBe(8);
    });
    expect(harness.routeNativeElement!.querySelector('app-league-shell')).toBe(shell);
    expect(
      harness.routeNativeElement!.querySelector('.project-surface')?.hasAttribute('hidden'),
    ).toBe(false);
    expect(runtime.state().round).toBe(0);
    expect(runtime.state().phase).toBe('preview');
    expect(host.projectInjector()!.get(LeagueRuntimeService)).toBe(runtime);
    expect(runtime.draft().values['price']).toBe(31);
    expect(runtime.draft().reasoning).toBe('An unsaved price forecast');
    expect(load).toHaveBeenCalledTimes(1);
    expect(save).not.toHaveBeenCalled();
  });

  it('returns preview projects from the final example to the selected week', async () => {
    const preview = projectCatalog.find((project) => project.entryMode === 'preview')!;
    const load = vi.spyOn(LocalProjectDefinitionSource.prototype, 'load');
    const harness = await RouterTestingHarness.create();
    const host = await harness.navigateByUrl(`${preview.route}/final-demo`, ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(host.loading()).toBe(false);
    });
    expect(harness.routeNativeElement?.querySelector('iframe')?.getAttribute('src')).toContain(
      'showcase.html',
    );
    harness
      .routeNativeElement!.querySelectorAll<HTMLAnchorElement>(
        'nav[aria-label="Project weeks"] .lessons a:first-child',
      )[2]
      .click();
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(TestBed.inject(Router).url).toBe(`${preview.route}/lessons?lesson=5`);
      expect(host.loading()).toBe(false);
    });
    expect(host.error()).toBeUndefined();
    expect(harness.routeNativeElement?.querySelector('iframe')?.getAttribute('src')).toContain(
      'launch.html',
    );
    harness
      .routeNativeElement!.querySelector<HTMLAnchorElement>(
        'app-project-lesson-nav .final-example',
      )!
      .click();
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(TestBed.inject(Router).url).toBe(`${preview.route}/final-demo`);
      expect(host.loading()).toBe(false);
    });
    expect(harness.routeNativeElement?.querySelector('iframe')?.getAttribute('src')).toContain(
      'showcase.html',
    );
    expect(load).not.toHaveBeenCalled();
    expect(resolve).not.toHaveBeenCalled();
  });

  it('does not apply a reviewed schedule to a different project version', async () => {
    const project = { ...projectCatalog[0], projectVersion: '99.0.0' };
    TestBed.inject(ProjectCatalogService).projects.set([project]);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(`${project.route}/lessons?lesson=8`, ProjectHostComponent);
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[role="alert"]')?.textContent).toContain(
        'LESSON_PLAN_UNAVAILABLE',
      );
    });
    expect(harness.routeNativeElement?.querySelector('app-project-lesson-nav')).toBeNull();
  });
});
