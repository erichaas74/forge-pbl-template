import type { StudentJourneyRecord } from '../domain/journey-replay.models';

export interface JourneyReplayPersistenceAdapter {
  load(projectId: string, projectVersion: string, studentId: string): StudentJourneyRecord | undefined;
  save(record: StudentJourneyRecord): void;
  clear(projectId: string, projectVersion: string, studentId: string): void;
}

export class BrowserJourneyReplayPersistenceAdapter implements JourneyReplayPersistenceAdapter {
  constructor(private readonly storage: Storage | undefined = safeStorage()) {}

  load(
    projectId: string,
    projectVersion: string,
    studentId: string,
  ): StudentJourneyRecord | undefined {
    const value = this.storage?.getItem(storageKey(projectId, projectVersion, studentId));
    if (value === undefined || value === null) return undefined;
    try {
      const parsed: unknown = JSON.parse(value);
      return isStudentJourneyRecord(parsed) ? parsed : undefined;
    } catch {
      return undefined;
    }
  }

  save(record: StudentJourneyRecord): void {
    this.storage?.setItem(
      storageKey(record.projectId, record.projectVersion, record.studentId),
      JSON.stringify(record),
    );
  }

  clear(projectId: string, projectVersion: string, studentId: string): void {
    this.storage?.removeItem(storageKey(projectId, projectVersion, studentId));
  }
}

export class MemoryJourneyReplayPersistenceAdapter implements JourneyReplayPersistenceAdapter {
  private readonly records = new Map<string, StudentJourneyRecord>();

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
