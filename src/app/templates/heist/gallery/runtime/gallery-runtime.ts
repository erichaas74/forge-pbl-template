import { InjectionToken, Injectable, inject, signal } from '@angular/core';
import type { ProjectSessionContext } from '../../../../core/context/project-session-context';
import { GalleryEngine } from '../domain/gallery.engine';
import type { GalleryCommand, GalleryCommandEnvelope, GalleryMission } from '../domain/gallery.models';

export const GALLERY_MISSION = new InjectionToken<GalleryMission>('GALLERY_MISSION');
export interface GalleryPersistence { load(): readonly GalleryCommandEnvelope[]; save(history: readonly GalleryCommandEnvelope[]): void }
export const GALLERY_PERSISTENCE = new InjectionToken<GalleryPersistence>('GALLERY_PERSISTENCE');
export class LocalGalleryAdapter implements GalleryPersistence {
  private readonly key: string;
  private readonly fingerprint: string;
  constructor(session: ProjectSessionContext, mission: GalleryMission) {
    this.key = 'forge:heist:gallery:1:' + JSON.stringify([session.tenantId, session.classId, session.projectId, session.projectVersion, session.actorId, session.teamId, session.attemptId]);
    // Retain the exact immutable package signature: local saves never migrate silently.
    this.fingerprint = JSON.stringify(mission);
  }
  load(): readonly GalleryCommandEnvelope[] {
    const raw = localStorage.getItem(this.key); if (!raw) return [];
    const saved: unknown = JSON.parse(raw);
    if (!saved || typeof saved !== 'object' || !('fingerprint' in saved) || saved.fingerprint !== this.fingerprint || !('history' in saved) || !Array.isArray(saved.history) || saved.history.length > 1800) throw new Error('Saved practice does not match this mission version. Start a new practice to replace it.');
    return saved.history as GalleryCommandEnvelope[];
  }
  save(history: readonly GalleryCommandEnvelope[]): void { localStorage.setItem(this.key, JSON.stringify({ fingerprint: this.fingerprint, history })); }
}
@Injectable()
export class GalleryRuntime {
  readonly mission = inject(GALLERY_MISSION);
  private readonly persistence = inject(GALLERY_PERSISTENCE);
  engine = new GalleryEngine(this.mission);
  readonly revision = signal(0);
  readonly warning = signal('');
  readonly restoreBlocked = signal(false);
  private history: GalleryCommandEnvelope[] = [];
  private epoch = Date.now();
  constructor() {
    try {
      const history = this.persistence.load();
      for (const envelope of history) if (!this.engine.dispatch(envelope)) throw new Error('Saved practice contains an invalid checkpoint.');
      this.history = [...history]; this.epoch -= (history.at(-1)?.elapsed ?? 0) * 1000;
    } catch (error) { this.engine = new GalleryEngine(this.mission); this.restoreBlocked.set(true); this.warning.set(error instanceof Error ? error.message : 'Saved practice could not load.'); }
  }
  send(command: GalleryCommand): boolean {
    if (this.restoreBlocked()) return false;
    const envelope = { id: crypto.randomUUID(), elapsed: Math.max(this.history.at(-1)?.elapsed ?? 0, (Date.now() - this.epoch) / 1000), command };
    if (!this.engine.dispatch(envelope)) return false;
    this.history.push(envelope); this.revision.update(n => n + 1); this.save(); return true;
  }
  reset(): void { this.engine = new GalleryEngine(this.mission); this.history = []; this.epoch = Date.now(); this.restoreBlocked.set(false); this.revision.update(n => n + 1); this.save(); }
  retrySave(): void { if (!this.restoreBlocked()) this.save(); }
  private save(): void { try { this.persistence.save(this.history); this.warning.set(''); } catch { this.warning.set('Browser storage is unavailable. Your work is still here; export the dossier before leaving.'); } }
}
