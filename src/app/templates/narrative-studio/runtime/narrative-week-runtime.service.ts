import { inject, Injectable, Injector, OnDestroy } from '@angular/core';
import { narrativeWeekConfig, usesNarrativeWeeklyPreview, validateNarrativePreview } from '../core/narrative-preview';
import { createInitialNarrativeState } from '../core/narrative-studio-state';
import type { NarrativePreviewWeek } from '../domain/narrative-preview.models';
import { MemoryNarrativeStudioPersistenceAdapter, NARRATIVE_STUDIO_PERSISTENCE } from '../persistence/narrative-studio.persistence';
import { NarrativeStudioRuntimeService } from './narrative-studio-runtime.service';
import { NARRATIVE_STUDIO_COACH, NARRATIVE_STUDIO_CONFIG, NARRATIVE_STUDIO_SESSION } from './narrative-studio.tokens';

/** Composes existing authoring tools with memory adapters. No browser/student storage is injected. */
@Injectable()
export class NarrativeWeekRuntimeService implements OnDestroy {
  readonly config = inject(NARRATIVE_STUDIO_CONFIG);
  private readonly session = inject(NARRATIVE_STUDIO_SESSION);
  private readonly parent = inject(Injector);
  private readonly runtimes = new Map<string, { runtime: NarrativeStudioRuntimeService; injector: ReturnType<typeof Injector.create> }>();

  constructor() {
    if (!usesNarrativeWeeklyPreview(this.config, this.session)) throw new Error('NARRATIVE_PREVIEW_UNAVAILABLE: A local authoring preview is required.');
    validateNarrativePreview(this.config);
  }

  forWeek(week: NarrativePreviewWeek): NarrativeStudioRuntimeService {
    const cached = this.runtimes.get(week.id);
    if (cached) return cached.runtime;
    const config = narrativeWeekConfig(this.config, week);
    const initial = createInitialNarrativeState(config);
    const persistence = new MemoryNarrativeStudioPersistenceAdapter();
    persistence.save({
      ...initial, storyTitle: week.title, bible: { ...initial.bible, pointOfView: 'first' },
      scenes: Object.fromEntries(week.scenes.map((scene) => [scene.id, {
        ...initial.scenes[scene.id], text: scene.starterText,
        choiceLabels: Object.fromEntries(scene.choices.map((choice) => [choice.id, choice.prompt])),
      }])),
    });
    const injector = Injector.create({ parent: this.parent, providers: [
      { provide: NARRATIVE_STUDIO_CONFIG, useValue: config },
      { provide: NARRATIVE_STUDIO_SESSION, useValue: this.session },
      { provide: NARRATIVE_STUDIO_PERSISTENCE, useValue: persistence },
      { provide: NARRATIVE_STUDIO_COACH, useValue: { respond: () => Promise.reject(new Error('TUTOR_DISCONNECTED')) } },
      NarrativeStudioRuntimeService,
    ] });
    const runtime = injector.get(NarrativeStudioRuntimeService);
    this.runtimes.set(week.id, { runtime, injector });
    return runtime;
  }

  ngOnDestroy(): void {
    for (const { runtime, injector } of this.runtimes.values()) { runtime.destroy(); injector.destroy(); }
    this.runtimes.clear();
  }
}
