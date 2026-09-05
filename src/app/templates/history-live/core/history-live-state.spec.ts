import { describe, expect, it } from 'vitest';

import type {
  BroadcastSegment,
  HistoryLivePitch,
  HistoryLiveProjectConfig,
} from '../domain/history-live.models';
import {
  EMPTY_PITCH,
  interleaveBroadcastSegments,
  isPitchReady,
  validateHistoryLiveVisualConfig,
} from './history-live-state';

describe('history live state helpers', () => {
  it('requires a focused, evidence-aware story pitch', () => {
    expect(isPitchReady(EMPTY_PITCH)).toBe(false);
    const pitch: HistoryLivePitch = {
      ...EMPTY_PITCH,
      beatId: 'military',
      headline: 'Why Saratoga changed the war',
      storyQuestion: 'Why did Saratoga change British strategy?',
      whyAirtime: 'It changed the international and military stakes.',
      evidenceNeeded: 'Campaign reports and a map of the battle.',
      initialPrediction: 'Logistics and command choices affected the campaign.',
      opposingChallenge: 'What evidence challenges our account of the defeat?',
      asOfDate: '1777-10-31',
    };
    expect(isPitchReady(pitch)).toBe(true);
  });

  it('alternates network perspectives when both are available', () => {
    const segment = (id: string, side: 'patriot' | 'british'): BroadcastSegment => ({
      id,
      side,
      reporter: id,
      networkName: id,
      headline: id,
      desk: 'Desk',
      durationSeconds: 120,
      startLabel: '7:00',
      ready: true,
      visualLabel: id,
    });
    const ordered = interleaveBroadcastSegments([
      segment('p1', 'patriot'),
      segment('p2', 'patriot'),
      segment('b1', 'british'),
      segment('b2', 'british'),
    ]);
    expect(ordered.map((item) => item.side)).toEqual(['patriot', 'british', 'patriot', 'british']);
  });

  it('requires each story lead to map to one visible period advocate', () => {
    const config = {
      networks: [{ id: 'network-a', deskImageUrl: '/desk.png', deskImageAlt: 'Period news desk.' }],
      storyLeads: [{ id: 'lead-a', side: 'patriot' }],
      assignmentScenes: [
        {
          side: 'patriot',
          imageUrl: '/room.png',
          imageAlt: 'Period assignment room.',
          locationLabel: 'Philadelphia · 1776',
          advocates: [],
        },
        {
          side: 'british',
          imageUrl: '/room-b.png',
          imageAlt: 'Period assignment room.',
          locationLabel: 'London · 1777',
          advocates: [],
        },
      ],
    } as unknown as HistoryLiveProjectConfig;
    expect(validateHistoryLiveVisualConfig(config)).toContain(
      'Lead lead-a must map to exactly one visible assignment advocate.',
    );
  });
});
