import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import { EventRegistry } from '../../../core/registries/specialized-registries';
import {
  isBlockDesign,
  isDesignCapture,
  isDesignChecks,
  type DesignCheck,
  type BlockDesign,
  type DesignCapture,
} from '../../../shared/engineering/block-design';
import {
  isEngineeringSnapshot,
  type EngineeringDesignConfig,
  type EngineeringSnapshot,
} from '../domain/engineering-design.models';

export interface EngineeringPersistence {
  readonly location: string;
  load(): EngineeringSnapshot | undefined;
  save(snapshot: EngineeringSnapshot): void;
}
export const ENGINEERING_CONFIG = new InjectionToken<EngineeringDesignConfig>('ENGINEERING_CONFIG');
export const ENGINEERING_SESSION = new InjectionToken<ProjectSessionContext>('ENGINEERING_SESSION');
export const ENGINEERING_PERSISTENCE = new InjectionToken<EngineeringPersistence>(
  'ENGINEERING_PERSISTENCE',
);
export const engineeringEvents = {
  design: 'engineering.designSaved',
  research: 'engineering.researchSaved',
  prediction: 'engineering.predictionSaved',
  exhibit: 'engineering.exhibitSaved',
  trial: 'activity.completed',
  checks: 'engineering.checksSaved',
} as const;

@Injectable()
export class EngineeringDesignRuntime {
  readonly config = inject(ENGINEERING_CONFIG);
  private readonly persistence = inject(ENGINEERING_PERSISTENCE);
  private readonly session = inject(ENGINEERING_SESSION);
  private readonly events = new EventRegistry();
  readonly saveStatus = signal(this.persistence.location);
  readonly snapshot = signal<EngineeringSnapshot>({
    schemaVersion: '1.0',
    revision: 0,
    design: structuredClone(this.config.starterDesign),
    research: {},
    prediction: '',
    exhibit: '',
    trials: [],
    events: [],
  });
  constructor() {
    for (const id of Object.values(engineeringEvents))
      this.events.register({ id, version: '1.0.0', status: 'extension' });
    try {
      const saved = this.persistence.load();
      if (saved && isEngineeringSnapshot(saved)) this.snapshot.set(saved);
    } catch {
      this.saveStatus.set(
        'Could not read the saved draft. Keep this page open and export your work.',
      );
    }
  }
  saveDesign(design: BlockDesign): void {
    if (!isBlockDesign(design))
      throw new Error('STATE_INVALID: Check block dimensions and positions.');
    this.commit(engineeringEvents.design, { design });
  }
  useDesignSample(id: string): void {
    const sample = this.config.designSamples?.find((s) => s.id === id);
    if (!sample || !isBlockDesign(sample.design))
      throw new Error('STATE_INVALID: Unknown or invalid sample design.');
    const current = this.snapshot();
    this.commit(engineeringEvents.design, {
      design: sample.design,
      checks: [],
      designBackup: { design: current.design, checks: current.checks ?? [] },
    });
  }
  restoreDesignBackup(): void {
    const backup = this.snapshot().designBackup;
    if (backup) this.commit(engineeringEvents.design, { ...backup, designBackup: undefined });
  }
  saveResearch(id: string, answer: string): void {
    if (!this.config.research.some((r) => r.id === id))
      throw new Error('STATE_INVALID: Unknown research question.');
    this.commit(engineeringEvents.research, {
      research: { ...this.snapshot().research, [id]: answer.slice(0, 10000) },
    });
  }
  saveText(field: 'prediction' | 'exhibit', value: string): void {
    this.commit(engineeringEvents[field], { [field]: value.slice(0, 10000) });
  }
  capture(capture: DesignCapture): void {
    this.captureBatch([capture]);
  }
  saveChecks(checks: readonly DesignCheck[]): void {
    if (!isDesignChecks(checks)) throw new Error('STATE_INVALID: Invalid design checks.');
    this.commit(engineeringEvents.checks, { checks });
  }
  captureBatch(captures: readonly DesignCapture[]): void {
    if (
      !Array.isArray(captures) ||
      !captures.length ||
      captures.length > 20 ||
      captures.some(
        (capture) => !isDesignCapture(capture) || capture.pluginId !== this.config.simulationId,
      ) ||
      new Set(captures.map((c) => c.id)).size !== captures.length
    )
      throw new Error('STATE_INVALID: The simulation returned an invalid trial.');
    const state = this.snapshot();
    const fresh = captures.filter(
      (capture) => !state.trials.some((trial) => trial.id === capture.id),
    );
    if (!fresh.length) return;
    if (state.trials.length + fresh.length > 40)
      throw new Error('TRIAL_LIMIT: Export this notebook before starting another project attempt.');
    this.commit(
      engineeringEvents.trial,
      {
        trials: [
          ...state.trials,
          ...fresh.map((capture) => ({
            ...structuredClone(capture),
            prediction: state.prediction,
          })),
        ],
      },
      fresh[0].id,
    );
  }
  private commit(
    eventType: string,
    changes: Partial<EngineeringSnapshot>,
    id: string = crypto.randomUUID(),
  ): void {
    if (!this.events.has(eventType))
      throw new Error('UNKNOWN_EVENT_TYPE: This action is not registered.');
    const current = this.snapshot();
    const event = {
      id,
      clientEventId: id,
      eventType,
      timestamp: new Date().toISOString(),
      tenantId: this.session.tenantId,
      projectId: this.session.projectId,
      attemptId: this.session.attemptId,
      actor: { type: 'student' as const, id: this.session.actorId },
      sourceId:
        eventType === engineeringEvents.trial ? this.config.simulationId : 'engineering-design',
    };
    const next: EngineeringSnapshot = {
      ...current,
      ...structuredClone(changes),
      revision: current.revision + 1,
      events: [...current.events, event].slice(-200),
    };
    if (!isEngineeringSnapshot(next))
      throw new Error('STATE_INVALID: The notebook could not be saved.');
    this.snapshot.set(next);
    try {
      this.persistence.save(next);
      this.saveStatus.set(this.persistence.location);
    } catch {
      this.saveStatus.set(
        'Save failed. Your work is still on this page; export it before leaving.',
      );
    }
  }
}
