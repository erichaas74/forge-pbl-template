import { InjectionToken, type Signal } from '@angular/core';

import type { RuntimeEvent } from '../../../core/events/runtime-event';
import type { ValidationIssue } from '../../../core/validation/validation-contracts';
import type { RuntimeStateSnapshot } from '../domain/runtime-state';
import type { ProjectDefinitionGraph } from '../package/project-definition-graph';

export interface InvestigationRuntimeFacade {
  readonly loading: Signal<boolean>;
  readonly graph: Signal<ProjectDefinitionGraph | undefined>;
  readonly snapshot: Signal<RuntimeStateSnapshot | undefined>;
  readonly issues: Signal<readonly ValidationIssue[]>;
  initialize(): Promise<void>;
  dispatch(
    eventType: RuntimeEvent['eventType'],
    sourceId?: string,
    payload?: Record<string, unknown>,
  ): Promise<void>;
}

export const INVESTIGATION_RUNTIME_FACADE = new InjectionToken<InvestigationRuntimeFacade>(
  'INVESTIGATION_RUNTIME_FACADE',
);
