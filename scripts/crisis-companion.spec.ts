import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  companionPreview,
  companionSignals,
  nextCompanionStop,
} from '../src/app/templates/crisis-operations/domain/crisis-companion';
import { initialCrisisState } from '../src/app/templates/crisis-operations/domain/crisis-engine';
import { requireCrisisConfig } from '../src/app/templates/crisis-operations/domain/crisis-validation';

const raw = JSON.parse(
  readFileSync(
    new URL('../public/projects/cascade-bay-crisis/project.json', import.meta.url),
    'utf8',
  ),
);
const config = requireCrisisConfig(raw);
describe('reusable crisis companion', () => {
  it('takes adjacent aisle stops and turns around at both ends', () => {
    expect(nextCompanionStop(0, 7, 0)).toBe(1);
    expect(nextCompanionStop(6, 7, 1)).toBe(5);
    expect(nextCompanionStop(3, 7, 0.2)).toBe(2);
    expect(nextCompanionStop(3, 7, 0.8)).toBe(4);
    for (let index = 0; index < 7; index++)
      for (const random of [0, 0.25, 0.5, 0.75, 1])
        expect(Math.abs(nextCompanionStop(index, 7, random) - index)).toBe(1);
    expect(nextCompanionStop(0, 1, 0.5)).toBe(0);
  });
  it('rejects waypoints outside the room and unreasonable character scale', () => {
    expect(() =>
      requireCrisisConfig({
        ...raw,
        companion: {
          ...raw.companion,
          roamPoints: [
            { x: 140, y: 80, scale: 1 },
            { x: 30, y: 80, scale: 1 },
          ],
        },
      }),
    ).toThrow('Invalid companion roam point');
    expect(() =>
      requireCrisisConfig({
        ...raw,
        companion: {
          ...raw.companion,
          roamPoints: [
            { x: 70, y: 80, scale: 20 },
            { x: 30, y: 80, scale: 1 },
          ],
        },
      }),
    ).toThrow('Invalid companion roam point');
  });
  it('keeps hidden and unreleased reports out of the companion briefing', () => {
    const state = initialCrisisState(config),
      signals = companionSignals(config, state);
    expect(
      signals.reports.every(
        (report) =>
          report.stage === 0 && (!report.roleIds.length || report.roleIds.includes(state.roleId)),
      ),
    ).toBe(true);
    expect(signals.unverified?.confidence).toBe('Unverified');
    expect(signals.confirmed + signals.forecast + signals.unverifiedCount).toBe(
      signals.reports.length,
    );
    const read = { ...state, readEvidenceIds: signals.reports.map((report) => report.id) };
    expect(companionSignals(config, read).unread).toBe(0);
  });
  it('previews costs and modeled risk without changing an order or source state', () => {
    const state = initialCrisisState(config),
      before = structuredClone(state),
      action = config.actions.find((item) => item.minStage === 0)!;
    const preview = companionPreview(config, state, action.id);
    expect(preview.blocked).toBeUndefined();
    expect(preview.remainingCrews).toBe(config.crews - action.crews);
    expect(preview.projectedRisk).toBe(Math.max(5, preview.risk - action.riskReduction));
    const lowRisk = {
      ...config,
      bulletins: config.bulletins.map((bulletin) => ({ ...bulletin, risk: 0 })),
    };
    expect(companionPreview(lowRisk, state, action.id).projectedRisk).toBe(5);
    expect(state).toEqual(before);
  });
  it('does not spend again or reduce risk again for an already-dispatched response', () => {
    const initial = initialCrisisState(config),
      action = config.actions.find((item) => item.minStage === 0)!;
    const state = {
      ...initial,
      decisions: [{ actionId: action.id, evidenceIds: [], minute: 0, stage: 0 }],
    };
    const preview = companionPreview(config, state, action.id);
    expect(preview.blocked).toBe('Order already dispatched');
    expect(preview.projectedRisk).toBe(preview.risk);
    expect(preview.remainingCrews).toBe(preview.crews);
  });
});
