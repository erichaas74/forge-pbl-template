import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import {
  EMPTY_INTRO_RESPONSE,
  IntroError,
  introEvents,
  responseReady,
  validateIntroConfig,
  type IntroPersistenceAdapter,
  type IntroResponse,
  type IntroScope,
  type IntroSnapshot,
  type ProjectIntroConfig,
} from './project-intro.models';

export const PROJECT_INTRO_CONFIG = new InjectionToken<ProjectIntroConfig>('PROJECT_INTRO_CONFIG');
export const PROJECT_INTRO_PERSISTENCE = new InjectionToken<IntroPersistenceAdapter>(
  'PROJECT_INTRO_PERSISTENCE',
);

@Injectable()
export class ProjectIntroRuntime {
  private readonly persistence = inject(PROJECT_INTRO_PERSISTENCE);
  private scope?: IntroScope;
  private config?: ProjectIntroConfig;
  private queue: Promise<unknown> = Promise.resolve();
  private ready = false;
  readonly snapshot = signal<IntroSnapshot | undefined>(undefined);
  readonly draft = signal<IntroResponse>({ ...EMPTY_INTRO_RESPONSE });
  readonly error = signal<string | undefined>(undefined);
  readonly status = signal('Your opening response is ungraded.');
  readonly saving = signal(false);
  readonly dirty = signal(false);

  async initialize(scope: IntroScope, config: ProjectIntroConfig): Promise<void> {
    validateIntroConfig(config);
    this.scope = scope;
    this.config = config;
    try {
      const snapshot = await this.persistence.load(scope);
      this.snapshot.set(snapshot);
      this.draft.set(snapshot?.draft ?? { ...EMPTY_INTRO_RESPONSE });
      this.ready = true;
      if (snapshot) this.status.set(this.persistence.saveLocation);
    } catch (error: unknown) {
      this.report(error);
    }
  }

  update(patch: Partial<IntroResponse>): void {
    this.draft.update((draft) => ({ ...draft, ...patch }));
    this.dirty.set(true);
    this.status.set('Unsaved changes');
  }

  saveDraft(): Promise<boolean> {
    return this.save(false);
  }
  accept(clientEventId: string = crypto.randomUUID()): Promise<boolean> {
    return this.save(true, clientEventId);
  }

  private save(accept: boolean, clientEventId?: string): Promise<boolean> {
    const draft = { ...this.draft() };
    const run = async (): Promise<boolean> => {
      if (!this.scope || !this.config) return false;
      if (!this.ready) {
        try {
          this.snapshot.set(await this.persistence.load(this.scope));
          this.ready = true;
        } catch (error: unknown) {
          this.report(error);
          return false;
        }
      }
      if (accept && !responseReady(this.config, draft)) {
        this.error.set(
          'Choose an answer and a direction, then add your reason and a question before starting.',
        );
        return false;
      }
      const previous = this.snapshot();
      if (clientEventId && previous?.history.some((entry) => entry.clientEventId === clientEventId))
        return true;
      if (!accept && JSON.stringify(previous?.draft) === JSON.stringify(draft)) return true;
      const timestamp = new Date().toISOString();
      const snapshot: IntroSnapshot = {
        schemaVersion: '1.0',
        revision: (previous?.revision ?? 0) + 1,
        updatedAt: timestamp,
        draft,
        history: accept
          ? [
              ...(previous?.history ?? []),
              {
                clientEventId: clientEventId!,
                timestamp,
                eventType: previous?.history.length ? introEvents.revised : introEvents.accepted,
                response: draft,
              },
            ]
          : (previous?.history ?? []),
      };
      this.saving.set(true);
      try {
        await this.persistence.save(this.scope, snapshot, previous?.revision ?? 0);
        this.snapshot.set(snapshot);
        this.error.set(undefined);
        const unchanged = JSON.stringify(this.draft()) === JSON.stringify(draft);
        this.dirty.set(!unchanged);
        this.status.set(unchanged ? this.persistence.saveLocation : 'Unsaved changes');
        return true;
      } catch (error: unknown) {
        this.report(error);
        return false;
      } finally {
        this.saving.set(false);
      }
    };
    const result = this.queue.then(run, run);
    this.queue = result;
    return result;
  }

  private report(error: unknown): void {
    this.error.set(
      error instanceof IntroError
        ? error.message
        : 'Your response could not be saved. Please try again.',
    );
    this.status.set('Not saved');
  }
}
