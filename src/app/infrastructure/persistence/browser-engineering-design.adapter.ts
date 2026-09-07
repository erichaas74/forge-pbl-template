import type { ProjectSessionContext } from '../../core/context/project-session-context';
import {
  ScopedBrowserStore,
  safeBrowserStorage,
} from '../../shared/persistence/scoped-browser-store';
import {
  isEngineeringSnapshot,
  type EngineeringSnapshot,
} from '../../templates/engineering-design/domain/engineering-design.models';
import type { EngineeringPersistence } from '../../templates/engineering-design/runtime/engineering-design.runtime';
export class BrowserEngineeringDesignAdapter implements EngineeringPersistence {
  private readonly store: ScopedBrowserStore<EngineeringSnapshot>;
  readonly location: string;
  constructor(
    private readonly session: ProjectSessionContext,
    private readonly storage = safeBrowserStorage(),
  ) {
    this.store = new ScopedBrowserStore('engineering-design.v1', storage, isEngineeringSnapshot);
    this.location = storage
      ? 'Saved in this browser'
      : 'Session only — export your notebook to keep it';
  }
  load(): EngineeringSnapshot | undefined {
    return this.store.load(this.session);
  }
  save(snapshot: EngineeringSnapshot): void {
    this.store.save(this.session, snapshot);
  }
}
