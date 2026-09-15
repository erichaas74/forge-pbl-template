import {
  computed,
  effect,
  inject,
  Injectable,
  InjectionToken,
  signal,
  untracked,
} from '@angular/core';
import type { RuntimeEvent } from '../../../../core/events/runtime-event';
import { INVENTION_CONTEXT, InventionRuntime } from '../invention.runtime';
import { applyKnowledgeEvent, knowledgeActivities, replayKnowledge } from './knowledge.engine';
import { emptyKnowledge, type KnowledgeAction } from './knowledge.models';
import type { KnowledgePersistence } from './knowledge.persistence';

export const KNOWLEDGE_PERSISTENCE = new InjectionToken<KnowledgePersistence>(
  'KNOWLEDGE_PERSISTENCE',
);
@Injectable()
export class KnowledgeRuntime {
  readonly r = inject(InventionRuntime);
  private readonly context = inject(INVENTION_CONTEXT);
  private readonly persistence = inject(KNOWLEDGE_PERSISTENCE);
  readonly config = computed(() => this.r.session().knowledge);
  readonly active = computed(() => !!this.config());
  readonly state = signal(emptyKnowledge());
  readonly message = computed(
    () => this.state().message || 'Operate the objects. Your observations will appear here.',
  );
  readonly storageMessage = signal('');
  readonly events = signal<readonly RuntimeEvent[]>([]);
  private readonly visits = new Map<string, readonly RuntimeEvent[]>();
  constructor() {
    effect(() => {
      const config = this.config();
      const session = this.r.session();
      untracked(() => {
        this.storageMessage.set('');
        if (!config) {
          this.state.set(emptyKnowledge());
          this.events.set([]);
          return;
        }
        let events: readonly RuntimeEvent[] = this.visits.get(session.id) ?? [];
        if (!this.r.example && !this.visits.has(session.id))
          try {
            events = this.persistence.load(session)?.events ?? [];
          } catch {
            this.storageMessage.set('Saved work could not be read. This visit remains usable.');
          }
        if (this.r.example) events = [];
        this.events.set(events);
        this.state.set(
          replayKnowledge(config, events, this.r.project.projectId, session.id) ??
            knowledgeActivities[config.kind].initial(config),
        );
      });
    });
  }
  act(action: KnowledgeAction): void {
    const c = this.config();
    if (!c) return;
    if (this.events().length >= 800) {
      this.storageMessage.set(
        'Notebook full. Download it, then reset this activity from the task box.',
      );
      return;
    }
    const id = crypto.randomUUID();
    const event: RuntimeEvent = {
      id,
      clientEventId: id,
      eventType: `inventionKnowledge.${c.kind}Operated`,
      timestamp: new Date().toISOString(),
      tenantId: this.context.tenantId,
      projectId: this.r.project.projectId,
      attemptId: this.context.attemptId,
      actor: { type: 'student', id: this.context.actorId },
      sourceId: this.r.session().id,
      payload: { action },
    };
    const next = applyKnowledgeEvent(
      c,
      this.state(),
      event,
      this.r.project.projectId,
      this.r.session().id,
    );
    if (next === this.state()) return;
    this.state.set(next);
    this.events.update((events) => [...events, event]);
    this.save();
  }
  private save(): void {
    if (this.r.example) return;
    this.visits.set(this.r.session().id, this.events());
    try {
      this.persistence.save(this.r.session(), { events: this.events() });
      this.storageMessage.set(
        this.persistence.available
          ? 'Saved on this device'
          : 'Storage unavailable · keep this visit open',
      );
    } catch {
      this.storageMessage.set('Could not save. Download this notebook before leaving.');
    }
  }
  reset(): void {
    const c = this.config();
    if (!c) return;
    this.state.set(knowledgeActivities[c.kind].initial(c));
    this.events.set([]);
    this.save();
  }
  export(): void {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            projectId: this.r.project.projectId,
            projectVersion: this.r.project.projectVersion,
            session: this.r.session().id,
            label: 'Local model evidence, not assessment',
            events: this.events(),
            state: this.state(),
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.r.session().id}-knowledge-notebook.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
