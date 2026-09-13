import { computed, inject, Injectable, InjectionToken, signal } from '@angular/core';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import {
  applyTimeRepairAction,
  chargesRemaining,
  initialTimeRepairState,
  timelineStability,
} from '../domain/time-repair.engine';
import {
  TIME_REPAIR_EVENTS,
  type TimeRepairAction,
  type TimeRepairConfig,
} from '../domain/time-repair.models';
import type { TimeRepairPersistence } from './time-repair.persistence';

export const TIME_REPAIR_CONFIG = new InjectionToken<TimeRepairConfig>('TIME_REPAIR_CONFIG');
export const TIME_REPAIR_SESSION = new InjectionToken<ProjectSessionContext>('TIME_REPAIR_SESSION');
export const TIME_REPAIR_PERSISTENCE = new InjectionToken<TimeRepairPersistence>(
  'TIME_REPAIR_PERSISTENCE',
);

@Injectable()
export class TimeRepairRuntime {
  readonly config = inject(TIME_REPAIR_CONFIG);
  private readonly session = inject(TIME_REPAIR_SESSION);
  private readonly persistence = inject(TIME_REPAIR_PERSISTENCE);
  private readonly current = signal(initialTimeRepairState(this.config));
  private savedVersion = 0;
  readonly state = this.current.asReadonly();
  readonly message = signal('');
  readonly storageNotice = signal('Progress saved on this device');
  readonly stability = computed(() => timelineStability(this.config, this.state()));
  readonly charges = computed(() => chargesRemaining(this.config, this.state()));
  readonly completed = computed(() =>
    this.config.missions.every((m) => !!this.state().missions[m.id].verification),
  );
  constructor() {
    if (this.session.authorityMode !== 'localDemo')
      throw new Error(
        'CAPABILITY_NOT_INSTALLED: Time Repair requires a classroom authority adapter for shared or graded sessions.',
      );
    try {
      this.current.set(this.persistence.load() ?? initialTimeRepairState(this.config));
      this.savedVersion = this.current().version;
    } catch {
      this.storageNotice.set(
        'Saved progress could not be read. Keep this page open and export your case file.',
      );
    }
    if (!this.persistence.available)
      this.storageNotice.set('Storage unavailable · progress lasts for this visit');
  }
  dispatch(action: TimeRepairAction, requestId = crypto.randomUUID()): boolean {
    const previous = this.state();
    try {
      const result = applyTimeRepairAction(this.config, previous, action, {
        id: requestId,
        clientEventId: requestId,
        eventType: TIME_REPAIR_EVENTS[action.type],
        timestamp: new Date().toISOString(),
        tenantId: this.session.tenantId,
        projectId: this.config.projectId,
        attemptId: this.session.attemptId,
        actor: { type: 'student', id: this.session.actorId },
      });
      if (result.state !== previous) {
        try {
          this.persistence.save(result.state, this.savedVersion);
          this.savedVersion = result.state.version;
          if (this.persistence.available) this.storageNotice.set('Progress saved on this device');
        } catch (error) {
          if (error instanceof Error && error.message.startsWith('STATE_CONFLICT')) {
            if (previous.version !== this.savedVersion) {
              throw new Error(
                'STATE_CONFLICT: Another tab changed this exercise. Your unsaved local work is still here. Export your case file before reloading.',
              );
            }
            this.current.set(this.persistence.load() ?? previous);
            this.savedVersion = this.current().version;
            throw error;
          }
          this.storageNotice.set('Save failed · keep this page open and export your case file');
        }
        this.current.set(result.state);
      }
      this.message.set(result.message);
      return true;
    } catch (error) {
      this.message.set(
        error instanceof Error ? error.message : 'The repair request could not be recorded.',
      );
      return false;
    }
  }
  caseFile(): string {
    return JSON.stringify(
      {
        title: this.config.title,
        projectId: this.config.projectId,
        projectVersion: this.config.projectVersion,
        mode: 'local pilot; written reasoning requires teacher review',
        stability: this.stability(),
        remainingCharges: this.charges(),
        evidence: this.config.evidence.filter((e) => this.state().collectedIds.includes(e.id)),
        repairLog: this.state().missions,
        history: this.state().events,
      },
      null,
      2,
    );
  }
}
