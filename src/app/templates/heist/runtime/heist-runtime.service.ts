import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import type { HeistCommand, Mission } from '../domain/heist.models';
import { HeistEngine } from '../domain/heist.engine';
import { HEIST_PERSISTENCE } from './heist.persistence';
export const HEIST_MISSION = new InjectionToken<Mission>('HEIST_MISSION');
@Injectable()
export class HeistRuntime {
  readonly mission = inject(HEIST_MISSION);
  private readonly storage = inject(HEIST_PERSISTENCE);
  engine = new HeistEngine(this.mission);
  readonly revision = signal(0);
  readonly error = signal('');
  readonly storageError = signal('');
  private commands: HeistCommand[] = [];
  constructor() {
    try {
      const commands = this.storage.load();
      for (const command of commands) this.engine.dispatch(command);
      this.commands = commands;
    } catch (error) { this.engine = new HeistEngine(this.mission); this.storageError.set(`Could not restore practice: ${String(error)}`); }
  }
  send(command: HeistCommand): boolean {
    try {
      this.engine.dispatch(command);
      this.commands = command.type === 'reset' ? [] : [...this.commands, command];
      this.error.set(''); this.save(); this.revision.update(n => n + 1); return true;
    } catch (error) { this.error.set(error instanceof Error ? error.message : String(error)); return false; }
  }
  advance(time: number): void {
    const before = this.engine.mode;
    this.engine.advance(time);
    this.revision.update(n => n + 1);
    if (before !== this.engine.mode) this.checkpoint();
  }
  checkpoint(): void {
    if (this.engine.locked) {
      this.commands.push({ type: 'advance', time: this.engine.time });
      this.save();
    }
  }
  private save(): void {
    try { this.storage.save(this.commands); this.storageError.set(''); }
    catch (error) { this.storageError.set(`Practice is running but has not been saved: ${String(error)}`); }
  }
}
