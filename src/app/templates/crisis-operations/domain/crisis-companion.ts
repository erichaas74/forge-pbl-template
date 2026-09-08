import {
  actionBlockedReason,
  availableCrews,
  crisisForecast,
  visibleEvidence,
} from './crisis-engine';
import type { CrisisConfig, CrisisState } from './crisis.models';

/** Adjacent steps keep the robot on its authored aisle instead of crossing through the table. */
export function nextCompanionStop(current: number, count: number, random: number): number {
  if (count < 2) return 0;
  const index = Math.min(count - 1, Math.max(0, Math.trunc(current)));
  if (index === 0) return 1;
  if (index === count - 1) return count - 2;
  return index + (random < 0.5 ? -1 : 1);
}

export function companionSignals(config: CrisisConfig, state: CrisisState) {
  const reports = [...visibleEvidence(config, state)].sort((a, b) => b.minute - a.minute);
  const latest = reports[0];
  const unverified = reports.find((report) => report.confidence === 'Unverified');
  const confirmed = reports.filter((report) => report.confidence === 'Confirmed').length;
  return {
    reports,
    latest,
    unverified,
    confirmed,
    forecast: reports.filter((report) => report.confidence === 'Forecast').length,
    unverifiedCount: reports.filter((report) => report.confidence === 'Unverified').length,
    unread: reports.filter((report) => !state.readEvidenceIds.includes(report.id)).length,
  };
}

/** A reversible comparison never commits an order or treats assigned crews as completed work. */
export function companionPreview(config: CrisisConfig, state: CrisisState, actionId: string) {
  const action = config.actions.find((item) => item.id === actionId);
  const risk = crisisForecast(config, state).risk,
    crews = availableCrews(config, state);
  const blocked = action ? actionBlockedReason(config, state, action) : 'Choose a response.';
  const projected =
    action && !blocked
      ? {
          ...state,
          decisions: [
            ...state.decisions,
            {
              actionId: action.id,
              evidenceIds: [],
              minute: config.bulletins[state.stage].minute,
              stage: state.stage,
            },
          ],
        }
      : state;
  return {
    action,
    blocked,
    risk,
    projectedRisk: crisisForecast(config, projected).risk,
    crews,
    remainingCrews: availableCrews(config, projected),
  };
}
