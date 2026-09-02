import { ReplaySubject } from 'rxjs';
import type {
  InitializableRuntimePersistenceAdapter,
  StateMutation,
  StateMutationResult,
  WritableRealtimeAdapter,
} from './persistence-contracts';
import type { CoreRuntimeState } from './core-runtime-state';
import type {
  RuntimeScope,
  RuntimeStateListener,
  Unsubscribe,
} from './runtime-state-contracts';
import { runtimeScopeKey } from './runtime-scope';

export class RuntimeStateService<TSnapshot extends CoreRuntimeState> {
  private readonly snapshots = new Map<string, TSnapshot>();
  private readonly subjects = new Map<string, ReplaySubject<TSnapshot>>();

  constructor(
    private readonly persistence: InitializableRuntimePersistenceAdapter<TSnapshot>,
    private readonly realtime?: WritableRealtimeAdapter<TSnapshot>,
  ) {}

  async initialize(
    scope: RuntimeScope,
    snapshot: TSnapshot,
    overwrite = false,
  ): Promise<StateMutationResult<TSnapshot>> {
    const result = await this.persistence.initializeRuntime(
      scope,
      snapshot,
      overwrite,
    );
    if (result.success && result.snapshot !== undefined) {
      this.acceptSnapshot(scope, result.snapshot);
    }
    return result;
  }

  async load(scope: RuntimeScope): Promise<TSnapshot> {
    const snapshot = await this.persistence.loadRuntime(scope);
    this.acceptSnapshot(scope, snapshot);
    return structuredClone(snapshot);
  }

  getSnapshot(scope: RuntimeScope): TSnapshot | undefined {
    const snapshot = this.snapshots.get(runtimeScopeKey(scope));
    return snapshot === undefined ? undefined : structuredClone(snapshot);
  }

  getStateValue(scope: RuntimeScope, id: string): unknown {
    return this.snapshots.get(runtimeScopeKey(scope))?.stateValues[id];
  }

  async applyMutations(
    scope: RuntimeScope,
    mutations: StateMutation[],
    expectedVersion: number,
  ): Promise<StateMutationResult<TSnapshot>> {
    const result = await this.persistence.saveRuntime(
      scope,
      mutations,
      expectedVersion,
    );
    if (result.success && result.snapshot !== undefined) {
      this.acceptSnapshot(scope, result.snapshot);
    }
    return result;
  }

  subscribe(
    scope: RuntimeScope,
    callback: RuntimeStateListener<TSnapshot>,
  ): Unsubscribe {
    const subject = this.subjectFor(scope);
    const subscription = subject.subscribe(callback);
    return () => subscription.unsubscribe();
  }

  async reset(scope: RuntimeScope): Promise<void> {
    const key = runtimeScopeKey(scope);
    this.snapshots.delete(key);
    const subject = this.subjects.get(key);
    subject?.complete();
    this.subjects.delete(key);
    await this.persistence.resetRuntime(scope);
  }

  private acceptSnapshot(scope: RuntimeScope, snapshot: TSnapshot): void {
    const copy = structuredClone(snapshot);
    this.snapshots.set(runtimeScopeKey(scope), copy);
    this.subjectFor(scope).next(structuredClone(copy));
    this.realtime?.publish({ scope, topic: 'runtime' }, structuredClone(copy));
  }

  private subjectFor(scope: RuntimeScope): ReplaySubject<TSnapshot> {
    const key = runtimeScopeKey(scope);
    let subject = this.subjects.get(key);
    if (subject === undefined) {
      subject = new ReplaySubject<TSnapshot>(1);
      this.subjects.set(key, subject);
      const current = this.snapshots.get(key);
      if (current !== undefined) {
        subject.next(structuredClone(current));
      }
    }
    return subject;
  }
}
