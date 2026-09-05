import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { historyLiveRevolutionaryWarConfig as config } from '../../../projects/history-live-revolutionary-war/history-live-revolutionary-war.config';
import {
  HISTORY_LIVE_AUTHORITY,
  HISTORY_LIVE_CONFIG,
  HISTORY_LIVE_ENROLLMENT,
  HISTORY_LIVE_MEDIA,
} from './history-live.tokens';
import {
  BrowserHistoryLivePersistenceAdapter,
  HISTORY_LIVE_PERSISTENCE,
} from '../persistence/history-live.persistence';
import { HistoryLiveRuntimeService } from './history-live-runtime.service';
import { BroadcastPlayerComponent } from '../ui/broadcast-player.component';
import type { HistoryLiveEnrollment } from '../domain/history-live.models';
import { createInitialHistoryLiveState } from '../core/history-live-state';
import { isHistoryLiveSnapshot } from '../core/history-live-snapshot';
import { stageIssues, validateHistoryLiveContent } from '../core/history-live-quality';

const enrollment: HistoryLiveEnrollment = {
  tenantId: 'test',
  classId: 'class-a',
  studentId: 'reporter-a',
  studentDisplayName: 'Reporter',
  teacherDisplayName: 'Producer',
  classLabel: 'Test class',
  mode: 'demo',
  role: 'student',
  permissions: [],
};

describe('History Live classroom workflow', () => {
  let runtime: HistoryLiveRuntimeService;
  let persistence: BrowserHistoryLivePersistenceAdapter;
  function setup(context = enrollment, gateway?: unknown, media?: unknown) {
    persistence = new BrowserHistoryLivePersistenceAdapter(context);
    TestBed.configureTestingModule({
      providers: [
        HistoryLiveRuntimeService,
        { provide: HISTORY_LIVE_CONFIG, useValue: config },
        { provide: HISTORY_LIVE_ENROLLMENT, useValue: context },
        { provide: HISTORY_LIVE_PERSISTENCE, useValue: persistence },
        ...(gateway ? [{ provide: HISTORY_LIVE_AUTHORITY, useValue: gateway }] : []),
        ...(media ? [{ provide: HISTORY_LIVE_MEDIA, useValue: media }] : []),
      ],
    });
    runtime = TestBed.inject(HistoryLiveRuntimeService);
  }
  beforeEach(() => {
    localStorage.clear();
    setup();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
  });
  function pitch() {
    runtime.chooseSide('patriot');
    runtime.claimStory(config.storyLeads[0]);
    runtime.updatePitch('initialPrediction', 'The witnesses may disagree about who fired first.');
    runtime.updatePitch('opposingChallenge', 'The Crown may describe the march as a lawful order.');
  }
  async function research() {
    pitch();
    await runtime.submitPitch();
    runtime.setRole('producer');
    await runtime.reviewPitch('approved', 'Focused question.');
    runtime.setRole('student');
    runtime.toggleSource('source-parker');
    runtime.toggleSource('source-gage');
    runtime.addClaim(
      'The documents describe different purposes for the confrontation.',
      'strongly-supported',
      [
        {
          sourceId: 'source-parker',
          passage: 'Parker describes ordering the militia to disperse.',
          relationship: 'supports',
        },
        {
          sourceId: 'source-gage',
          passage: 'The orders focus on the seizure of military stores.',
          relationship: 'challenges',
        },
      ],
      'Orders show intended actions; testimony describes a participant’s experience.',
    );
  }
  async function packageReady() {
    await research();
    for (const block of runtime.state().scriptBlocks)
      runtime.updateScriptBlock(
        block.id,
        'This report explains what the documents establish and what remains uncertain.',
      );
    runtime.linkScriptClaim('script-evidence', runtime.state().claims[0].id);
    for (const scene of runtime.state().visualSequence) {
      runtime.updateScene(scene.id, 'sourceId', 'source-parker');
      runtime.updateScene(
        scene.id,
        'caption',
        'Parker’s testimony records his account of the confrontation.',
      );
    }
    await runtime.markReadyToAir();
  }
  it('validates all source packets and dates', () => {
    expect(validateHistoryLiveContent(config)).toEqual([]);
    expect(runtime.configurationErrors).toEqual([]);
  });
  it('does not unlock work from placeholder scenes or visiting a later screen', () => {
    expect(runtime.canOpen('production')).toBe(false);
    expect(runtime.canOpen('broadcast')).toBe(false);
    runtime.state.update((state) => ({ ...state, stage: 'showcase' }));
    expect(runtime.canOpen('sources')).toBe(false);
  });
  it('debounces text saves and restores the final draft after reload', () => {
    vi.useFakeTimers();
    pitch();
    const save = vi.spyOn(persistence, 'save');
    runtime.updatePitch('headline', 'A revised report headline');
    runtime.updatePitch('headline', 'The final revised report headline');
    expect(runtime.saveState()).toBe('unsaved');
    expect(save).not.toHaveBeenCalled();
    vi.advanceTimersByTime(701);
    expect(save).toHaveBeenCalledTimes(1);
    expect(runtime.saveState()).toBe('saved');
    expect(persistence.load(config.projectId, config.projectVersion)?.pitch.headline).toBe(
      'The final revised report headline',
    );
    expect(
      runtime.state().eventHistory.some((event) => event.eventType === 'pitch.draftChanged'),
    ).toBe(false);
  });
  it('flushes drafts when the page leaves', () => {
    pitch();
    runtime.updatePitch('headline', 'A draft before browser navigation');
    window.dispatchEvent(new Event('pagehide'));
    expect(persistence.load(config.projectId, config.projectVersion)?.pitch.headline).toBe(
      'A draft before browser navigation',
    );
  });
  it('reports failed storage rather than saved', () => {
    vi.spyOn(persistence, 'save').mockImplementation(() => {
      throw new Error('Quota exceeded');
    });
    runtime.chooseSide('patriot');
    expect(runtime.saveState()).toBe('error');
    expect(runtime.error()).toContain('Quota');
  });
  it('requires a separate producer review and preserves revision feedback', async () => {
    pitch();
    await runtime.submitPitch();
    expect(runtime.state().pitch.status).toBe('submitted');
    await runtime.reviewPitch('approved', '');
    expect(runtime.state().pitch.status).toBe('submitted');
    runtime.setRole('producer');
    await runtime.reviewPitch('revise', 'Compare the opposing accounts.');
    expect(runtime.state().pitch.status).toBe('revise');
    expect(runtime.state().pitchHistory).toHaveLength(1);
    expect(runtime.state().reviewHistory).toHaveLength(1);
  });
  it('links only chosen passages and rejects unsupported claims', async () => {
    await research();
    expect(runtime.state().claims[0].supportingSourceIds).toEqual(['source-parker']);
    runtime.addClaim('A claim with no chosen passages.', 'verified');
    expect(runtime.state().claims).toHaveLength(1);
    runtime.toggleSource('source-parker');
    expect(runtime.canOpen('script')).toBe(false);
  });
  it('blocks later evidence unless reporting is explicitly retrospective', async () => {
    await research();
    runtime.toggleSource('source-declaration');
    expect(runtime.canOpen('script')).toBe(false);
    const state = {
      ...runtime.state(),
      pitch: { ...runtime.state().pitch, reportingMode: 'retrospective' as const },
    };
    expect(stageIssues(state, 'script', config)).toEqual([]);
  });
  it('submits a complete package, clears it on review, and revokes clearance after an edit', async () => {
    await packageReady();
    expect(runtime.state().packageStatus).toBe('submitted');
    expect(runtime.state().schedule).toHaveLength(0);
    runtime.setRole('producer');
    await runtime.reviewPackage('approved', 'Evidence linked and uncertainty explained.');
    expect(runtime.state().schedule).toHaveLength(1);
    expect(runtime.state().schedule[0].script).toHaveLength(3);
    runtime.updateScriptBlock(
      'script-open',
      'This is a changed opening that needs another review.',
    );
    expect(runtime.state().studentSegmentReady).toBe(false);
    expect(runtime.state().schedule).toHaveLength(0);
  });
  it('shows the active class segment instead of always showing the current reporter', async () => {
    await packageReady();
    runtime.setRole('producer');
    await runtime.reviewPackage('approved', 'Ready.');
    runtime.state.update((state) => ({
      ...state,
      stage: 'showcase',
      schedule: [...state.schedule, config.seedSegments[0]],
      activeSegmentIndex: 1,
    }));
    const component = TestBed.runInInjectionContext(() => new BroadcastPlayerComponent());
    expect(component.previewSegment()?.id).toBe(config.seedSegments[0].id);
    runtime.state.update((state) => ({ ...state, stage: 'broadcast' }));
    expect(component.previewSegment()?.id).toBe(runtime.currentStudentSegmentId);
  });
  it('prevents a classroom student from switching role or issuing show controls', async () => {
    TestBed.resetTestingModule();
    setup({ ...enrollment, mode: 'classroom' });
    runtime.setRole('producer');
    await runtime.endShow();
    expect(runtime.state().role).toBe('student');
    expect(runtime.state().showStatus).toBe('ready');
  });
  it('fails closed without an authoritative classroom adapter', async () => {
    TestBed.resetTestingModule();
    setup({ ...enrollment, mode: 'classroom' });
    pitch();
    await runtime.submitPitch();
    expect(runtime.state().pitch.status).toBe('draft');
    expect(runtime.error()).toContain('CAPABILITY_NOT_INSTALLED');
  });
  it('does not turn a rejected server submission into approval', async () => {
    TestBed.resetTestingModule();
    const execute = vi.fn().mockResolvedValue({ operationId: 'x', status: 'rejected' });
    setup({ ...enrollment, mode: 'classroom' }, { execute });
    pitch();
    await runtime.submitPitch();
    expect(runtime.state().pitch.status).toBe('draft');
    expect(execute).toHaveBeenCalledOnce();
    expect(runtime.busy()).toBe(false);
  });
  it('stores a media reference and restores the recording through the adapter after reload', async () => {
    TestBed.resetTestingModule();
    const media = {
      upload: vi.fn().mockResolvedValue({ id: 'asset-a' }),
      getReference: vi
        .fn()
        .mockResolvedValue({ id: 'asset-a', reference: 'https://media.example/report.webm' }),
    };
    setup(enrollment, undefined, media);
    await runtime.storeRecording(new Blob(['test video bytes'], { type: 'video/webm' }));
    expect(runtime.state().recordingAssetId).toBe('asset-a');
    expect(persistence.load(config.projectId, config.projectVersion)?.recordingAssetId).toBe(
      'asset-a',
    );
    TestBed.resetTestingModule();
    setup(enrollment, undefined, media);
    await Promise.resolve();
    expect(runtime.recordingUrl()).toBe('https://media.example/report.webm');
  });
  it('does not mark an upload ready when object storage rejects it', async () => {
    TestBed.resetTestingModule();
    setup(enrollment, undefined, { upload: vi.fn().mockRejectedValue(new Error('Storage full')) });
    await runtime.storeRecording(new Blob(['video'], { type: 'video/webm' }));
    expect(runtime.state().recordingAssetId).toBeUndefined();
    expect(runtime.recordingState()).toBe('idle');
    expect(runtime.error()).toBe('Storage full');
  });
  it('does not allow a late upload to restore a reset workspace', async () => {
    TestBed.resetTestingModule();
    let finish!: (value: { id: string }) => void;
    setup(enrollment, undefined, {
      upload: () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    });
    runtime.setRole('producer');
    const pending = runtime.storeRecording(new Blob(['video'], { type: 'video/webm' }));
    runtime.resetDemo();
    finish({ id: 'late-asset' });
    await pending;
    expect(runtime.state().recordingAssetId).toBeUndefined();
    expect(runtime.recordingState()).toBe('idle');
  });
  it('retains distinct reflection revisions without duplicating a repeated save', () => {
    runtime.updateReflection(
      'I revised my claim because the second account described a different sequence.',
    );
    runtime.saveReflection();
    runtime.saveReflection();
    runtime.updateReflection(
      'I now distinguish the stated orders from the witness account of what happened.',
    );
    runtime.saveReflection();
    expect(runtime.state().reflectionHistory).toHaveLength(2);
  });
});

describe('History Live persistence boundaries', () => {
  beforeEach(() => localStorage.clear());
  it('isolates learners, classes, tenants, and curriculum versions', () => {
    const first = new BrowserHistoryLivePersistenceAdapter(enrollment);
    first.save(config.projectId, config.projectVersion, createInitialHistoryLiveState(config));
    for (const scope of [
      { ...enrollment, studentId: 'b' },
      { ...enrollment, classId: 'b' },
      { ...enrollment, tenantId: 'b' },
    ])
      expect(
        new BrowserHistoryLivePersistenceAdapter(scope).load(
          config.projectId,
          config.projectVersion,
        ),
      ).toBeUndefined();
    expect(first.load(config.projectId, 'different-version')).toBeUndefined();
  });
  it('detects another tab’s newer write', () => {
    const first = new BrowserHistoryLivePersistenceAdapter(enrollment),
      second = new BrowserHistoryLivePersistenceAdapter(enrollment);
    first.load(config.projectId, config.projectVersion);
    second.load(config.projectId, config.projectVersion);
    first.save(config.projectId, config.projectVersion, createInitialHistoryLiveState(config));
    expect(() =>
      second.save(config.projectId, config.projectVersion, createInitialHistoryLiveState(config)),
    ).toThrow('STATE_CONFLICT');
  });
  it('rejects corrupt nested snapshots before accessing their arrays', () => {
    expect(isHistoryLiveSnapshot({ schemaVersion: '1.0' })).toBe(false);
    expect(
      isHistoryLiveSnapshot({ ...createInitialHistoryLiveState(config), scriptBlocks: null }),
    ).toBe(false);
    expect(
      isHistoryLiveSnapshot({ ...createInitialHistoryLiveState(config), activeSegmentIndex: -1 }),
    ).toBe(false);
    expect(isHistoryLiveSnapshot(createInitialHistoryLiveState(config))).toBe(true);
  });
});
