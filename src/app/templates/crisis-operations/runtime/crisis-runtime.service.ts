import { computed, inject, Injectable, InjectionToken, signal } from '@angular/core';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import type { RuntimeEvent } from '../../../core/events/runtime-event';
import {
  actionBlockedReason,
  availableCrews,
  crisisForecast,
  initialCrisisState,
  reduceCrisisEvent,
  visibleEvidence,
} from '../domain/crisis-engine';
import { CRISIS_EVENTS, type CrisisAction, type CrisisConfig } from '../domain/crisis.models';
import type { CrisisPersistence } from './crisis.persistence';

export const CRISIS_CONFIG = new InjectionToken<CrisisConfig>('CRISIS_CONFIG');
export const CRISIS_SESSION = new InjectionToken<ProjectSessionContext>('CRISIS_SESSION');
export const CRISIS_PERSISTENCE = new InjectionToken<CrisisPersistence>('CRISIS_PERSISTENCE');

@Injectable()
export class CrisisRuntimeService {
  readonly config = inject(CRISIS_CONFIG);
  private readonly session = inject(CRISIS_SESSION);
  private readonly persistence = inject(CRISIS_PERSISTENCE);
  readonly state = signal(initialCrisisState(this.config));
  readonly message = signal('');
  readonly storageNotice = signal('');
  readonly bulletin = computed(() => this.config.bulletins[this.state().stage]);
  readonly reports = computed(() =>
    [...visibleEvidence(this.config, this.state())].sort((a, b) => b.minute - a.minute),
  );
  readonly shared = computed(() =>
    this.state().sharedEvidenceIds.map((id) => this.config.evidence.find((e) => e.id === id)!),
  );
  readonly crews = computed(() => availableCrews(this.config, this.state()));
  readonly forecast = computed(() => crisisForecast(this.config, this.state()));
  readonly finished = computed(() => this.state().stage === this.config.bulletins.length - 1);
  readonly role = computed(() => this.config.roles.find((r) => r.id === this.state().roleId)!);
  readonly unread = computed(
    () => this.reports().filter((e) => !this.state().readEvidenceIds.includes(e.id)).length,
  );
  readonly orders = computed(() =>
    this.state()
      .decisions.map((d) => ({
        ...d,
        action: this.config.actions.find((a) => a.id === d.actionId)!,
      }))
      .reverse(),
  );

  constructor() {
    try {
      this.state.set(this.persistence.load() ?? initialCrisisState(this.config));
    } catch {
      this.storageNotice.set('Previous exercise could not be restored.');
    }
    if (!this.persistence.available)
      this.storageNotice.set('Storage unavailable · changes last for this visit.');
  }
  time(minute = this.bulletin().minute): string {
    return `${String((this.config.startHour + Math.floor(minute / 60)) % 24).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`;
  }
  blocked(action: CrisisAction): string | undefined {
    return actionBlockedReason(this.config, this.state(), action);
  }
  advance(): boolean {
    if (this.finished()) return false;
    return this.dispatch(CRISIS_EVENTS.advance, {});
  }
  read(evidenceId: string): void {
    if (!this.state().readEvidenceIds.includes(evidenceId))
      this.dispatch(CRISIS_EVENTS.read, { evidenceId });
  }
  share(evidenceId: string): boolean {
    return this.dispatch(CRISIS_EVENTS.share, { evidenceId });
  }
  unshare(evidenceId: string): void {
    this.dispatch(CRISIS_EVENTS.unshare, { evidenceId });
  }
  selectRole(roleId: string): void {
    this.dispatch(CRISIS_EVENTS.role, { roleId });
  }
  commit(actionId: string, evidenceIds: readonly string[]): boolean {
    return this.dispatch(CRISIS_EVENTS.decide, { actionId, evidenceIds });
  }
  reset(): void {
    this.state.set(initialCrisisState(this.config));
    this.message.set('Exercise reset. All crews are ready.');
    this.save();
  }

  private dispatch(eventType: string, payload: Record<string, unknown>): boolean {
    const id = crypto.randomUUID();
    const event: RuntimeEvent = {
      id,
      clientEventId: id,
      eventType,
      timestamp: new Date().toISOString(),
      tenantId: this.session.tenantId,
      projectId: this.config.projectId,
      actor: { type: 'student', id: this.session.actorId },
      payload,
    };
    try {
      this.state.set(reduceCrisisEvent(this.config, this.state(), event));
      this.message.set('');
      this.save();
      return true;
    } catch (error) {
      this.message.set(
        error instanceof Error
          ? error.message.split(': ').slice(1).join(': ')
          : 'Unable to apply this order.',
      );
      return false;
    }
  }
  private save(): void {
    try {
      this.persistence.save(this.state());
    } catch {
      this.storageNotice.set(
        'Save unavailable · keep this room open to preserve the current response.',
      );
    }
  }
}
