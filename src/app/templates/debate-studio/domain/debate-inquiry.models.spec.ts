import { describe, expect, it } from 'vitest';
import { hammurabiOnTrialConfig } from '../../../projects/hammurabi-on-trial/hammurabi-on-trial.config';
import { assembleBroadcastTimeline, createInitialDebateSession } from '../core/debate-studio-state';
import {
  emptyInquiryState,
  inquiryGateReady,
  inquiryTargetReady,
  validateDebateInquiry,
  type DebateInquiryState,
  type InquiryAttempt,
  type InquiryReview,
} from './debate-inquiry.models';

const config = hammurabiOnTrialConfig.inquiry!;
const sources = hammurabiOnTrialConfig.evidence.map((e) => e.id);
const attempt = (lesson: number, targetId?: string): InquiryAttempt => ({
  id: `${lesson}-${targetId ?? 'gate'}`,
  lesson,
  targetId,
  prompt: 'Explain with evidence.',
  response: 'A personal response.',
  mode: 'independent',
  createdAt: '2026-09-14T00:00:00Z',
});
const review = (attemptId: string): InquiryReview => ({
  attemptId,
  authority: 'demo',
  decision: 'ready',
  reviewerId: 'teacher-preview',
  feedback: 'Reasoning checked against the cited source.',
  createdAt: '2026-09-14T00:00:01Z',
});

describe('debate inquiry capability', () => {
  it('validates the real eight-lesson package and all source references', () => {
    expect(() => validateDebateInquiry(config, sources)).not.toThrow();
    expect(config.targets.filter((t) => t.standardId === 'FF.G6.SS.10').map((t) => t.id)).toEqual([
      'monarchy',
      'empire',
      'hierarchy',
      'polytheism',
      'cuneiform',
      'architecture',
      'literature',
      'code',
    ]);
    expect(new Set(config.targets.map((t) => t.standardId)).size).toBe(4);
    expect(hammurabiOnTrialConfig.seedTurns).toEqual([]);
  });
  it('rejects missing sources, duplicate IDs, and cyclic/future gate dependencies', () => {
    expect(() => validateDebateInquiry(config, [])).toThrow('DEBATE_INQUIRY_INVALID');
    expect(() =>
      validateDebateInquiry(
        { ...config, targets: [...config.targets, config.targets[0]!] },
        sources,
      ),
    ).toThrow('DEBATE_INQUIRY_INVALID');
    expect(() =>
      validateDebateInquiry(
        {
          ...config,
          lessons: config.lessons.map((l) => (l.number === 2 ? { ...l, requiresGate: 'h-c' } : l)),
        },
        sources,
      ),
    ).toThrow('Gate must reference an earlier lesson');
  });
  it('does not unlock gates from writing, submitting, or a later reviewed gate alone', () => {
    const a = attempt(4);
    const state: DebateInquiryState = {
      drafts: { answer: 'Filled in' },
      attempts: [a],
      reviews: { [a.id]: review(a.id) },
    };
    expect(inquiryGateReady(config, state, 'h-a')).toBe(false);
    expect(inquiryGateReady(config, state, 'h-b')).toBe(false);
    expect(inquiryGateReady(config, state, 'unknown')).toBe(false);
  });
  it('requires the latest response to be reviewed and invalidates dependent readiness after a retry', () => {
    const a = attempt(2),
      b = attempt(4),
      retry = { ...a, id: 'retry' };
    const state: DebateInquiryState = {
      drafts: {},
      attempts: [a, b],
      reviews: { [a.id]: review(a.id), [b.id]: review(b.id) },
    };
    expect(inquiryGateReady(config, state, 'h-b')).toBe(true);
    expect(
      inquiryGateReady(config, { ...state, attempts: [...state.attempts, retry] }, 'h-b'),
    ).toBe(false);
  });
  it('never equates a law check or a gate with the complete civilization standard', () => {
    const a = attempt(7, 'code');
    const state: DebateInquiryState = {
      ...emptyInquiryState(),
      attempts: [a],
      reviews: { [a.id]: review(a.id) },
    };
    expect(inquiryTargetReady(state, 'code')).toBe(true);
    expect(
      config.targets
        .filter((t) => t.standardId === 'FF.G6.SS.10')
        .every((t) => inquiryTargetReady(state, t.id)),
    ).toBe(false);
    expect(inquiryGateReady(config, state, 'h-c')).toBe(false);
  });
  it('uses the configured setting in the final hearing timeline', () => {
    const timeline = assembleBroadcastTimeline(
      hammurabiOnTrialConfig,
      createInitialDebateSession(hammurabiOnTrialConfig),
    );
    expect(timeline[0]?.roundLabel).toContain('Hearing');
    expect(JSON.stringify(timeline)).not.toMatch(/Senate|Rome|SPQR/);
  });
});
