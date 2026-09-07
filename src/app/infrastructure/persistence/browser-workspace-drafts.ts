import type { WorkspaceDraftStore } from '../../shared/drafts/workspace-drafts';
import type { ProjectSessionContext } from '../../core/context/project-session-context';
import { projectSessionRuntimeScope } from '../../core/context/project-session-context';
import { runtimeScopeKey } from '../../core/state/runtime-scope';

/** Drafts are isolated by tenant, project, version, attempt and learner. */
export class BrowserWorkspaceDrafts implements WorkspaceDraftStore {
  private readonly memory = new Map<string, unknown>();
  private readonly prefix: string;
  constructor(
    session: ProjectSessionContext,
    private readonly storage: Pick<Storage, 'getItem' | 'setItem'> | undefined = safeStorage(),
  ) {
    this.prefix = `forge-pbl.workspace.v1:${runtimeScopeKey(projectSessionRuntimeScope(session, 'student'))}:`;
  }
  read<T>(key: string): T | undefined {
    if (this.memory.has(key)) return structuredClone(this.memory.get(key)) as T;
    try {
      const raw = this.storage?.getItem(this.prefix + key);
      return raw ? (JSON.parse(raw) as T) : undefined;
    } catch {
      return undefined;
    }
  }
  write<T>(key: string, value: T): void {
    this.memory.set(key, structuredClone(value));
    try {
      this.storage?.setItem(this.prefix + key, JSON.stringify(value));
    } catch {
      /* Keep session draft when storage is unavailable. */
    }
  }
}
function safeStorage(): Storage | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}
