import {
  computed,
  inject,
  Injectable,
  InjectionToken,
  signal,
  type OnDestroy,
} from '@angular/core';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import {
  INVENTION_EVENTS,
  type InventionAction,
  type InventionProject,
  type PressSettings,
  type WorkshopStation,
} from './invention.models';
import {
  applyInventionAction,
  batchReady,
  consecutiveGoodProofs,
  initialInventionState,
  validPressSettings,
} from './printing-press.engine';
import {
  restoreInventionState,
  type InventionPersistence,
  type InventionSave,
} from './invention.persistence';

export const INVENTION_PROJECT = new InjectionToken<InventionProject>('INVENTION_PROJECT');
export const INVENTION_CONTEXT = new InjectionToken<ProjectSessionContext>('INVENTION_CONTEXT');
export const INVENTION_EXAMPLE = new InjectionToken<boolean>('INVENTION_EXAMPLE');
// Provided by the activity scope, never by the root injector: identity lives in the project injector.
export const INVENTION_PERSISTENCE = new InjectionToken<InventionPersistence>(
  'INVENTION_PERSISTENCE',
);

@Injectable()
export class InventionRuntime implements OnDestroy {
  readonly project = inject(INVENTION_PROJECT);
  private readonly context = inject(INVENTION_CONTEXT);
  private readonly persistence = inject(INVENTION_PERSISTENCE);
  private readonly visits = new Map<string, InventionSave>();
  readonly example = inject(INVENTION_EXAMPLE, { optional: true }) ?? false;
  readonly content = this.project.inventionRescue;
  readonly number = signal(this.example ? 8 : 1);
  readonly session = computed(() => this.content.sessions[this.number() - 1]);
  readonly week = computed(() => Math.ceil(this.number() / 2));
  readonly weekContent = computed(() => this.content.weeks[this.week() - 1]);
  readonly state = signal(initialInventionState());
  readonly settings = signal<PressSettings>(structuredClone(this.session().initial));
  readonly selectedType = signal<number | null>(null);
  readonly selectedProof = signal<number | null>(null);
  readonly proof = computed(
    () =>
      this.state().trials.find((t) => t.id === this.selectedProof()) ?? this.state().trials.at(-1),
  );
  readonly goodCount = computed(() => consecutiveGoodProofs(this.state()));
  readonly repaired = computed(() => batchReady(this.state(), this.session()));
  readonly scene = signal<'press' | 'courtyard'>('courtyard');
  readonly message = signal('');
  readonly storageMessage = signal('');
  readonly materialSurface = signal<'paper' | 'metal'>('metal');
  readonly sourceIds = computed(() =>
    this.content.sources.filter((s) => this.session().sourceIds.includes(s.id)),
  );
  constructor() {
    if (this.context.authorityMode !== 'localDemo')
      throw new Error(
        'CAPABILITY_NOT_INSTALLED: Invention Repair requires a classroom authority adapter for shared sessions.',
      );
    this.load();
  }
  open(number: number): void {
    if (
      this.example ||
      !Number.isInteger(number) ||
      number < 1 ||
      number > 8 ||
      number === this.number()
    )
      return;
    this.save();
    this.number.set(number);
    this.load();
  }
  private load(): void {
    let saved = this.example ? undefined : this.visits.get(this.session().id);
    try {
      if (!this.example && !saved) saved = this.persistence.load(this.session());
    } catch {
      this.storageMessage.set('Saved work could not be read. This attempt stays in this visit.');
    }
    this.state.set(
      saved
        ? (restoreInventionState(this.project, this.session(), saved.events) ??
            initialInventionState())
        : initialInventionState(),
    );
    this.settings.set(structuredClone(saved?.settings ?? this.session().initial));
    this.scene.set(this.session().mode === 'courtyard' ? 'courtyard' : 'press');
    this.selectedType.set(null);
    this.selectedProof.set(null);
    this.message.set('');
    if (this.example) {
      const ink = this.content.inks.find((i) => i.adhesion >= 0.8 && i.spread <= 0.2)!;
      this.settings.set({
        type: [...this.session().target].reverse(),
        ink: ink.id,
        pressure: 1,
        packing: [1, 1, 1],
      });
      for (let i = 0; i < this.session().batchSize; i++)
        this.dispatch({ type: 'proof', settings: this.settings() });
      this.scene.set('courtyard');
      this.message.set('Example repair. Explore how printed sheets move through the workshop.');
    }
  }
  ngOnDestroy(): void {
    this.save();
  }
  save(): void {
    if (this.example) return;
    const save = { settings: structuredClone(this.settings()), events: this.state().events };
    this.visits.set(this.session().id, save);
    try {
      this.persistence.save(this.session(), save);
      this.storageMessage.set(
        this.persistence.available
          ? 'Saved on this device'
          : 'Storage unavailable · keep this visit open',
      );
    } catch {
      this.storageMessage.set('Could not save. Download the trial notebook before leaving.');
    }
  }
  private dispatch(action: InventionAction): void {
    const id = crypto.randomUUID();
    const result = applyInventionAction(this.project, this.session(), this.state(), action, {
      id,
      clientEventId: id,
      eventType: INVENTION_EVENTS[action.type],
      timestamp: new Date().toISOString(),
      tenantId: this.context.tenantId,
      projectId: this.project.projectId,
      attemptId: this.context.attemptId,
      sourceId: this.session().id,
      actor: { type: 'student', id: this.context.actorId },
      payload: { action },
    });
    this.state.set(result.state);
    this.message.set(result.message);
    this.save();
  }
  configure(patch: Partial<PressSettings>): void {
    const next = { ...this.settings(), ...patch };
    if (validPressSettings(next, this.project, this.session())) {
      this.settings.set(next);
      this.message.set('Setup changed. Pull a new proof to test it.');
      this.save();
    }
  }
  swapType(index: number): void {
    if (index < 0 || index >= this.settings().type.length) return;
    const first = this.selectedType();
    if (first === null) {
      this.selectedType.set(index);
      return;
    }
    const type = [...this.settings().type];
    [type[first], type[index]] = [type[index], type[first]];
    this.configure({ type });
    this.selectedType.set(null);
  }
  cyclePacking(index: number): void {
    const packing = this.settings().packing.map((v, i) => (i === index ? (v + 1) % 3 : v));
    this.configure({ packing });
  }
  pull(): void {
    this.selectedProof.set(null);
    this.dispatch({ type: 'proof', settings: this.settings() });
  }
  prepare(part: 'ink' | 'paper'): void {
    this.dispatch({ type: 'prepare', part });
  }
  sample(): void {
    this.dispatch({ type: 'sample', ink: this.settings().ink, surface: this.materialSurface() });
  }
  flow(station: WorkshopStation): void {
    this.dispatch({ type: 'flow', station });
  }
  travel(): void {
    if (this.session().mode !== 'return') return;
    // This workspace is local preview: scenes remain accessible during testing.
    this.scene.update((s) => (s === 'press' ? 'courtyard' : 'press'));
    this.message.set(
      this.scene() === 'courtyard'
        ? this.repaired()
          ? 'Same courtyard. Inspect what your repaired production changes.'
          : 'Same courtyard. The failed setup has supplied no printed sheets.'
        : 'Your workshop and proofs are still here.',
    );
  }
  exportNotebook(): void {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            projectId: this.project.projectId,
            projectVersion: this.project.projectVersion,
            session: this.session().id,
            label: 'Local model evidence, not assessment',
            state: this.state(),
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob),
      link = document.createElement('a');
    link.href = url;
    link.download = `${this.session().id}-notebook.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
