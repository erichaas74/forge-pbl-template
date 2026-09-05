import type { RuntimeScope } from '../../core/state/runtime-state-contracts';

export interface ProjectionEnvelope<TProjection> {
  readonly attemptId: string;
  readonly scope: RuntimeScope;
  readonly topic: string;
  readonly sequence: number;
  readonly sourceVersion: number;
  readonly projection: Readonly<TProjection>;
}

export interface ProjectionRebuildRequest {
  readonly attemptId: string;
  readonly topic: string;
  readonly afterSequence?: number;
}
