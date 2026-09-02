import type { CoreRuntimeState } from '../../core/state/core-runtime-state';
import type { RuntimeScope } from '../../core/state/runtime-state-contracts';
import type { Clock } from '../../core/time/clock';
import {
  BrowserRuntimePersistenceAdapter,
  type KeyValueStorage,
} from './browser-runtime-persistence.adapter';

class MemoryStorage implements KeyValueStorage {
  private readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }
}

const clock: Clock = {
  now: () => '2026-09-02T12:30:00.000Z',
};

const scope: RuntimeScope = {
  tenantId: 'tenant-school-1',
  projectId: 'project-example',
  projectVersion: '1.0.0',
  studentId: 'student-1',
  scopeType: 'student',
};

function snapshot(): CoreRuntimeState {
  return {
    version: 0,
    tenantId: scope.tenantId,
    projectId: scope.projectId,
    projectVersion: scope.projectVersion,
    lastUpdated: '2026-09-02T12:00:00.000Z',
    scope,
    stateValues: { progress: 0 },
    firedRuleIds: [],
  };
}

describe('BrowserRuntimePersistenceAdapter', () => {
  it('hydrates saved state across adapter instances and preserves version checks', async () => {
    const storage = new MemoryStorage();
    const first = new BrowserRuntimePersistenceAdapter<CoreRuntimeState>(storage, clock);
    await first.initializeRuntime(scope, snapshot());

    const saved = await first.saveRuntime(
      scope,
      [{ operation: 'set', path: '/stateValues/progress', value: 2 }],
      0,
    );
    const reloaded = new BrowserRuntimePersistenceAdapter<CoreRuntimeState>(storage, clock);
    const hydrated = await reloaded.initializeRuntime(scope, snapshot());

    expect(saved.snapshot).toMatchObject({ version: 1, stateValues: { progress: 2 } });
    expect(hydrated.applied).toBe(false);
    expect(hydrated.snapshot).toMatchObject({ version: 1, stateValues: { progress: 2 } });

    const conflict = await reloaded.saveRuntime(scope, [], 0);
    expect(conflict).toMatchObject({ success: false, conflict: true, previousVersion: 1 });
  });

  it('removes only the requested runtime scope', async () => {
    const storage = new MemoryStorage();
    const adapter = new BrowserRuntimePersistenceAdapter<CoreRuntimeState>(storage, clock);
    await adapter.initializeRuntime(scope, snapshot());

    await adapter.resetRuntime(scope);

    await expect(adapter.loadRuntime(scope)).rejects.toThrow('is not initialized');
  });
});
