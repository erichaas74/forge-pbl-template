import { computed, inject, Injectable, signal } from '@angular/core';
import type { RuntimeEvent } from '../../../core/events/runtime-event';
import { RuntimeEventBus } from '../../../core/events/runtime-event-bus';
import { EventRegistry } from '../../../core/registries/specialized-registries';
import { JOURNEY_REPLAY_CONFIG, JOURNEY_REPLAY_ENROLLMENT } from './journey-replay.tokens';
import { JOURNEY_PATH_PERSISTENCE } from '../persistence/journey-path.persistence';
import { applyJourneyPathEvent, emptyJourneyPath, resolveJourneyPath, restoreJourneyPath } from '../core/journey-path.engine';

@Injectable()
export class JourneyPathRuntime {
  readonly config = inject(JOURNEY_REPLAY_CONFIG);
  readonly enrollment = inject(JOURNEY_REPLAY_ENROLLMENT);
  private readonly persistence = inject(JOURNEY_PATH_PERSISTENCE);
  readonly scope = { tenantId: this.enrollment.tenantId, classId: this.enrollment.classId, studentId: this.enrollment.studentId, projectId: this.config.projectId, projectVersion: this.config.projectVersion };
  readonly error = signal('');
  readonly saved = signal(true);
  private loadFailed = false;
  readonly state = signal(this.load());
  readonly path = computed(() => resolveJourneyPath(this.config.experience!, this.state()));
  private readonly registry = new EventRegistry();
  private readonly bus = new RuntimeEventBus(this.registry);

  constructor() {
    this.registry.register({ id: 'activity.completed', version: '1.0.0', status: 'core' });
  }

  choose(nodeId: string, eventId: string, choiceId: string): boolean {
    const event: RuntimeEvent = {
      id: crypto.randomUUID(), clientEventId: crypto.randomUUID(), eventType: 'activity.completed',
      timestamp: new Date().toISOString(), tenantId: this.scope.tenantId, projectId: this.scope.projectId,
      actor: { type: 'student', id: this.scope.studentId }, sourceId: nodeId,
      payload: { capability: 'branchingJourney', projectVersion: this.scope.projectVersion, eventId, choiceId, practice: true },
    };
    try {
      const state = applyJourneyPathEvent(this.config, this.state(), event);
      const result = this.bus.publish({ ...this.scope, scopeType: 'student' }, event);
      if (!result.accepted) throw new Error('JOURNEY_PATH_EVENT_REJECTED');
      this.state.set(state);
      this.save();
      return true;
    } catch (error) { this.error.set(error instanceof Error ? error.message : 'JOURNEY_PATH_FAILED'); return false; }
  }

  retrySave(): void { this.save(); }

  private load() {
    try { const value = this.persistence.load(this.scope); return value ? restoreJourneyPath(this.config, value) : emptyJourneyPath(this.config.projectVersion); }
    catch { this.loadFailed = true; this.error.set('Saved practice could not be read. It has been left intact. New choices stay in this session; reload to retry reading the saved record.'); this.saved.set(false); return emptyJourneyPath(this.config.projectVersion); }
  }

  private save(): void {
    if (this.loadFailed) return;
    try { this.persistence.save(this.scope, this.state()); this.saved.set(true); this.error.set(''); }
    catch { this.saved.set(false); this.error.set('This choice is only in memory. Retry saving before leaving.'); }
  }
}
