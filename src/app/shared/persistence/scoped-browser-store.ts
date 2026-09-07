export interface WorkspaceStorageScope {
  readonly tenantId: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly classId?: string;
  readonly actorId?: string;
  readonly teamId?: string;
  readonly attemptId?: string;
  readonly sessionId?: string;
}

/** Shared, tenant-safe browser persistence for template-owned draft state. */
export class ScopedBrowserStore<T> {
  constructor(
    private readonly namespace: string,
    private readonly storage: Storage | undefined,
    private readonly validate: (value: unknown) => value is T,
  ) {}

  load(scope: WorkspaceStorageScope): T | undefined {
    const raw = this.storage?.getItem(this.key(scope));
    if (raw === undefined || raw === null) return undefined;
    try {
      const value: unknown = JSON.parse(raw);
      return this.validate(value) ? value : undefined;
    } catch {
      return undefined;
    }
  }

  save(scope: WorkspaceStorageScope, value: T): void {
    this.storage?.setItem(this.key(scope), JSON.stringify(value));
  }

  clear(scope: WorkspaceStorageScope): void {
    this.storage?.removeItem(this.key(scope));
  }

  private key(scope: WorkspaceStorageScope): string {
    return [
      'forge',
      this.namespace,
      scope.tenantId,
      scope.projectId,
      scope.projectVersion,
      scope.classId ?? '',
      scope.actorId ?? '',
      scope.teamId ?? '',
      scope.attemptId ?? '',
      scope.sessionId ?? '',
    ]
      .map(encodeURIComponent)
      .join(':');
  }
}

export function safeBrowserStorage(): Storage | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}
