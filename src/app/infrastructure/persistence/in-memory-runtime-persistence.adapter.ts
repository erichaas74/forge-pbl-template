import { runtimeError } from '../../core/errors/runtime-error-factory';
import type {
  InitializableRuntimePersistenceAdapter,
  StateMutation,
  StateMutationResult,
} from '../../core/state/persistence-contracts';
import type { CoreRuntimeState } from '../../core/state/core-runtime-state';
import { applyStateMutations } from '../../core/state/state-mutation-applier';
import type { RuntimeScope } from '../../core/state/runtime-state-contracts';
import { runtimeScopeKey } from '../../core/state/runtime-scope';
import type { Clock } from '../../core/time/clock';
import { SystemClock } from '../../core/time/clock';

export class InMemoryRuntimePersistenceAdapter<TSnapshot extends CoreRuntimeState>
  implements InitializableRuntimePersistenceAdapter<TSnapshot>
{
  private readonly snapshots = new Map<string, TSnapshot>();

  constructor(private readonly clock: Clock = new SystemClock()) {}

  async initializeRuntime(
    scope: RuntimeScope,
    snapshot: TSnapshot,
    overwrite = false,
  ): Promise<StateMutationResult<TSnapshot>> {
    const key = runtimeScopeKey(scope);
    const existing = this.snapshots.get(key);
    if (existing !== undefined && !overwrite) {
      return this.success(existing.version, existing.version, existing, false);
    }

    const stored = structuredClone(snapshot);
    this.snapshots.set(key, stored);
    return this.success(stored.version, stored.version, stored, true);
  }

  async loadRuntime(scope: RuntimeScope): Promise<TSnapshot> {
    const snapshot = this.snapshots.get(runtimeScopeKey(scope));
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
    const key = runtimeScopeKey(scope);
    const current = this.snapshots.get(key);
    if (current === undefined) {
      return {
        success: false,
        applied: false,
        previousVersion: expectedVersion,
        errors: [
          runtimeError('RUNTIME_NOT_FOUND', `Runtime scope "${key}" is not initialized.`),
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
    this.snapshots.set(key, structuredClone(next));
    return this.success(current.version, next.version, next, true);
  }

  async resetRuntime(scope: RuntimeScope): Promise<void> {
    this.snapshots.delete(runtimeScopeKey(scope));
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
