import { InjectionToken } from '@angular/core';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import type { HeistCommand } from '../domain/heist.models';
export interface HeistPersistence { load(): HeistCommand[]; save(commands: readonly HeistCommand[]): void }
export const HEIST_PERSISTENCE = new InjectionToken<HeistPersistence>('HEIST_PERSISTENCE');
export class LocalHeistAdapter implements HeistPersistence {
  private readonly key: string;
  constructor(session: ProjectSessionContext, private readonly fingerprint: string) {
    this.key = 'forge:heist:1:' + JSON.stringify([session.tenantId, session.classId, session.projectId, session.projectVersion, session.actorId, session.teamId, session.attemptId]);
  }
  load(): HeistCommand[] {
    const raw = localStorage.getItem(this.key);
    if (!raw) return [];
    const saved: unknown = JSON.parse(raw);
    if (!saved || typeof saved !== 'object' || !('fingerprint' in saved) || saved.fingerprint !== this.fingerprint || !('commands' in saved) || !Array.isArray(saved.commands) || saved.commands.length > 2000) throw new Error('Saved practice is incompatible. Start a new plan to replace it.');
    return saved.commands as HeistCommand[];
  }
  save(commands: readonly HeistCommand[]): void {
    if (commands.length > 2000) throw new Error('Local practice history is full. Export evidence, then start a new plan.');
    localStorage.setItem(this.key, JSON.stringify({ fingerprint: this.fingerprint, commands }));
  }
}
