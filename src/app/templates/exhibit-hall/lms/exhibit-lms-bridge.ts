import { cloneHallState, entityId, withRevision } from '../core/exhibit-state';
import type {
  ExhibitHallState,
  ExhibitMutationResult,
  LmsEvidenceEvent,
} from '../domain/exhibit-types';

export interface LmsEvidenceInput {
  readonly type: LmsEvidenceEvent['type'];
  readonly idempotencyKey: string;
  readonly projectInstanceId: string;
  readonly teamId?: string;
  readonly studentId?: string;
  readonly snapshotId: string;
  readonly occurredAt: string;
}

/** Adapter-ready evidence mapper. Delivery remains idempotent and separate from analytics. */
export class ExhibitLmsBridge {
  record(state: ExhibitHallState, input: LmsEvidenceInput): ExhibitMutationResult {
    const existing = state.lmsEvents.find((event) => event.idempotencyKey === input.idempotencyKey);
    if (existing !== undefined) {
      return { ok: true, state, entityId: existing.id, duplicate: true };
    }
    const next = cloneHallState(state);
    const id = entityId(next, 'lms');
    return {
      ok: true,
      state: withRevision({
        ...next,
        sequence: next.sequence + 1,
        lmsEvents: [...next.lmsEvents, { id, ...input }],
      }),
      entityId: id,
    };
  }
}
