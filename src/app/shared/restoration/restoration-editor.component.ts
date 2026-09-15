import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
  afterNextRender,
  inject,
  Injector,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { EncounterSource, EvidenceRelationship } from '../encounters/encounter.models';
import { PaintingCanvasComponent } from './painting-canvas.component';
import { selectedRepair } from './restoration.engine';
import type {
  RestorationAction,
  RestorationDefinition,
  RestorationState,
} from './restoration.models';

@Component({
  selector: 'app-restoration-editor',
  imports: [FormsModule, PaintingCanvasComponent],
  templateUrl: './restoration-editor.component.html',
  styleUrl: './restoration-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestorationEditorComponent {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  readonly definition = input.required<RestorationDefinition>();
  readonly state = input.required<RestorationState>();
  readonly sources = input.required<readonly EncounterSource[]>();
  readonly readOnly = input(false);
  readonly action = output<RestorationAction>();
  readonly research = output<void>();
  readonly region = computed(() =>
    this.definition().regions.find((r) => r.id === this.state().selectedRegionId),
  );
  readonly references = computed(() =>
    this.sources().filter((s) => this.region()?.evidenceIds.includes(s.id)),
  );
  readonly choice = computed(() =>
    this.region() ? selectedRepair(this.region()!, this.state()).id : '',
  );
  readonly evidenceId = signal('');
  readonly relationship = signal<EvidenceRelationship | ''>('');
  readonly explanation = signal('');
  readonly step = signal<'repair' | 'source' | 'relationship' | 'explanation'>('repair');
  readonly steps = ['repair', 'source', 'relationship', 'explanation'] as const;
  readonly readyForCheck = computed(() =>
    this.definition().regions.every(
      (region) => (this.state().notes[region.id]?.explanation?.trim().length ?? 0) >= 20,
    ),
  );
  canContinue(): boolean {
    return (
      this.step() === 'repair' ||
      (this.step() === 'source' ? !!this.evidenceId() : !!this.relationship())
    );
  }
  nextStep(): void {
    if (!this.canContinue()) return;
    this.save();
    this.step.set(this.steps[Math.min(3, this.steps.indexOf(this.step()) + 1)]);
    this.focusStep();
  }
  previousStep(): void {
    this.save();
    this.step.set(this.steps[Math.max(0, this.steps.indexOf(this.step()) - 1)]);
    this.focusStep();
  }
  private focusStep(): void {
    afterNextRender(
      () =>
        this.element.nativeElement
          .querySelector<HTMLElement>(
            '.repair-desk fieldset select, .repair-desk fieldset textarea, .repair-desk fieldset button',
          )
          ?.focus(),
      { injector: this.injector },
    );
  }
  readonly compare = signal(false);
  readonly guides = signal(true);
  readonly failedMedia = signal(false);
  readonly chosenSource = computed(() => this.sources().find((s) => s.id === this.evidenceId()));
  readonly detailHeading = viewChild<ElementRef<HTMLElement>>('detailHeading');
  private noteKey = '';
  constructor() {
    effect(() => {
      const r = this.region(),
        note = r && this.state().notes[r.id];
      const key = this.definition().id + ':' + r?.id + ':' + JSON.stringify(note);
      if (key === this.noteKey) return;
      this.noteKey = key;
      this.evidenceId.set(note?.evidenceId ?? '');
      this.relationship.set(note?.relationship ?? '');
      this.explanation.set(note?.explanation ?? '');
    });
  }
  save(): void {
    const r = this.region();
    if (!r || this.readOnly()) return;
    this.action.emit({
      type: 'justify',
      regionId: r.id,
      note: {
        evidenceId: this.evidenceId(),
        relationship: this.relationship(),
        explanation: this.explanation(),
      },
    });
  }
  inspect(id: string): void {
    this.save();
    this.step.set('repair');
    this.action.emit({ type: 'inspect', regionId: id });
    setTimeout(() => {
      this.detailHeading()?.nativeElement.scrollIntoView?.({
        block: 'nearest',
        behavior: 'instant',
      });
      this.detailHeading()?.nativeElement.focus({ preventScroll: true });
    });
  }
  edit(optionId: string): void {
    this.save();
    if (this.region()) this.action.emit({ type: 'edit', regionId: this.region()!.id, optionId });
  }
  undo(): void {
    this.save();
    this.action.emit({ type: 'undo' });
  }
  consult(): void {
    this.save();
    this.research.emit();
  }
  check(): void {
    this.save();
    if (!this.failedMedia()) this.action.emit({ type: 'submit' });
  }
}
