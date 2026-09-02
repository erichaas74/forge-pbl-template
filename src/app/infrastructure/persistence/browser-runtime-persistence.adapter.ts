import { runtimeError } from '../../core/errors/runtime-error-factory';
import type { CoreRuntimeState } from '../../core/state/core-runtime-state';
import type {
  InitializableRuntimePersistenceAdapter,
  StateMutation,
  StateMutationResult,
} from '../../core/state/persistence-contracts';
import { applyStateMutations } from '../../core/state/state-mutation-applier';
import type { RuntimeScope } from '../../core/state/runtime-state-contracts';
import { runtimeScopeKey } from '../../core/state/runtime-scope';
import type { Clock } from '../../core/time/clock';
import { SystemClock } from '../../core/time/clock';

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export class BrowserRuntimePersistenceAdapter<
  TSnapshot extends CoreRuntimeState,
> implements InitializableRuntimePersistenceAdapter<TSnapshot> {
  constructor(
    private readonly storage: KeyValueStorage,
    private readonly clock: Clock = new SystemClock(),
    private readonly prefix = 'forge-pbl.runtime.v1',
  ) {}

  async initializeRuntime(
    scope: RuntimeScope,
    snapshot: TSnapshot,
    overwrite = false,
  ): Promise<StateMutationResult<TSnapshot>> {
    const existing = this.read(scope);
    if (existing !== undefined && !overwrite) {
      const hydrated = {
        ...structuredClone(snapshot),
        ...structuredClone(existing),
      } as TSnapshot;
      this.write(scope, hydrated);
      return this.success(existing.version, existing.version, hydrated, false);
    }
    const stored = structuredClone(snapshot);
    this.write(scope, stored);
    return this.success(stored.version, stored.version, stored, true);
  }

  async loadRuntime(scope: RuntimeScope): Promise<TSnapshot> {
    const snapshot = this.read(scope);
    if (snapshot === undefined) {
      throw new Error(`Runtime scope "${runtimeScopeKey(scope)}" is not initialized.`);
    }
    return structuredClone(snapshot);
  }

  async saveRuntime(
    scope: RuntimeScope,
    mutations: StateMutation[],
    expectedVersion: number,
  ): Promise<StateMutationResult<TSnapshot>> {
    const current = this.read(scope);
    if (current === undefined) {
      return {
        success: false,
        applied: false,
        previousVersion: expectedVersion,
        errors: [
          runtimeError(
            'RUNTIME_NOT_FOUND',
            `Runtime scope "${runtimeScopeKey(scope)}" is not initialized.`,
          ),
        ],
      };
    }
    if (current.version !== expectedVersion) {
      return {
        success: false,
        applied: false,
        previousVersion: current.version,
        conflict: true,
        errors: [
          runtimeError(
            'STATE_CONFLICT',
            `Expected runtime version ${expectedVersion}, but current version is ${current.version}.`,
          ),
        ],
      };
    }

    const applied = applyStateMutations<TSnapshot>(current, mutations);
    if (!applied.success) {
      return {
        success: false,
        applied: false,
        previousVersion: current.version,
        errors: applied.errors,
      };
    }

    const next = applied.state;
    next.version = current.version + 1;
    next.lastUpdated = this.clock.now();
    this.write(scope, next);
    return this.success(current.version, next.version, next, true);
  }

  async resetRuntime(scope: RuntimeScope): Promise<void> {
    this.storage.removeItem(this.key(scope));
  }

  private read(scope: RuntimeScope): TSnapshot | undefined {
    const raw = this.storage.getItem(this.key(scope));
    if (raw === null) {
      return undefined;
    }
    try {
      const value: unknown = JSON.parse(raw);
      return isRuntimeState(value) ? (value as TSnapshot) : undefined;
    } catch {
      return undefined;
    }
  }

  private write(scope: RuntimeScope, snapshot: TSnapshot): void {
    this.storage.setItem(this.key(scope), JSON.stringify(snapshot));
  }

  private key(scope: RuntimeScope): string {
    return `${this.prefix}:${runtimeScopeKey(scope)}`;
  }

  private success(
    previousVersion: number,
    newVersion: number,
    snapshot: TSnapshot,
    applied: boolean,
  ): StateMutationResult<TSnapshot> {
    return {
      success: true,
      applied,
      previousVersion,
      newVersion,
      version: newVersion,
      snapshot: structuredClone(snapshot),
    };
  }
}

function isRuntimeState(value: unknown): value is CoreRuntimeState {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { version?: unknown }).version === 'number' &&
    typeof (value as { tenantId?: unknown }).tenantId === 'string' &&
    typeof (value as { projectId?: unknown }).projectId === 'string' &&
    typeof (value as { projectVersion?: unknown }).projectVersion === 'string'
  );
}
