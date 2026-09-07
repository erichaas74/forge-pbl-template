import { TestBed } from '@angular/core/testing';
import { createLocalPreviewSession } from '../../core/context/project-session-context';
import { BrowserProjectIntroAdapter } from '../../infrastructure/persistence/browser-project-intro.adapter';
import { projectIntros } from '../../projects/project-intros';
import {
  IntroError,
  type IntroPersistenceAdapter,
  type IntroResponse,
  type IntroScope,
  type IntroSnapshot,
} from './project-intro.models';
import { PROJECT_INTRO_PERSISTENCE, ProjectIntroRuntime } from './project-intro.runtime';

const config = projectIntros[0];
const scope: IntroScope = {
  session: createLocalPreviewSession(config.projectId, '1.0.0'),
  introVersion: config.version,
};
const response: IntroResponse = {
  challengeChoiceId: config.challenge.options[0].id,
  choiceId: config.decision.options[0].id,
  reason: 'I want to compare properties before guessing.',
  question: 'Which test could distinguish the samples?',
  confidence: 'exploring',
};

describe('project opening records', () => {
  let adapter: BrowserProjectIntroAdapter;
  beforeEach(() => {
    localStorage.clear();
    adapter = new BrowserProjectIntroAdapter(localStorage);
    TestBed.configureTestingModule({
      providers: [ProjectIntroRuntime, { provide: PROJECT_INTRO_PERSISTENCE, useValue: adapter }],
    });
  });

  async function runtime() {
    const service = TestBed.inject(ProjectIntroRuntime);
    await service.initialize(scope, config);
    return service;
  }

  it('keeps the first accepted response when a revision is saved and survives reload', async () => {
    const service = await runtime();
    service.update(response);
    expect(await service.accept('first-event')).toBe(true);
    service.update({
      reason: 'After looking at the evidence, I would change the order of my tests.',
    });
    expect(await service.accept('revision-event')).toBe(true);
    const saved = await adapter.load(scope);
    expect(saved?.history.map((item) => item.eventType)).toEqual([
      'projectIntro.accepted',
      'projectIntro.revised',
    ]);
    expect(saved?.history[0].response).toEqual(response);
    expect(saved?.history[1].response.reason).toContain('change the order');
    await service.initialize(scope, config);
    expect(service.draft().reason).toContain('change the order');
  });

  it('makes accepted-event retries idempotent and keeps drafts out of the response history', async () => {
    const service = await runtime();
    service.update(response);
    await service.saveDraft();
    expect(service.snapshot()?.history).toEqual([]);
    await service.accept('same-event');
    await service.accept('same-event');
    expect(service.snapshot()?.history).toHaveLength(1);
  });

  it('does not accept an incomplete response or a choice outside the configuration', async () => {
    const service = await runtime();
    service.update({ ...response, question: '   ' });
    expect(await service.accept()).toBe(false);
    service.update({ ...response, choiceId: 'unknown' });
    expect(await service.accept()).toBe(false);
    expect(await adapter.load(scope)).toBeUndefined();
  });

  it('isolates responses by tenant, class, learner, team, attempt, project and versions', async () => {
    const service = await runtime();
    service.update(response);
    await service.accept('first-event');
    for (const key of [
      'tenantId',
      'classId',
      'studentId',
      'teamId',
      'attemptId',
      'projectId',
      'projectVersion',
    ] as const) {
      expect(
        await adapter.load({ ...scope, session: { ...scope.session, [key]: 'another' } }),
      ).toBeUndefined();
    }
    expect(await adapter.load({ ...scope, introVersion: '2.0.0' })).toBeUndefined();
  });

  it('rejects stale writes without overwriting the other tab’s saved response', async () => {
    const service = await runtime();
    service.update(response);
    await service.accept('first-event');
    const original = (await adapter.load(scope))!;
    const newer: IntroSnapshot = {
      ...original,
      revision: original.revision + 1,
      draft: { ...response, question: 'A question from another tab' },
    };
    await adapter.save(scope, newer, original.revision);
    service.update({ question: 'My still-unsaved question' });
    expect(await service.saveDraft()).toBe(false);
    expect(service.dirty()).toBe(true);
    expect(service.error()).toContain('another tab');
    expect((await adapter.load(scope))?.draft.question).toBe('A question from another tab');
  });

  it('retains unreadable browser records instead of silently replacing them', async () => {
    const service = await runtime();
    service.update(response);
    await service.saveDraft();
    const key = localStorage.key(0)!;
    localStorage.setItem(key, '{broken');
    await expect(adapter.load(scope)).rejects.toMatchObject({ code: 'STATE_INVALID' });
    expect(localStorage.getItem(key)).toBe('{broken');
  });

  it('retains text after failure and can retry a temporarily unavailable adapter', async () => {
    TestBed.resetTestingModule();
    let unavailable = true;
    const retryAdapter: IntroPersistenceAdapter = {
      saveLocation: 'Test saved',
      load: (target) =>
        unavailable
          ? Promise.reject(new IntroError('SAVE_FAILED', 'Unavailable'))
          : adapter.load(target),
      save: (target, snapshot, revision) => adapter.save(target, snapshot, revision),
    };
    TestBed.configureTestingModule({
      providers: [
        ProjectIntroRuntime,
        { provide: PROJECT_INTRO_PERSISTENCE, useValue: retryAdapter },
      ],
    });
    const service = await runtime();
    service.update(response);
    expect(await service.accept('retry-event')).toBe(false);
    expect(service.draft()).toEqual(response);
    unavailable = false;
    expect(await service.accept('retry-event')).toBe(true);
    expect(service.error()).toBeUndefined();
  });
});
