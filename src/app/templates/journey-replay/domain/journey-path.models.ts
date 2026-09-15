import type { RuntimeEvent } from '../../../core/events/runtime-event';
import type { JourneyChoiceDefinition } from './journey-replay.models';

export interface JourneyPathChoice extends Pick<JourneyChoiceDefinition, 'id' | 'label' | 'summary' | 'consequence' | 'resourceChanges' | 'consequenceModifiers'> {
  readonly nextNodeId?: string;
  readonly routeId?: string;
  readonly grants?: readonly string[];
  /** An extra route revealed by an earlier decision. All scenes remain inspectable in testing. */
  readonly requiresAny?: readonly string[];
  readonly nextTask: string;
  readonly learning: string;
  readonly effect?: 'water' | 'repair' | 'charts' | 'rest' | 'exchange' | 'sail';
}

export interface JourneyPathEvent {
  readonly id: string;
  readonly label: string;
  readonly observation: string;
  readonly question: string;
  readonly evidenceIds: readonly string[];
  readonly object: { readonly x: number; readonly y: number; readonly icon: 'compass' | 'cargo' | 'sail' | 'shore' | 'log' };
  readonly choices: readonly JourneyPathChoice[];
}

export interface JourneyPathNode {
  readonly id: string;
  readonly session: number;
  readonly kind: 'map' | 'location';
  readonly title: string;
  readonly locationId: string;
  readonly defaultNextId?: string;
  readonly tasks: readonly string[];
  readonly product: string;
  readonly learning: string;
  readonly scene?: 'island' | 'harbor' | 'storm' | 'river' | 'cape' | 'home';
  readonly choices: readonly JourneyPathChoice[];
  readonly events: readonly JourneyPathEvent[];
}

export interface JourneyPathDefinition {
  readonly schemaVersion: '1.0';
  readonly capability: 'branchingJourney';
  readonly startNodeId: string;
  readonly nodes: readonly JourneyPathNode[];
}

export interface JourneyPathDecision {
  readonly nodeId: string;
  readonly eventId: string;
  readonly choiceId: string;
}

/** Local practice is deliberately separate from authoritative legacy voyage submissions. */
export interface JourneyPathState {
  readonly schemaVersion: '1.0';
  readonly projectVersion: string;
  readonly revision: number;
  readonly decisions: readonly JourneyPathDecision[];
  readonly history: readonly RuntimeEvent[];
  readonly previousPaths: readonly (readonly JourneyPathDecision[])[];
}

export interface JourneyPathScope {
  readonly tenantId: string;
  readonly classId: string;
  readonly studentId: string;
  readonly projectId: string;
  readonly projectVersion: string;
}

export interface JourneyPathPersistence {
  load(scope: JourneyPathScope): unknown;
  save(scope: JourneyPathScope, state: JourneyPathState): void;
}
