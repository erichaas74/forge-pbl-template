import type {
  RuntimeScope,
  RuntimeStateListener,
  Unsubscribe,
} from './runtime-state-contracts';
import type { RuntimeError } from '../errors/runtime-error';

export type StateMutationOperation =
  | 'set'
  | 'increment'
  | 'decrement'
  | 'toggle'
  | 'add'
  | 'remove'
  | 'append';

export interface StateMutation {
  operation: StateMutationOperation;
  /** RFC 6901-style JSON pointer. Stable IDs containing dots remain intact. */
  path: string;
  value?: unknown;
  clientEventId?: string;
}

export interface StateMutationResult<TSnapshot = unknown> {
  success: boolean;
  applied: boolean;
  previousVersion: number;
  newVersion?: number;
  version?: number;
  snapshot?: TSnapshot;
  conflict?: boolean;
  errors?: RuntimeError[];
}

export interface RuntimePersistenceAdapter<TSnapshot = unknown> {
  loadRuntime(scope: RuntimeScope): Promise<TSnapshot>;
  saveRuntime(
    scope: RuntimeScope,
    mutations: StateMutation[],
    expectedVersion: number,
  ): Promise<StateMutationResult<TSnapshot>>;
}

export interface InitializableRuntimePersistenceAdapter<TSnapshot = unknown>
  extends RuntimePersistenceAdapter<TSnapshot> {
  initializeRuntime(
    scope: RuntimeScope,
    snapshot: TSnapshot,
    overwrite?: boolean,
  ): Promise<StateMutationResult<TSnapshot>>;
  resetRuntime(scope: RuntimeScope): Promise<void>;
}

export interface RuntimeChannel {
  scope: RuntimeScope;
  topic?: string;
}

export type RealtimeListener<TSnapshot = unknown> =
  RuntimeStateListener<TSnapshot>;

export interface RealtimeAdapter<TSnapshot = unknown> {
  subscribe(
    channel: RuntimeChannel,
    listener: RealtimeListener<TSnapshot>,
  ): Unsubscribe;
}

export interface WritableRealtimeAdapter<TSnapshot = unknown>
  extends RealtimeAdapter<TSnapshot> {
  publish(channel: RuntimeChannel, snapshot: TSnapshot): void;
}

export interface AssetUploadInput {
  file: Blob;
  fileName: string;
  contentType: string;
  metadata?: Record<string, string>;
}

export interface StoredAsset {
  id: string;
  reference: string;
  fileName?: string;
  contentType?: string;
  size?: number;
  metadata?: Record<string, string>;
}

export interface AssetStorageAdapter {
  upload(input: AssetUploadInput): Promise<StoredAsset>;
  getReference(assetId: string): Promise<StoredAsset>;
}
