import type { StudentJourneyRecord } from '../domain/journey-replay.models';

export interface JourneyReplayPersistenceAdapter {
  load(projectId: string, projectVersion: string, studentId: string): StudentJourneyRecord | undefined;
  save(record: StudentJourneyRecord): void;
  clear(projectId: string, projectVersion: string, studentId: string): void;
  loadCheckpoint?(projectId: string, projectVersion: string, studentId: string): JourneySaveCheckpoint | undefined;
  saveCheckpoint?(record: StudentJourneyRecord, checkpoint: JourneySaveCheckpoint): void;
}

export interface JourneySaveCheckpoint {
  readonly acknowledgedRevision: number;
  readonly pendingId?: string;
  readonly acknowledgedRecord?: StudentJourneyRecord;
  readonly recoveryRecords?: readonly StudentJourneyRecord[];
}

interface StoredJourney { readonly record: StudentJourneyRecord; readonly checkpoint: JourneySaveCheckpoint; }

export class BrowserJourneyReplayPersistenceAdapter implements JourneyReplayPersistenceAdapter {
  constructor(private readonly storage: Storage | undefined = safeStorage(), private readonly scope = { tenantId: 'legacy', classId: 'legacy' }) {}

  private key(projectId: string, version: string, studentId: string): string {
    return `forge:journey-replay:v2:${JSON.stringify([this.scope.tenantId,this.scope.classId,projectId,version,studentId])}`;
  }

  private read(projectId: string, version: string, studentId: string): StoredJourney | undefined {
    const value = this.storage?.getItem(this.key(projectId,version,studentId));
    if (!value) return undefined;
    try {
      const parsed = JSON.parse(value) as StoredJourney;
      if (!isStudentJourneyRecord(parsed.record) || !Number.isInteger(parsed.checkpoint?.acknowledgedRevision)) throw new Error();
      return parsed;
    } catch { throw new Error('JOURNEY_CACHE_DAMAGED'); }
  }

  load(
    projectId: string,
    projectVersion: string,
    studentId: string,
  ): StudentJourneyRecord | undefined {
    return this.read(projectId,projectVersion,studentId)?.record;
  }

  save(record: StudentJourneyRecord): void {
    this.saveCheckpoint(record, { acknowledgedRevision: 0, pendingId: crypto.randomUUID() });
  }

  loadCheckpoint(projectId: string, version: string, studentId: string): JourneySaveCheckpoint | undefined { return this.read(projectId,version,studentId)?.checkpoint; }

  saveCheckpoint(record: StudentJourneyRecord, checkpoint: JourneySaveCheckpoint): void {
    if (!this.storage) throw new Error('JOURNEY_STORAGE_UNAVAILABLE');
    this.storage.setItem(this.key(record.projectId,record.projectVersion,record.studentId),JSON.stringify({record,checkpoint}));
  }

  clear(projectId: string, projectVersion: string, studentId: string): void {
    this.storage?.removeItem(this.key(projectId, projectVersion, studentId));
  }
}

export class MemoryJourneyReplayPersistenceAdapter implements JourneyReplayPersistenceAdapter {
  private readonly records = new Map<string, StudentJourneyRecord>();
  private readonly checkpoints = new Map<string, JourneySaveCheckpoint>();

  loadCheckpoint(projectId: string, version: string, studentId: string): JourneySaveCheckpoint | undefined { return this.checkpoints.get(storageKey(projectId,version,studentId)); }
  saveCheckpoint(record: StudentJourneyRecord, checkpoint: JourneySaveCheckpoint): void { this.save(record); this.checkpoints.set(storageKey(record.projectId,record.projectVersion,record.studentId),structuredClone(checkpoint)); }

  load(projectId: string, projectVersion: string, studentId: string): StudentJourneyRecord | undefined {
    const value = this.records.get(storageKey(projectId, projectVersion, studentId));
    return value === undefined ? undefined : structuredClone(value);
  }

  save(record: StudentJourneyRecord): void {
    this.records.set(
      storageKey(record.projectId, record.projectVersion, record.studentId),
      structuredClone(record),
    );
  }

  clear(projectId: string, projectVersion: string, studentId: string): void {
    this.records.delete(storageKey(projectId, projectVersion, studentId));
  }
}

function safeStorage(): Storage | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

function storageKey(projectId: string, projectVersion: string, studentId: string): string {
  return `forge:journey-replay:${projectId}:${projectVersion}:${studentId}`;
}

function isStudentJourneyRecord(value: unknown): value is StudentJourneyRecord {
  return (
    typeof value === 'object' &&
    value !== null &&
    'schemaVersion' in value &&
    value.schemaVersion === '1.0' &&
    'completedSteps' in value &&
    Array.isArray(value.completedSteps) &&
    'route' in value &&
    Array.isArray(value.route) &&
    'replayTimeline' in value &&
    Array.isArray(value.replayTimeline)
  );
}
