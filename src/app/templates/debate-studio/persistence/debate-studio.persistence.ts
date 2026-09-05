import { InjectionToken } from '@angular/core';

import type {
  DebateMember,
  DebateRecording,
  DebateRecordingKind,
  DebateSession,
  DebateWorkspaceState,
} from '../domain/debate-studio.models';

export interface DebateSessionLocator {
  readonly projectId: string;
  readonly projectVersion: string;
  readonly classId: string;
  readonly sessionId: string;
}

export interface DebateSessionConnection {
  readonly actorId: string;
  readonly session: DebateSession;
}

export interface DebateSessionAdapter {
  initialize(
    locator: DebateSessionLocator,
    seed: DebateSession,
    member: Omit<DebateMember, 'id'>,
  ): Promise<DebateSessionConnection>;
  subscribe(
    locator: DebateSessionLocator,
    listener: (session: DebateSession) => void,
    onError: (error: unknown) => void,
  ): () => void;
  mutate(
    locator: DebateSessionLocator,
    seed: DebateSession,
    clientEventId: string,
    reducer: (session: DebateSession) => DebateSession,
  ): Promise<DebateSession>;
}

export interface DebateRecordingUpload {
  readonly locator: DebateSessionLocator;
  readonly turnId: string;
  readonly actorId: string;
  readonly blob: Blob;
  readonly kind: Exclude<DebateRecordingKind, 'transcript'>;
  readonly durationSeconds: number;
  readonly onProgress?: (progress: number) => void;
}

export interface DebateMediaAdapter {
  uploadRecording(input: DebateRecordingUpload): Promise<DebateRecording>;
}

export interface DebateWorkspacePersistenceAdapter {
  load(
    projectId: string,
    projectVersion: string,
    sessionId: string,
    studentId: string,
  ): DebateWorkspaceState | undefined;
  save(
    projectId: string,
    projectVersion: string,
    sessionId: string,
    studentId: string,
    state: DebateWorkspaceState,
  ): void;
  clear(projectId: string, projectVersion: string, sessionId: string, studentId: string): void;
}

export class BrowserDebateWorkspacePersistenceAdapter implements DebateWorkspacePersistenceAdapter {
  load(
    projectId: string,
    projectVersion: string,
    sessionId: string,
    studentId: string,
  ): DebateWorkspaceState | undefined {
    if (typeof localStorage === 'undefined') return undefined;
    const raw = localStorage.getItem(this.key(projectId, projectVersion, sessionId, studentId));
    if (raw === null) return undefined;
    try {
      const value = JSON.parse(raw) as DebateWorkspaceState;
      return value.schemaVersion === '2.0' ? value : undefined;
    } catch {
      return undefined;
    }
  }

  save(
    projectId: string,
    projectVersion: string,
    sessionId: string,
    studentId: string,
    state: DebateWorkspaceState,
  ): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(
      this.key(projectId, projectVersion, sessionId, studentId),
      JSON.stringify(state),
    );
  }

  clear(projectId: string, projectVersion: string, sessionId: string, studentId: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(this.key(projectId, projectVersion, sessionId, studentId));
  }

  private key(
    projectId: string,
    projectVersion: string,
    sessionId: string,
    studentId: string,
  ): string {
    return `forge:debate-workspace:${projectId}@${projectVersion}:${sessionId}:${studentId}`;
  }
}

export class MemoryDebateSessionAdapter implements DebateSessionAdapter {
  private session?: DebateSession;
  private readonly listeners = new Set<(session: DebateSession) => void>();

  async initialize(
    _locator: DebateSessionLocator,
    seed: DebateSession,
    member: Omit<DebateMember, 'id'>,
  ): Promise<DebateSessionConnection> {
    const actorId = `memory-${member.displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    this.session ??= structuredClone(seed);
    this.session = {
      ...this.session,
      members: { ...this.session.members, [actorId]: { ...member, id: actorId } },
    };
    return { actorId, session: structuredClone(this.session) };
  }

  subscribe(
    _locator: DebateSessionLocator,
    listener: (session: DebateSession) => void,
    _onError: (error: unknown) => void,
  ): () => void {
    this.listeners.add(listener);
    if (this.session !== undefined) listener(structuredClone(this.session));
    return () => this.listeners.delete(listener);
  }

  async mutate(
    _locator: DebateSessionLocator,
    seed: DebateSession,
    clientEventId: string,
    reducer: (session: DebateSession) => DebateSession,
  ): Promise<DebateSession> {
    const current = this.session ?? structuredClone(seed);
    if (current.processedEventIds.includes(clientEventId)) return structuredClone(current);
    const reduced = reducer(structuredClone(current));
    this.session = {
      ...reduced,
      revision: current.revision + 1,
      processedEventIds: [...current.processedEventIds.slice(-99), clientEventId],
    };
    for (const listener of this.listeners) listener(structuredClone(this.session));
    return structuredClone(this.session);
  }
}

export class MemoryDebateMediaAdapter implements DebateMediaAdapter {
  async uploadRecording(input: DebateRecordingUpload): Promise<DebateRecording> {
    input.onProgress?.(100);
    return {
      assetId: `memory-${input.turnId}-${input.actorId}`,
      storagePath: `memory/${input.turnId}`,
      downloadUrl: typeof URL === 'undefined' ? '' : URL.createObjectURL(input.blob),
      kind: input.kind,
      contentType: input.blob.type,
      durationSeconds: input.durationSeconds,
      uploadedAt: new Date().toISOString(),
    };
  }
}

export const DEBATE_STUDIO_SESSION = new InjectionToken<DebateSessionAdapter>(
  'DEBATE_STUDIO_SESSION',
);
export const DEBATE_STUDIO_MEDIA = new InjectionToken<DebateMediaAdapter>('DEBATE_STUDIO_MEDIA');
export const DEBATE_STUDIO_PERSISTENCE = new InjectionToken<DebateWorkspacePersistenceAdapter>(
  'DEBATE_STUDIO_PERSISTENCE',
);

/** @deprecated Use BrowserDebateWorkspacePersistenceAdapter. */
export const BrowserDebateStudioPersistenceAdapter = BrowserDebateWorkspacePersistenceAdapter;
/** @deprecated Use DebateWorkspacePersistenceAdapter. */
export type DebateStudioPersistenceAdapter = DebateWorkspacePersistenceAdapter;
