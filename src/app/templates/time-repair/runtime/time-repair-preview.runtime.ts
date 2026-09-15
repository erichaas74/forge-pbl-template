import {
  computed,
  inject,
  Injectable,
  InjectionToken,
  signal,
  type OnDestroy,
} from '@angular/core';
import { TIME_REPAIR_CONFIG, TIME_REPAIR_SESSION } from './time-repair.runtime';
import {
  BrowserRepairPreviewPersistence,
  type RepairPreviewPersistence,
} from './time-repair-preview.persistence';
import {
  chronologyConflicts,
  createRepairPreviewDraft,
  moveRepairItem,
  type RepairExhibitPanel,
  type RepairPreviewDraft,
} from '../domain/time-repair-preview.models';
import { repairCapabilities } from '../domain/time-repair.engine';

export const TIME_REPAIR_FINAL_EXAMPLE = new InjectionToken<boolean>('TIME_REPAIR_FINAL_EXAMPLE');
export const REPAIR_PREVIEW_PERSISTENCE = new InjectionToken<RepairPreviewPersistence>(
  'REPAIR_PREVIEW_PERSISTENCE',
  {
    factory: () =>
      new BrowserRepairPreviewPersistence(inject(TIME_REPAIR_CONFIG), inject(TIME_REPAIR_SESSION)),
  },
);
@Injectable()
export class RepairPreviewRuntime implements OnDestroy {
  readonly config = inject(TIME_REPAIR_CONFIG);
  readonly example = inject(TIME_REPAIR_FINAL_EXAMPLE, { optional: true }) ?? false;
  private readonly context = inject(TIME_REPAIR_SESSION);
  private readonly persistence = inject(REPAIR_PREVIEW_PERSISTENCE);
  readonly weeks = this.config.previewWeeks!.weeks;
  readonly lesson = signal(this.example ? 8 : 1);
  readonly week = computed(() => this.weeks[Math.floor((this.lesson() - 1) / 2)]);
  readonly session = computed(() => this.week().sessions[(this.lesson() - 1) % 2]);
  readonly mission = computed(() =>
    this.config.missions.find((m) => m.id === this.session().missionId)!,
  );
  readonly scene = computed(() => this.config.scenes.find((s) => s.id === this.mission().sceneId)!);
  private readonly drafts = signal<Readonly<Record<string, RepairPreviewDraft>>>({});
  readonly draft = computed(() => this.drafts()[this.session().id]);
  readonly message = signal('');
  readonly saveStatus = signal('');
  readonly activeHotspot = signal('');
  readonly sourceId = signal('');
  readonly rippleIndex = signal(0);
  readonly panelIndex = signal(0);
  readonly replayId = signal<number | undefined>(undefined);
  readonly trial = computed(
    () => this.draft()?.trials.find((t) => t.id === this.replayId()) ?? this.draft()?.trials.at(-1),
  );
  readonly selectedSource = computed(() =>
    this.config.evidence.find((e) => e.id === this.sourceId()),
  );
  readonly activePanel = computed(() => this.draft().panels[this.panelIndex()]);
  readonly illustration = computed(
    () =>
      this.config.previewWeeks!.illustrations.find((i) => i.id === this.session().imageId) ??
      this.config.previewWeeks!.illustrations[0],
  );
  constructor() {
    if (
      this.context.mode !== 'preview' ||
      this.context.authorityMode !== 'localDemo' ||
      !this.config.previewWeeks
    )
      throw new Error(
        'CAPABILITY_NOT_INSTALLED: Weekly authoring requires a configured local preview.',
      );
    this.open(this.lesson());
  }
  open(number: number): void {
    if (!Number.isInteger(number) || number < 1 || number > 8 || (this.example && number !== 8))
      return;
    if (this.draft()) this.save();
    this.lesson.set(number);
    const id = this.session().id;
    if (!this.drafts()[id]) {
      let saved: RepairPreviewDraft | undefined;
      try {
        if (!this.example) saved = this.persistence.load(id);
      } catch {
        this.saveStatus.set('Saved draft unavailable; changes stay in this visit.');
      }
      this.drafts.update((d) => ({
        ...d,
        [id]: saved ?? createRepairPreviewDraft(this.config, this.session()),
      }));
    }
    this.activeHotspot.set('');
    this.sourceId.set('');
    this.rippleIndex.set(0);
    this.panelIndex.set(0);
    this.replayId.set(undefined);
    this.message.set('');
  }
  ngOnDestroy(): void {
    this.save();
  }
  patch(patch: Partial<RepairPreviewDraft>, persist = true): void {
    if (this.example) return;
    this.drafts.update((d) => ({ ...d, [this.session().id]: { ...this.draft(), ...patch } }));
    if (persist) this.save();
  }
  save(): void {
    if (this.example || !this.draft()) return;
    try {
      this.persistence.save(this.session().id, this.draft());
      this.saveStatus.set(
        this.persistence.available
          ? 'Draft saved on this device'
          : 'Storage unavailable · draft lasts for this visit',
      );
    } catch {
      this.saveStatus.set('Could not save · keep this page open or download the exhibit');
    }
  }
  inspect(id: string): void {
    if (!this.scene().hotspots.some((h) => h.id === id)) return;
    this.activeHotspot.set(id);
    if (!this.draft().inspectedIds.includes(id))
      this.patch({ inspectedIds: [...this.draft().inspectedIds, id] });
  }
  selectOption(id: string): void {
    if (id !== '' && !this.mission().repair.options.some((o) => o.id === id)) return;
    this.patch({ optionId: id });
    this.replayId.set(undefined);
    this.message.set(
      id
        ? 'Choice ready. Run the repair test to see its effect.'
        : 'Choose an intervention before running the repair test.',
    );
  }
  run(): void {
    const option = this.mission().repair.options.find((o) => o.id === this.draft().optionId);
    if (!option) {
      this.message.set('Choose an intervention before running the repair test.');
      return;
    }
    const supported = repairCapabilities[this.mission().repair.capability](
      this.mission(),
      option.id,
    );
    const id = (this.draft().trials.at(-1)?.id ?? 0) + 1;
    this.patch({
      trials: [...this.draft().trials, { id, optionId: option.id, supported }].slice(-30),
    });
    this.replayId.set(id);
    this.message.set(
      supported
        ? 'Repair applied in this trial. Replay it or choose another intervention to compare.'
        : 'This choice leaves a conflict with the source-based repair. Compare the source evidence, then try another choice.',
    );
  }
  moveNode(index: number, offset: number): void {
    this.patch({ nodeIds: moveRepairItem(this.draft().nodeIds, index, offset) });
    this.message.set('Order changed. Check the sequence again to refresh the date feedback.');
  }
  checkSequence(): void {
    const conflicts = chronologyConflicts(this.config, this.draft().nodeIds);
    this.message.set(
      conflicts.length
        ? conflicts.join(' ')
        : 'The dates run from earlier to later. This checks order only; sources are still needed to support each claim.',
    );
  }
  link(nodeId: string, evidenceId: string): void {
    if (
      !this.session().nodeIds.includes(nodeId) ||
      (evidenceId !== '' && !this.session().evidenceIds.includes(evidenceId))
    )
      return;
    this.patch({ links: { ...this.draft().links, [nodeId]: evidenceId } });
    this.sourceId.set(evidenceId);
    this.message.set(
      evidenceId
        ? 'Source attached. Read its limits beside the timeline; a link does not automatically prove a claim.'
        : 'Source link removed.',
    );
  }
  editPanel(patch: Partial<RepairExhibitPanel>): void {
    this.patch(
      {
        panels: this.draft().panels.map((panel, i) =>
          i === this.panelIndex() ? { ...panel, ...patch } : panel,
        ),
      },
      false,
    );
  }
  movePanel(offset: number): void {
    const index = this.panelIndex();
    const panels = moveRepairItem(this.draft().panels, index, offset);
    if (panels === this.draft().panels) return;
    this.patch({ panels });
    this.panelIndex.set(index + offset);
  }
  download(): void {
    this.save();
    const data = {
      title: this.config.title,
      label: 'Local exhibit draft; no assessment or completion recorded',
      panels: this.draft().panels,
      illustrations: this.config.previewWeeks!.illustrations,
      sources: this.config.evidence,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.config.projectId}-exhibit-draft.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
