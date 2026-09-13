import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import type { ProjectSessionContext } from '../../../../core/context/project-session-context';
import { EscapeEngine } from '../domain/escape.engine';
import type { EscapeCommand, EscapeEnvelope, EscapeMission } from '../domain/escape.models';

export const ESCAPE_MISSION = new InjectionToken<EscapeMission>('ESCAPE_MISSION');
export interface EscapePersistence {
  load(): readonly EscapeEnvelope[];
  save(history: readonly EscapeEnvelope[]): void;
}
export const ESCAPE_PERSISTENCE = new InjectionToken<EscapePersistence>('ESCAPE_PERSISTENCE');
export class LocalEscapeAdapter implements EscapePersistence {
  private readonly key: string;
  private readonly fingerprint: string;
  constructor(session: ProjectSessionContext, mission: EscapeMission) {
    this.key =
      'forge:heist:escape:1:' +
      JSON.stringify([
        session.tenantId,
        session.classId,
        session.projectId,
        session.projectVersion,
        session.actorId,
        session.teamId,
        session.attemptId,
      ]);
    this.fingerprint = JSON.stringify(mission);
  }
  load(): readonly EscapeEnvelope[] {
    const raw = localStorage.getItem(this.key);
    if (!raw) return [];
    const saved: unknown = JSON.parse(raw);
    if (
      !saved ||
      typeof saved !== 'object' ||
      !('fingerprint' in saved) ||
      saved.fingerprint !== this.fingerprint ||
      !('history' in saved) ||
      !Array.isArray(saved.history) ||
      saved.history.length > 1600
    )
      throw new Error('This saved game could not be restored. Start a new rescue to continue.');
    return saved.history as EscapeEnvelope[];
  }
  save(history: readonly EscapeEnvelope[]): void {
    if (history.length > 1600) throw new Error('Practice history is full.');
    localStorage.setItem(this.key, JSON.stringify({ fingerprint: this.fingerprint, history }));
  }
}
@Injectable()
export class EscapeRuntime {
  readonly mission = inject(ESCAPE_MISSION);
  private readonly persistence = inject(ESCAPE_PERSISTENCE);
  engine = new EscapeEngine(this.mission);
  readonly revision = signal(0);
  readonly warning = signal('');
  readonly restoreBlocked = signal(false);
  private history: EscapeEnvelope[] = [];
  constructor() {
    try {
      const saved = this.persistence.load();
      if (saved.length > 1600) throw new Error('Saved game is too large.');
      for (const envelope of saved)
        if (!this.engine.dispatch(envelope))
          throw new Error('Saved game contains an invalid step. Start a new rescue to continue.');
      this.history = [...saved];
    } catch (e) {
      this.engine = new EscapeEngine(this.mission);
      this.restoreBlocked.set(true);
      this.warning.set(e instanceof Error ? e.message : 'Saved game could not be restored.');
    }
  }
  send(command: EscapeCommand): boolean {
    if (this.restoreBlocked()) return false;
    const envelope = { id: crypto.randomUUID(), command };
    if (!this.engine.dispatch(envelope)) return false;
    this.history.push(envelope);
    this.revision.update((n) => n + 1);
    this.save();
    return true;
  }
  reset(): void {
    this.engine = new EscapeEngine(this.mission);
    this.history = [];
    this.restoreBlocked.set(false);
    this.revision.update((n) => n + 1);
    this.save();
  }
  retrySave(): void {
    this.save();
  }
  private save(): void {
    try {
      this.persistence.save(this.history);
      this.warning.set('');
    } catch {
      this.warning.set(
        'Your game is still here, but this browser could not save it. Keep this page open to finish.',
      );
    }
  }
}
