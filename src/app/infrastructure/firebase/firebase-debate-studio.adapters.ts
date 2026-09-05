import { getAuth, signInAnonymously, type Auth } from 'firebase/auth';
import {
  getDatabase,
  onValue,
  ref as databaseRef,
  runTransaction,
  type Database,
} from 'firebase/database';
import type { FirebaseApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  type FirebaseStorage,
} from 'firebase/storage';

import type { DebateMember, DebateRecording, DebateSession } from '../../templates/debate-studio';
import type {
  DebateMediaAdapter,
  DebateRecordingUpload,
  DebateSessionAdapter,
  DebateSessionConnection,
  DebateSessionLocator,
} from '../../templates/debate-studio/persistence/debate-studio.persistence';

export class FirebaseDebateSessionAdapter implements DebateSessionAdapter {
  private readonly auth: Auth;
  private readonly database: Database;
  private actorIdPromise?: Promise<string>;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.database = getDatabase(app);
  }

  async initialize(
    locator: DebateSessionLocator,
    seed: DebateSession,
    member: Omit<DebateMember, 'id'>,
  ): Promise<DebateSessionConnection> {
    const actorId = await this.actorId();
    const target = databaseRef(this.database, this.path(locator));
    const result = await runTransaction(target, (value: DebateSession | null) => {
      const current = value?.schemaVersion === '2.0' ? value : seed;
      return firebaseValue({
        ...current,
        members:
          current.members[actorId] === undefined
            ? { ...current.members, [actorId]: { ...member, id: actorId } }
            : current.members,
      });
    });
    const session = result.snapshot.val() as DebateSession | null;
    if (!result.committed || session === null)
      throw new Error('DEBATE_SESSION_INITIALIZATION_FAILED');
    return { actorId, session };
  }

  subscribe(
    locator: DebateSessionLocator,
    listener: (session: DebateSession) => void,
    onError: (error: unknown) => void,
  ): () => void {
    return onValue(
      databaseRef(this.database, this.path(locator)),
      (snapshot) => {
        const session = snapshot.val() as DebateSession | null;
        if (session?.schemaVersion === '2.0') listener(session);
      },
      onError,
    );
  }

  async mutate(
    locator: DebateSessionLocator,
    seed: DebateSession,
    clientEventId: string,
    reducer: (session: DebateSession) => DebateSession,
  ): Promise<DebateSession> {
    await this.actorId();
    const target = databaseRef(this.database, this.path(locator));
    const result = await runTransaction(target, (value: DebateSession | null) => {
      const current = value?.schemaVersion === '2.0' ? value : seed;
      if (current.processedEventIds.includes(clientEventId)) return current;
      const reduced = reducer(structuredClone(current));
      return firebaseValue({
        ...reduced,
        revision: current.revision + 1,
        processedEventIds: [...current.processedEventIds.slice(-99), clientEventId],
      });
    });
    const session = result.snapshot.val() as DebateSession | null;
    if (!result.committed || session === null) throw new Error('DEBATE_SESSION_MUTATION_FAILED');
    return session;
  }

  private actorId(): Promise<string> {
    this.actorIdPromise ??= this.resolveActorId();
    return this.actorIdPromise;
  }

  private async resolveActorId(): Promise<string> {
    if (this.auth.currentUser !== null) return this.auth.currentUser.uid;
    const credential = await signInAnonymously(this.auth);
    return credential.user.uid;
  }

  private path(locator: DebateSessionLocator): string {
    return [
      'debateSessions',
      safeKey(locator.projectId),
      safeKey(locator.projectVersion),
      safeKey(locator.classId),
      safeKey(locator.sessionId),
    ].join('/');
  }
}

export class FirebaseDebateMediaAdapter implements DebateMediaAdapter {
  private readonly storage: FirebaseStorage;

  constructor(app: FirebaseApp) {
    this.storage = getStorage(app);
  }

  async uploadRecording(input: DebateRecordingUpload): Promise<DebateRecording> {
    const extension = input.kind === 'video' ? 'webm' : 'webm';
    const assetId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const path = [
      'debate-recordings',
      safeKey(input.locator.projectId),
      safeKey(input.locator.projectVersion),
      safeKey(input.locator.classId),
      safeKey(input.locator.sessionId),
      safeKey(input.turnId),
      safeKey(input.actorId),
      `${assetId}.${extension}`,
    ].join('/');
    const upload = uploadBytesResumable(storageRef(this.storage, path), input.blob, {
      contentType: input.blob.type,
      customMetadata: {
        projectId: input.locator.projectId,
        classId: input.locator.classId,
        sessionId: input.locator.sessionId,
        turnId: input.turnId,
        actorId: input.actorId,
      },
    });
    const snapshot = await new Promise<typeof upload.snapshot>((resolve, reject) => {
      upload.on(
        'state_changed',
        (next) => input.onProgress?.(Math.round((next.bytesTransferred / next.totalBytes) * 100)),
        reject,
        () => resolve(upload.snapshot),
      );
    });
    return {
      assetId,
      storagePath: path,
      downloadUrl: await getDownloadURL(snapshot.ref),
      kind: input.kind,
      contentType: input.blob.type,
      durationSeconds: input.durationSeconds,
      uploadedAt: new Date().toISOString(),
    };
  }
}

function safeKey(value: string): string {
  return value.replace(/[.#$\[\]/]/g, '-');
}

function firebaseValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
