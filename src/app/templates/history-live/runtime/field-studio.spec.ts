import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InquiryWorkspaceComponent } from '../../../shared/inquiry/inquiry-workspace.component';
import { InquiryExampleComponent } from '../../../shared/inquiry/inquiry-example.component';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { expeditionNewsNetworkConfig as config } from '../../../projects/expedition-news-network/expedition-news-network.config';
import { inquiryTargetReady, isInquiryState } from '../../../shared/inquiry/inquiry.models';
import { validateFieldStudio } from '../core/field-studio.validation';
import { validateHistoryLiveContent } from '../core/history-live-quality';
import {
  interleaveBroadcastSegments,
  validateHistoryLiveVisualConfig,
} from '../core/history-live-state';
import { isHistoryLiveSnapshot } from '../core/history-live-snapshot';
import {
  BrowserHistoryLivePersistenceAdapter,
  HISTORY_LIVE_PERSISTENCE,
} from '../persistence/history-live.persistence';
import {
  HISTORY_LIVE_CONFIG,
  HISTORY_LIVE_ENROLLMENT,
  HISTORY_LIVE_MEDIA,
} from './history-live.tokens';
import { HistoryLiveRuntimeService } from './history-live-runtime.service';
import { FieldNewsroomComponent } from '../ui/field-newsroom.component';
import type { HistoryLiveEnrollment } from '../domain/history-live.models';

const context: HistoryLiveEnrollment = {
  tenantId: 'field-test',
  classId: 'class',
  studentId: 'learner',
  studentDisplayName: 'Reporter',
  teacherDisplayName: 'Teacher preview',
  classLabel: 'Class',
  mode: 'demo',
  role: 'student',
  permissions: [],
};
describe('Shared inquiry field newsroom', () => {
  let runtime: HistoryLiveRuntimeService;
  let storage: BrowserHistoryLivePersistenceAdapter;
  const media = { upload: vi.fn(), getReference: vi.fn() };
  beforeEach(() => {
    localStorage.clear();
    media.upload.mockReset();
    media.getReference.mockReset();
    storage = new BrowserHistoryLivePersistenceAdapter(context);
    TestBed.configureTestingModule({
      providers: [
        HistoryLiveRuntimeService,
        { provide: HISTORY_LIVE_CONFIG, useValue: config },
        { provide: HISTORY_LIVE_ENROLLMENT, useValue: context },
        { provide: HISTORY_LIVE_PERSISTENCE, useValue: storage },
        { provide: HISTORY_LIVE_MEDIA, useValue: media },
      ],
    });
    runtime = TestBed.inject(HistoryLiveRuntimeService);
  });
  afterEach(() => TestBed.resetTestingModule());
  function submit(number: number) {
    const lesson = config.inquiry!.lessons[number - 1]!;
    for (const field of lesson.fields)
      runtime.updateInquiryDraft(
        `lesson-${number}-${field.id}`,
        `Personal evidence for ${field.label}, citing the expedition memoir and chronology.`,
      );
    expect(
      runtime.submitInquiryAttempt(
        number,
        lesson.check,
        'Independent explanation with source support.',
      ),
    ).toBe(true);
    return runtime.inquiryState().attempts.at(-1)!;
  }
  function gate(number: number) {
    const attempt = submit(number);
    runtime.setRole('producer');
    runtime.reviewInquiryAttempt(
      attempt.id,
      'ready',
      'Reviewed the complete individual work and source reasoning.',
    );
  }
  function finalDraft() {
    runtime.updateInquiryDraft('studio-headline', 'A mission changed by ice');
    runtime.updateInquiryDraft('studio-visual', 'route');
    runtime.updateInquiryDraft(
      'studio-media-reason',
      'The arrows show how the goal changed from crossing to seeking help.',
    );
    runtime.updateInquiryDraft(
      'studio-performance',
      'I will present my section live in class; teacher will observe the speaking skills.',
    );
    runtime.updateTranscript(
      'My own report, explaining preparation, changing plans, and the evidence. Source: Shackleton, South.',
    );
  }
  it('validates the six standards, eight lessons, source packet, and optional profile', () => {
    expect(() => validateFieldStudio(config)).not.toThrow();
    expect(validateHistoryLiveContent(config)).toEqual([]);
    expect(validateHistoryLiveVisualConfig(config)).toEqual([]);
    expect(config.inquiry!.lessons).toHaveLength(8);
    expect(new Set(config.inquiry!.targets.map((t) => t.standardId)).size).toBe(6);
    expect(config.seedSegments).toEqual([]);
    expect(() =>
      validateFieldStudio({
        ...config,
        fieldStudio: { ...config.fieldStudio!, recordingGateId: 'missing' },
      }),
    ).toThrow('FIELD_STUDIO_INVALID');
  });
  it('requires work before a check and an individual reviewed gate before dependent work', () => {
    expect(runtime.submitInquiryAttempt(2, 'E-A', 'A response without the work.')).toBe(false);
    expect(runtime.submitInquiryAttempt(3, 'Read', 'An answer that skips E-A.')).toBe(false);
    const attempt = submit(2);
    runtime.reviewInquiryAttempt(attempt.id, 'ready', 'Student cannot self-approve.');
    expect(runtime.inquiryGate('e-a')).toBe(false);
    runtime.setRole('producer');
    runtime.reviewInquiryAttempt(attempt.id, 'ready', 'Checked source and relevance.');
    expect(runtime.inquiryGate('e-a')).toBe(true);
    submit(3);
  });
  it('keeps immutable attempt evidence, invalidates changed work and preserves review history', () => {
    gate(2);
    gate(4);
    gate(7);
    expect(runtime.inquiryGate('e-c')).toBe(true);
    const earlier = runtime.inquiryState().attempts[0]!;
    runtime.updateInquiryDraft('lesson-2-plan', 'Changed plan requiring another check.');
    expect(earlier.evidenceDrafts!['lesson-2-plan']).not.toContain('Changed plan');
    expect(runtime.inquiryGate('e-a')).toBe(false);
    expect(runtime.inquiryGate('e-c')).toBe(false);
    expect(runtime.inquiryState().reviewHistory).toHaveLength(3);
    submit(2);
    expect(runtime.inquiryGate('e-a')).toBe(false);
  });
  it('requires observed evidence for speaking and listening target reviews', () => {
    runtime.submitInquiryAttempt(1, 'Present', 'My written explanation.', 'presentation');
    const attempt = runtime.inquiryState().attempts.at(-1)!;
    runtime.setRole('producer');
    runtime.reviewInquiryAttempt(attempt.id, 'ready', 'Read the explanation.');
    expect(inquiryTargetReady(runtime.inquiryState(), 'presentation')).toBe(false);
    runtime.reviewInquiryAttempt(
      attempt.id,
      'ready',
      'Observed logical sequence, media use, and audience language.',
      'Teacher observed learner’s live presentation in lesson 8.',
    );
    expect(inquiryTargetReady(runtime.inquiryState(), 'presentation')).toBe(true);
    expect(runtime.inquiryState().reviews[attempt.id].performanceEvidence).toContain('lesson 8');
  });
  it('blocks recording before E-B and validates uploads before using the adapter', async () => {
    await runtime.storeRecording(new Blob(['audio'], { type: 'audio/webm' }));
    expect(media.upload).not.toHaveBeenCalled();
    gate(2);
    gate(4);
    await runtime.storeRecording(new Blob(['document'], { type: 'text/plain' }));
    expect(media.upload).not.toHaveBeenCalled();
    media.upload.mockResolvedValue({ id: 'recording-one' });
    media.getReference.mockResolvedValue({ reference: 'blob:test-audio' });
    await runtime.storeRecording(new Blob(['audio'], { type: 'audio/webm' }));
    expect(media.upload).toHaveBeenCalledOnce();
    expect(runtime.state().recordingAssetId).toBe('recording-one');
  });
  it('prepares one final section idempotently after E-C and invalidates it on edits', () => {
    gate(2);
    gate(4);
    finalDraft();
    expect(runtime.prepareInquirySegment()).toBe(false);
    gate(7);
    expect(runtime.prepareInquirySegment()).toBe(true);
    const revision = runtime.state().revision;
    expect(runtime.prepareInquirySegment()).toBe(true);
    expect(runtime.state().revision).toBe(revision);
    expect(runtime.state().schedule).toHaveLength(1);
    expect(runtime.state().packageStatus).toBe('draft');
    runtime.updateTranscript('A changed report.');
    expect(runtime.state().studentSegmentReady).toBe(false);
    expect(runtime.state().schedule).toEqual([]);
  });
  it('saves a valid scoped snapshot and rejects malformed learner work', () => {
    gate(2);
    runtime.flushDrafts();
    const saved = storage.load(config.projectId, config.projectVersion)!;
    expect(saved.selectedSide).toBe('expedition');
    expect(isHistoryLiveSnapshot(saved)).toBe(true);
    expect(
      isHistoryLiveSnapshot({ ...saved, inquiry: { drafts: [], attempts: [], reviews: {} } }),
    ).toBe(false);
    expect(isInquiryState({ ...saved.inquiry, reviews: { unknown: { decision: 'ready' } } })).toBe(
      false,
    );
    expect(
      new BrowserHistoryLivePersistenceAdapter({ ...context, studentId: 'another-learner' }).load(
        config.projectId,
        config.projectVersion,
      ),
    ).toBeUndefined();
  });
  it('round-robins arbitrary networks without losing a reporter', () => {
    gate(2);
    gate(4);
    gate(7);
    finalDraft();
    runtime.prepareInquirySegment();
    const segment = runtime.state().schedule[0]!;
    const values = [
      { ...segment, id: 'a1', side: 'a' },
      { ...segment, id: 'a2', side: 'a' },
      { ...segment, id: 'b1', side: 'b' },
      { ...segment, id: 'c1', side: 'c' },
    ];
    expect(interleaveBroadcastSegments(values).map((s) => s.id)).toEqual(['a1', 'b1', 'c1', 'a2']);
  });
  it('renders the shared reading workspace without Revolutionary War labels', () => {
    const fixture = TestBed.createComponent(FieldNewsroomComponent);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Meet the expedition');
    expect(text).toContain('Read a source');
    expect(text).not.toMatch(/Patriot|British|civilization concepts/);
    expect(
      fixture.nativeElement
        .querySelector('.field-newsroom')
        .style.getPropertyValue('--newsroom-image'),
    ).toContain('expedition-newsroom-v1.png');
  });
  it('keeps work exportable and reports storage failure honestly', () => {
    vi.spyOn(storage, 'save').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });
    runtime.updateInquiryDraft('lesson-1-reading', 'Work that must stay in memory.');
    runtime.flushDrafts();
    expect(runtime.saveState()).toBe('error');
    expect(runtime.inquiryState().drafts['lesson-1-reading']).toContain('memory');
    expect(runtime.error()).toContain('Storage unavailable');
  });
  it('lets learners seek through the final model while E-C still blocks their own final work', async () => {
    const fixture = TestBed.createComponent(FieldNewsroomComponent);
    fixture.detectChanges();
    const workspace: InquiryWorkspaceComponent = fixture.debugElement.query(
      By.directive(InquiryWorkspaceComponent),
    ).componentInstance;
    workspace.lessonNumber.set(8);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const before = JSON.stringify(runtime.state());
    expect(workspace.blocked()).toBe(true);
    const model: InquiryExampleComponent = fixture.debugElement.query(
      By.directive(InquiryExampleComponent),
    ).componentInstance;
    expect(model.example().lesson).toBe(8);
    const video = model.player()!.nativeElement;
    vi.spyOn(video, 'pause').mockImplementation(() => undefined);
    video.dispatchEvent(new Event('loadedmetadata'));
    model.jump(3);
    expect(video.currentTime).toBeGreaterThan(80);
    expect(runtime.inquiryGate('e-c')).toBe(false);
    expect(fixture.nativeElement.querySelector('.response-card textarea').disabled).toBe(true);
    expect(JSON.stringify(runtime.state())).toBe(before);
    expect(runtime.inquiryState().attempts).toEqual([]);
    expect(runtime.state().schedule).toEqual([]);
  });
  it('removes the launch model during an independent check and restores it in practice', () => {
    const fixture = TestBed.createComponent(FieldNewsroomComponent);
    fixture.detectChanges();
    const workspace: InquiryWorkspaceComponent = fixture.debugElement.query(
      By.directive(InquiryWorkspaceComponent),
    ).componentInstance;
    expect(fixture.nativeElement.querySelector('app-inquiry-example')).not.toBeNull();
    workspace.startCheck();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-inquiry-example')).toBeNull();
    workspace.checking.set(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-inquiry-example')).not.toBeNull();
    expect(runtime.inquiryState().drafts).toEqual({});
  });
});
