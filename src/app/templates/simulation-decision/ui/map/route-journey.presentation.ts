import type {
  SimulationDecisionConfig,
  SimulationDecisionState,
} from '../../domain/simulation-decision.models';
import type { RouteCanvasCue } from './route-canvas.models';

export interface RouteJourneyPresentation {
  readonly id: string;
  readonly routeId: string;
  readonly phase: 'departure' | 'checkpoint' | 'event' | 'arrival' | 'paused';
  readonly title: string;
  readonly detail: string;
  readonly progressDays: number;
  readonly totalDays: number;
  readonly checkpoints: readonly { day: number; reached: boolean; current: boolean }[];
  readonly cue: RouteCanvasCue;
  readonly outcome?: { text: string; cashChangeCents: number; cargoChange: number };
}

/** Read-only student feedback. History, never an animation clock, establishes arrival. */
export function routeJourneyPresentation(
  config: SimulationDecisionConfig,
  state: SimulationDecisionState,
): RouteJourneyPresentation | undefined {
  const history = state.routeHistory.at(-1);
  if (!history) return undefined;
  const route = history.knownInfoSnapshot;
  const travel = state.activeTravel;
  const arrived =
    !travel && history.dayArrived !== undefined && state.currentLocationId === route.toLocationId;
  if (!arrived && (!travel || travel.routeId !== history.routeId)) return undefined;
  const totalDays = Math.max(1, route.estimatedDays);
  const progressDays = arrived ? totalDays : Math.max(0, Math.min(totalDays, travel!.progressDays));
  const destination =
    config.locations.find((location) => location.id === route.toLocationId)?.name ??
    route.toLocationId;
  const event = config.events.find((item) => item.id === state.pendingEventId);
  const phase =
    state.status === 'paused_by_teacher'
      ? 'paused'
      : state.pendingEventId
        ? 'event'
        : arrived
          ? 'arrival'
          : progressDays === 0
            ? 'departure'
            : 'checkpoint';
  const title =
    phase === 'paused'
      ? 'Journey paused'
      : phase === 'event'
        ? 'Trail event · choose what to do'
        : phase === 'arrival'
          ? `Arrived at ${destination}`
          : phase === 'departure'
            ? 'Wagons ready!'
            : progressDays === totalDays
              ? 'Final checkpoint reached'
              : `Checkpoint ${progressDays} reached`;
  const detail =
    phase === 'paused'
      ? 'Your teacher has paused the season.'
      : phase === 'event'
        ? (event?.title ?? 'A decision is waiting. Your wagon is stopped.')
        : phase === 'arrival'
          ? `Day ${history.dayArrived} · Your goods are ready for the market.`
          : phase === 'departure'
            ? `Bound for ${destination}. Travel your first day when you are ready.`
            : `${progressDays} of ${totalDays} travel days complete · ${destination} ahead.`;
  const decision = [...state.eventHistory]
    .reverse()
    .find(
      (item) =>
        item.routeId === history.routeId &&
        item.day >= history.dayStarted &&
        history.eventIdsTriggered.includes(item.eventId),
    );
  return {
    id: history.id,
    routeId: history.routeId,
    phase,
    title,
    detail,
    progressDays,
    totalDays,
    checkpoints: Array.from({ length: totalDays + 1 }, (_, day) => ({
      day,
      // Reaching the final travel day is not arrival while an event is waiting.
      reached: day === totalDays ? arrived : day <= progressDays,
      current: day === progressDays,
    })),
    cue: {
      id: `${history.id}:${phase}:${progressDays}:${state.pendingEventId ?? ''}`,
      journeyId: history.id,
      routeId: history.routeId,
      kind: phase,
      label:
        phase === 'arrival'
          ? 'ARRIVED'
          : phase === 'departure'
            ? 'DEPARTURE'
            : phase === 'event'
              ? 'TRAIL EVENT'
              : phase === 'paused'
                ? 'PAUSED'
                : `CHECKPOINT ${progressDays}`,
      progress: progressDays / totalDays,
    },
    outcome: decision
      ? {
          text: decision.outcome,
          cashChangeCents: decision.cashAfterCents - decision.cashBeforeCents,
          cargoChange: decision.cargoAfter - decision.cargoBefore,
        }
      : undefined,
  };
}
