import { InjectionToken } from '@angular/core';
import type { ProjectSessionContext } from '../../../../core/context/project-session-context';
import type { EscapeMission } from '../domain/escape.models';
import type { ExpeditionPreviewSnapshot } from './expedition-preview.models';
import { acceptsPistonUpgrade } from '../balance-lock/balance-lock.migration';
import { acceptsTimingCageUpgrade } from '../locks/timing-cage/timing-cage.migration';
import { acceptsFractionCageUpgrade } from '../locks/fraction-cage/fraction-cage.migration';
import { acceptsGearCageUpgrade } from '../gear-lock/gear-cage/gear-cage.migration';
import { acceptsBridgeCageUpgrade } from '../locks/bridge-cage/bridge-cage.migration';
import { acceptsOpticsCageUpgrade } from '../locks/optics-cage/optics-cage.migration';

export const EXPEDITION_PREVIEW_SESSION = new InjectionToken<ProjectSessionContext>(
  'EXPEDITION_PREVIEW_SESSION',
);
export interface ExpeditionPreviewPersistence {
  load(): unknown;
  save(snapshot: ExpeditionPreviewSnapshot): void;
}
export const EXPEDITION_PREVIEW_PERSISTENCE = new InjectionToken<ExpeditionPreviewPersistence>(
  'EXPEDITION_PREVIEW_PERSISTENCE',
);

/** A bounded field path helps diagnose old preview packages without logging saved answers. */
function changedSetting(before: string, after: string): string {
  const difference = (a: unknown, b: unknown, path: string): string | undefined => {
    if (a === b) return undefined;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return `${path}.length`;
      for (let i = 0; i < a.length; i++) {
        const found = difference(a[i], b[i], `${path}[${i}]`);
        if (found) return found;
      }
      return undefined;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      const x = a as Record<string, unknown>,
        y = b as Record<string, unknown>;
      for (const key of new Set([...Object.keys(x), ...Object.keys(y)])) {
        const found = difference(x[key], y[key], `${path}.${key}`);
        if (found) return found;
      }
      return undefined;
    }
    return path;
  };
  try {
    return difference(JSON.parse(before), JSON.parse(after), 'steps') ?? 'descriptive settings';
  } catch {
    return 'package fingerprint';
  }
}

/** Same actor/attempt scope as the escape adapter, with separate snapshot storage. */
export class LocalExpeditionPreviewAdapter implements ExpeditionPreviewPersistence {
  private readonly key: string;
  private readonly fingerprint: string;
  constructor(session: ProjectSessionContext, mission: EscapeMission) {
    if (session.mode !== 'preview' || session.authorityMode !== 'localDemo')
      throw new Error('PERMISSION_DENIED: local authoring preview required');
    this.key =
      'forge:heist:expedition-preview:1:' +
      JSON.stringify([
        session.tenantId,
        session.classId,
        session.projectId,
        session.projectVersion,
        session.actorId,
        session.teamId,
        session.attemptId,
      ]);
    this.fingerprint = JSON.stringify(mission.steps);
  }
  load(): unknown {
    const raw = localStorage.getItem(this.key);
    if (!raw) return undefined;
    const value: unknown = JSON.parse(raw);
    if (
      !value ||
      typeof value !== 'object' ||
      !('fingerprint' in value) ||
      typeof value.fingerprint !== 'string' ||
      (value.fingerprint !== this.fingerprint &&
        !acceptsPistonUpgrade(value.fingerprint, this.fingerprint) &&
        !acceptsTimingCageUpgrade(value.fingerprint, this.fingerprint) &&
        !acceptsFractionCageUpgrade(value.fingerprint, this.fingerprint) &&
        !acceptsGearCageUpgrade(value.fingerprint, this.fingerprint) &&
        !acceptsOpticsCageUpgrade(value.fingerprint, this.fingerprint) && !acceptsBridgeCageUpgrade(value.fingerprint, this.fingerprint)) ||
      !('snapshot' in value)
    )
      throw new Error(
        'STATE_CONFLICT: preview settings do not match this package' +
          (value &&
          typeof value === 'object' &&
          'fingerprint' in value &&
          typeof value.fingerprint === 'string'
            ? ` (${changedSetting(value.fingerprint, this.fingerprint)})`
            : ''),
      );
    return value.snapshot;
  }
  save(snapshot: ExpeditionPreviewSnapshot): void {
    localStorage.setItem(this.key, JSON.stringify({ fingerprint: this.fingerprint, snapshot }));
  }
}
