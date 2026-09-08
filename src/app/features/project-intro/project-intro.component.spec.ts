import { LOAD_OBJECT_MODEL_VIEWER } from '../../shared/media/object-model-viewer.component';
import { By } from '@angular/platform-browser';
import { DecisionSceneComponent } from '../../plugins/intro-scenes/decision-scene.component';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { createLocalPreviewSession } from '../../core/context/project-session-context';
import { BrowserProjectIntroAdapter } from '../../infrastructure/persistence/browser-project-intro.adapter';
import { projectIntros } from '../../projects/project-intros';
import { projectCatalog, type ProjectCatalogEntry } from '../../projects/project-catalog';
import { PROJECT_CATALOG_ENTRY } from '../../runtime/project-launch/project-launch.tokens';
import {
  PROJECT_INTRO_CONFIG,
  PROJECT_INTRO_PERSISTENCE,
  ProjectIntroRuntime,
} from '../../shared/project-intro/project-intro.runtime';
import { ProjectIntroComponent } from './project-intro.component';
import { ProjectFinalExampleComponent } from './project-final-example.component';

describe('ProjectIntroComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    HTMLElement.prototype.scrollIntoView = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.open = true;
    });
  });

  async function setup(
    project = projectCatalog.find((item) => item.id === projectIntros[0].projectId)!,
  ) {
    const config = projectIntros.find((item) => item.projectId === project.id);
    await TestBed.configureTestingModule({
      imports: [ProjectIntroComponent, ProjectFinalExampleComponent],
      providers: [
        { provide: LOAD_OBJECT_MODEL_VIEWER, useValue: () => Promise.resolve() },
        provideRouter([]),
        { provide: PROJECT_CATALOG_ENTRY, useValue: project },
        ...(config ? [{ provide: PROJECT_INTRO_CONFIG, useValue: config }] : []),
        ProjectIntroRuntime,
        {
          provide: PROJECT_INTRO_PERSISTENCE,
          useValue: new BrowserProjectIntroAdapter(localStorage),
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProjectIntroComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  for (const project of projectCatalog) {
    it('shows the complete invitation and starts ' + project.title + ' in one click', async () => {
      const fixture = await setup(project);
      const element = fixture.nativeElement as HTMLElement;
      const config = projectIntros.find((item) => item.projectId === project.id);
      const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
      expect(element.querySelectorAll('h1')).toHaveLength(1);
      expect(element.querySelector('h1')?.textContent).toBe(project.title);
      expect(element.querySelector('.story')?.textContent).toBe(
        config?.story ?? project.description,
      );
      expect(element.querySelector('#experience-title')?.textContent).toBe(
        'What you’ll experience',
      );
      expect(element.querySelector('#learning-title')?.textContent).toBe('What you’ll learn');
      for (const goal of project.learningGoals)
        expect(element.querySelector('.learning-list')?.textContent).toContain(goal);
      if (config) {
        const experiences = Array.from(
          element.querySelectorAll('.experience-list p'),
          (item) => item.textContent,
        );
        expect(experiences).toEqual(config.mission);
        expect(element.querySelector('.creation-reward')?.textContent).toContain(
          config.finalExample.format,
        );
        expect(element.querySelector('.demo-link')?.getAttribute('href')).toBe(
          '/projects/' + project.id + '/final-demo',
        );
      } else {
        expect(element.querySelector('.experience-description')?.textContent).toBe(
          project.description,
        );
        expect(element.querySelector('.demo-link')).toBeNull();
      }
      expect(
        element.querySelectorAll(
          'app-project-product-preview, .step-track, input, textarea, details',
        ),
      ).toHaveLength(0);
      expect(element.querySelectorAll('app-project-teaser-host')).toHaveLength(
        config?.teaser?.type === 'illustrated-comparison' ? 1 : 0,
      );
      if (config?.teaser?.type === 'illustrated-comparison') {
        expect(element.querySelector('.story-mode')).not.toBeNull();
        expect(element.querySelector('.story-dialogue')?.textContent).toContain(
          config.teaser.scientistName,
        );
        expect(element.querySelector('.prediction-choices')).toBeNull();
      }
      const start = element.querySelector<HTMLButtonElement>('.primary-button')!;
      expect(start.textContent).toContain('Start Project');
      expect(start.disabled).toBe(false);
      start.click();
      await fixture.whenStable();
      expect(navigate).toHaveBeenCalledExactlyOnceWith(['/projects', project.id, 'experience']);
      expect(localStorage.length).toBe(0);
      fixture.destroy();
    });
  }

  it('plays Rowan with sound and opens a disposable first trade without repeating the story', async () => {
    const fixture = await setup(
      projectCatalog.find((item) => item.id === 'frontier-trading-company')!,
    );
    const element = fixture.nativeElement as HTMLElement;
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const video = element.querySelector('video')!;
    expect(video.getAttribute('src')).toBe('/project-intros/frontier/trading-town-launch.mp4');
    expect(video.controls).toBe(true);
    expect(video.muted).toBe(false);
    expect(video.autoplay).toBe(false);
    const pause = vi.spyOn(video, 'pause').mockImplementation(() => {});
    const dialog = element.querySelector('dialog')!;
    dialog.close = vi.fn(() => {
      dialog.open = false;
    });
    const trigger = element.querySelector<HTMLButtonElement>('.practice-button')!;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(pause).toHaveBeenCalledOnce();
    expect(dialog.open).toBe(true);
    expect(element.querySelector('.story-stage')).toBeNull();
    expect(element.querySelector('.purse')?.textContent).toContain('30 coins');
    expect(element.querySelectorAll('.scene-choice')).toHaveLength(3);
    const practice = fixture.debugElement.query(By.directive(DecisionSceneComponent))
      .componentInstance as DecisionSceneComponent;
    practice.choose('rope');
    fixture.detectChanges();
    expect(practice.cargoItems()).toHaveLength(1);
    practice.finish(true);
    fixture.detectChanges();
    expect(dialog.open).toBe(false);
    expect(element.querySelector('app-project-teaser-host')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(
      fixture.debugElement
        .query(By.directive(DecisionSceneComponent))
        .componentInstance.cargoItems(),
    ).toHaveLength(0);
    element.querySelector<HTMLButtonElement>('.practice-close')!.click();
    fixture.detectChanges();
    expect(navigate).not.toHaveBeenCalled();
    expect(localStorage.length).toBe(0);
    expect(element.querySelector<HTMLButtonElement>('.primary-button')!.disabled).toBe(false);
    fixture.destroy();
  });

  it('provides a catalog-only launch even without artwork or an intro capability', async () => {
    const project: ProjectCatalogEntry = {
      ...projectCatalog[0],
      id: 'new-project',
      coverImage: undefined,
    };
    const fixture = await setup(project);
    expect(fixture.nativeElement.querySelector('.artwork-symbol')?.textContent).toBe(
      project.symbol,
    );
    expect(fixture.nativeElement.querySelector('img')).toBeNull();
    expect(fixture.nativeElement.querySelector('.primary-button').disabled).toBe(false);
    fixture.destroy();
  });

  it('keeps the opening film playable alongside the pitch without requiring it to finish', async () => {
    const fixture = await setup(
      projectCatalog.find((item) => item.id === 'race-around-the-world')!,
    );
    const element = fixture.nativeElement as HTMLElement;
    const video = element.querySelector('video')!;
    expect(video.getAttribute('src')).toContain('intro-launch-video.mp4');
    expect(video.autoplay).toBe(false);
    expect(video.muted).toBe(true);
    expect(element.querySelector('track')?.getAttribute('src')).toContain('.vtt');
    expect(element.querySelector('.play-clip')?.textContent).toContain('Play short scene');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    video.dispatchEvent(new Event('ended'));
    expect(navigate).not.toHaveBeenCalled();
    expect(element.querySelector('h1')).not.toBeNull();
    expect(element.querySelector<HTMLButtonElement>('.primary-button')!.disabled).toBe(false);
    fixture.destroy();
  });

  it('switches between voiced opening clips on the same page without starting the project', async () => {
    const fixture = await setup(
      projectCatalog.find((item) => item.id === 'the-fate-of-the-republic')!,
    );
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const firstVideo = fixture.nativeElement.querySelector('video') as HTMLVideoElement;
    expect(firstVideo.getAttribute('src')).toContain('Lucius');
    expect(firstVideo.controls).toBe(true);
    expect(firstVideo.autoplay).toBe(false);
    fixture.nativeElement.querySelectorAll('.speech-choices button')[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('video').getAttribute('src')).toContain('Cassius');
    expect(fixture.nativeElement.querySelector('video')).not.toBe(firstVideo);
    expect(fixture.nativeElement.querySelector('#speech-summary').textContent).toContain(
      'shared power',
    );
    expect(navigate).not.toHaveBeenCalled();
    fixture.nativeElement.querySelector('video').dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.speech-error').textContent).toContain(
      'unavailable',
    );
    expect(fixture.nativeElement.querySelector('.primary-button').disabled).toBe(false);
    fixture.destroy();
  });

  it('retains the museum’s interactive object on the same page as the learning goals', async () => {
    const fixture = await setup(
      projectCatalog.find((item) => item.id === 'objects-that-changed-us')!,
    );
    expect(fixture.nativeElement.querySelector('app-object-model-viewer')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.learning-list')).not.toBeNull();
    fixture.destroy();
  });

  it('does not load, overwrite, or fabricate learner records when opening, starting, or revisiting', async () => {
    const fixture = await setup();
    const config = projectIntros[0];
    const runtime = TestBed.inject(ProjectIntroRuntime);
    const scope = {
      session: createLocalPreviewSession(config.projectId, '1.0.0'),
      introVersion: config.version,
    };
    await runtime.initialize(scope, config);
    runtime.update({
      challengeChoiceId: config.challenge.options[0].id,
      choiceId: config.decision.options[0].id,
      reason: 'Compare properties',
      question: 'Which test first?',
      teaser: {
        eventType: 'projectIntro.teaserCompleted',
        teaserId: config.teaser!.id,
        teaserVersion: config.teaser!.version,
        timestamp: new Date().toISOString(),
        observations: [],
      },
    });
    expect(await runtime.accept('existing-opening')).toBe(true);
    const before = JSON.stringify(await TestBed.inject(PROJECT_INTRO_PERSISTENCE).load(scope));
    const adapter = TestBed.inject(PROJECT_INTRO_PERSISTENCE);
    const load = vi.spyOn(adapter, 'load');
    const save = vi.spyOn(adapter, 'save');
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    await fixture.componentInstance.enter();
    fixture.destroy();
    const restored = TestBed.createComponent(ProjectIntroComponent);
    restored.detectChanges();
    await restored.whenStable();
    await restored.componentInstance.enter();
    expect(load).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
    expect(JSON.stringify(await adapter.load(scope))).toBe(before);
    restored.destroy();
  });

  it('prevents duplicate starts while navigation is pending', async () => {
    const fixture = await setup();
    let resolve!: (value: boolean) => void;
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockReturnValue(
      new Promise<boolean>((done) => {
        resolve = done;
      }),
    );
    const first = fixture.componentInstance.enter();
    await fixture.componentInstance.enter();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.primary-button').disabled).toBe(true);
    expect(navigate).toHaveBeenCalledTimes(1);
    resolve(true);
    await first;
    expect(fixture.componentInstance.entering()).toBe(false);
    fixture.destroy();
  });

  it('keeps Start Project usable and reports a failed navigation for retry', async () => {
    const fixture = await setup();
    const navigate = vi
      .spyOn(TestBed.inject(Router), 'navigate')
      .mockRejectedValueOnce(new Error('Unavailable'))
      .mockResolvedValue(true);
    await fixture.componentInstance.enter();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain(
      'could not open',
    );
    expect(fixture.nativeElement.querySelector('.primary-button').disabled).toBe(false);
    await fixture.componentInstance.enter();
    fixture.detectChanges();
    expect(navigate).toHaveBeenCalledTimes(2);
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
    fixture.destroy();
  });

  it('reports a canceled navigation without leaving the button stuck', async () => {
    const fixture = await setup();
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(false);
    await fixture.componentInstance.enter();
    expect(fixture.componentInstance.entering()).toBe(false);
    expect(fixture.componentInstance.error()).toContain('did not open');
    fixture.destroy();
  });

  it('lets teachers inspect and restart the completed sample without writing student records', async () => {
    const launch = await setup();
    launch.destroy();
    const fixture = TestBed.createComponent(ProjectFinalExampleComponent);
    fixture.detectChanges();
    await fixture.componentInstance.restart(false);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-investigation-final-case')).not.toBeNull();
    fixture.componentInstance.toggleReview();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('The thinking behind the presentation');
    const previousInjector = fixture.componentInstance.previewInjector();
    await fixture.componentInstance.restart(false);
    fixture.detectChanges();
    expect(fixture.componentInstance.reviewOpen()).toBe(false);
    expect(fixture.componentInstance.previewInjector()).not.toBe(previousInjector);
    expect(localStorage.length).toBe(0);
    fixture.destroy();
  });
});
