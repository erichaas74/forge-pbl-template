import { LOAD_OBJECT_MODEL_VIEWER } from '../../shared/media/object-model-viewer.component';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { createLocalPreviewSession } from '../../core/context/project-session-context';
import { BrowserProjectIntroAdapter } from '../../infrastructure/persistence/browser-project-intro.adapter';
import { projectIntros } from '../../projects/project-intros';
import { PROJECT_SESSION_CONTEXT } from '../../runtime/project-launch/project-launch.tokens';
import {
  PROJECT_INTRO_CONFIG,
  PROJECT_INTRO_PERSISTENCE,
} from '../../shared/project-intro/project-intro.runtime';
import { EMPTY_INTRO_RESPONSE } from '../../shared/project-intro/project-intro.models';
import { ProjectIntroComponent } from './project-intro.component';
import { ProjectFinalExampleComponent } from './project-final-example.component';
import type { ProjectTeaserResult } from '../../shared/project-intro/project-teaser.models';

describe('ProjectIntroComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    HTMLElement.prototype.scrollIntoView = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.open = true;
    });
  });

  async function setup(config = projectIntros[0]) {
    await TestBed.configureTestingModule({
      imports: [ProjectIntroComponent, ProjectFinalExampleComponent],
      providers: [
        { provide: LOAD_OBJECT_MODEL_VIEWER, useValue: () => Promise.resolve() },
        provideRouter([]),
        {
          provide: PROJECT_SESSION_CONTEXT,
          useValue: createLocalPreviewSession(config.projectId, '1.0.0'),
        },
        { provide: PROJECT_INTRO_CONFIG, useValue: config },
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

  function receipt(config = projectIntros[0]): ProjectTeaserResult {
    return {
      eventType: 'projectIntro.teaserCompleted',
      teaserId: config.teaser!.id,
      teaserVersion: config.teaser!.version,
      timestamp: new Date().toISOString(),
      observations: [],
    };
  }

  it('preserves the exciting opening, then shows every project’s final-product page without choice cards', async () => {
    for (const config of projectIntros) {
      TestBed.resetTestingModule();
      const fixture = await setup(config);
      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelector('h1')?.textContent?.trim()).toBe(
        config.teaser?.type === 'decision-scene'
          ? (config.teaser.prologue?.title ??
              (config.teaser.interaction === 'dispatch'
                ? config.teaser.headline
                : config.teaser.prompt))
          : config.teaser
            ? 'Will both samples react the same way?'
            : config.headline,
      );
      if (config.teaser) await fixture.componentInstance.finishTeaser(receipt(config));
      fixture.detectChanges();
      await fixture.whenStable();
      expect(element.querySelector('#product-heading')?.textContent).toBe(config.headline);
      expect(element.querySelector('app-project-product-preview')?.textContent).toContain(
        config.finalExample.title,
      );
      expect(element.querySelectorAll('.creation-path li')).toHaveLength(3);
      expect(
        element.querySelectorAll('.choice-card, input[type="radio"], .step-track'),
      ).toHaveLength(0);
      expect(element.querySelector('.demo-link')?.getAttribute('href')).toBe(
        `/projects/${config.projectId}/final-demo`,
      );
      expect(document.activeElement?.id).toBe('product-heading');
      fixture.destroy();
    }
  });

  it('saves student practice before entering and preserves the first receipt on replay', async () => {
    const fixture = await setup();
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const first = receipt();
    await fixture.componentInstance.finishTeaser(first);
    const replay = {
      ...first,
      timestamp: new Date(Date.now() + 1000).toISOString(),
      thinking: [{ step: 'prediction', answer: 'Same reaction' }],
    };
    await fixture.componentInstance.finishTeaser(replay);
    expect(fixture.componentInstance.runtime.snapshot()?.draft.teaser).toEqual(first);
    expect(fixture.componentInstance.runtime.snapshot()?.draft.practiceReplays).toEqual([replay]);
    expect(navigate).toHaveBeenCalledWith(['/projects', projectIntros[0].projectId, 'experience']);
    await fixture.componentInstance.finishTeaser(replay);
    expect(fixture.componentInstance.runtime.snapshot()?.draft.practiceReplays).toHaveLength(1);
    fixture.destroy();
  });

  it('puts the first task and real start action before optional project detail without collecting a goal', async () => {
    const fixture = await setup();
    await fixture.componentInstance.finishTeaser(receipt());
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.chat-preview')).toBeNull();
    expect(element.querySelector('#future-project-goal')).toBeNull();
    expect(element.querySelector('.first-task')?.textContent).toContain(
      projectIntros[0].mission[0],
    );
    const start = element.querySelector<HTMLButtonElement>('.first-task button')!;
    expect(start.disabled).toBe(false);
    expect(
      start.compareDocumentPosition(element.querySelector('.project-details')!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(fixture.componentInstance.runtime.snapshot()?.history).toEqual([]);
    fixture.destroy();
  });

  it('enters the workspace without a choice, goal, or fabricated accepted response', async () => {
    const fixture = await setup();
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const accept = vi.spyOn(fixture.componentInstance.runtime, 'accept');
    await fixture.componentInstance.finishTeaser(receipt());
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.primary-button').disabled).toBe(false);
    await fixture.componentInstance.enter();
    expect(navigate).toHaveBeenCalledWith(['/projects', projectIntros[0].projectId, 'experience']);
    expect(accept).not.toHaveBeenCalled();
    expect(fixture.componentInstance.runtime.snapshot()?.history).toEqual([]);
    expect(fixture.componentInstance.runtime.draft()).toMatchObject(EMPTY_INTRO_RESPONSE);
    fixture.destroy();
  });

  it('shows the story opening on a return visit and preserves the earlier scene choice', async () => {
    const config = projectIntros.find((item) => item.projectId === 'frontier-trading-company')!;
    const fixture = await setup(config);
    const firstReceipt = { ...receipt(config), choiceId: 'cloth' };
    await fixture.componentInstance.finishTeaser(firstReceipt);
    fixture.destroy();
    TestBed.resetTestingModule();
    const restored = await setup(config);
    expect(restored.componentInstance.teaserVisible()).toBe(true);
    expect(restored.nativeElement.querySelector('h1')?.textContent?.trim()).toBe(
      config.teaser?.type === 'decision-scene'
        ? (config.teaser.prologue?.title ?? config.teaser.prompt)
        : config.headline,
    );
    await restored.componentInstance.finishTeaser({ ...firstReceipt, choiceId: 'rope' });
    expect(restored.componentInstance.runtime.snapshot()?.draft.teaser).toEqual(firstReceipt);
    expect(restored.componentInstance.teaserVisible()).toBe(false);
    restored.destroy();
  });

  it('keeps Professor Pip visible even with saved planning history, then replaces only the questionnaire', async () => {
    const fixture = await setup();
    fixture.componentInstance.runtime.update({
      challengeChoiceId: 'observation',
      choiceId: 'vial-a',
      reason: 'Compare properties',
      question: 'Which test first?',
    });
    await fixture.componentInstance.runtime.accept('existing-opening');
    const savedHistory = fixture.componentInstance.runtime.snapshot()?.history;
    fixture.destroy();
    TestBed.resetTestingModule();
    const restored = await setup();
    const element = restored.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent?.trim()).toContain(
      'Will both samples react the same way?',
    );
    expect(element.querySelector('.illustration')?.getAttribute('aria-label')).toContain(
      'both look clear',
    );
    expect(element.querySelector('.test-button')?.textContent).toContain('Test my prediction');
    expect(element.querySelector('.chat-preview')).toBeNull();
    await restored.componentInstance.finishTeaser(receipt());
    restored.detectChanges();
    expect(element.querySelector('.first-task')).not.toBeNull();
    expect(element.querySelector('#future-project-goal')).toBeNull();
    expect(element.querySelectorAll('.choice-card, input[type="radio"], .step-track')).toHaveLength(
      0,
    );
    expect(restored.componentInstance.runtime.snapshot()?.history).toEqual(savedHistory);
    restored.destroy();
  });

  it('keeps existing saved responses intact when starting from the new product page', async () => {
    const fixture = await setup();
    const runtime = fixture.componentInstance.runtime;
    runtime.update({
      challengeChoiceId: 'observation',
      choiceId: 'vial-a',
      reason: 'Compare properties',
      question: 'Which test first?',
    });
    await runtime.accept('existing-opening');
    const previous = JSON.stringify(runtime.snapshot());
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    await fixture.componentInstance.enter();
    expect(JSON.stringify(runtime.snapshot())).toBe(previous);
    fixture.destroy();
  });

  it('protects the opening receipt when saving fails and retries its handoff', async () => {
    const fixture = await setup();
    const adapter = TestBed.inject(PROJECT_INTRO_PERSISTENCE);
    const save = adapter.save.bind(adapter);
    adapter.save = async () => {
      throw new Error('Unavailable');
    };
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const result = receipt();
    await fixture.componentInstance.finishTeaser(result);
    expect(fixture.componentInstance.teaserVisible()).toBe(true);
    expect(await fixture.componentInstance.canLeave()).toBe(false);
    await fixture.componentInstance.enter();
    expect(navigate).not.toHaveBeenCalled();
    adapter.save = save;
    await fixture.componentInstance.finishTeaser(result);
    expect(fixture.componentInstance.teaserVisible()).toBe(false);
    expect(fixture.componentInstance.runtime.snapshot()?.draft.teaser).toEqual(result);
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
