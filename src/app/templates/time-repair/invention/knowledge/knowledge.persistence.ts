import type { ProjectSessionContext } from '../../../../core/context/project-session-context';
import type { RuntimeEvent } from '../../../../core/events/runtime-event';
import { safeBrowserStorage, ScopedBrowserStore } from '../../../../shared/persistence';
import type { InventionSession } from '../invention.models';
import { replayKnowledge } from './knowledge.engine';

export interface KnowledgeSave {
  readonly events: readonly RuntimeEvent[];
}
export interface KnowledgePersistence {
  readonly available: boolean;
  load(session: InventionSession): KnowledgeSave | undefined;
  save(session: InventionSession, data: KnowledgeSave): void;
}
export class BrowserKnowledgePersistence implements KnowledgePersistence {
  readonly available: boolean;
  constructor(
    private readonly context: ProjectSessionContext,
    private readonly storage = safeBrowserStorage(),
  ) {
    this.available = !!storage;
  }
  private store(session: InventionSession): ScopedBrowserStore<KnowledgeSave> {
    return new ScopedBrowserStore(
      'invention-knowledge.v1',
      this.storage,
      (value): value is KnowledgeSave => {
        if (!value || typeof value !== 'object' || !session.knowledge) return false;
        const save = value as KnowledgeSave;
        return (
          Array.isArray(save.events) &&
          save.events.length <= 800 &&
          save.events.every(
            (e) =>
              e?.tenantId === this.context.tenantId &&
              e.actor?.id === this.context.actorId &&
              e.attemptId === this.context.attemptId,
          ) &&
          replayKnowledge(session.knowledge, save.events, this.context.projectId, session.id) !==
            undefined
        );
      },
    );
  }
  load(session: InventionSession): KnowledgeSave | undefined {
    return this.store(session).load({ ...this.context, sessionId: session.id });
  }
  save(session: InventionSession, data: KnowledgeSave): void {
    this.store(session).save({ ...this.context, sessionId: session.id }, data);
  }
}
