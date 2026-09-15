import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  untracked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DeterministicSimulationAdapter } from '../../templates/investigation/simulation/deterministic-simulation.adapter';
import { apparatusArt } from './bench-art.config';
import { buildGrainSpecs, defaultGrainProfile, grainProfiles } from './lab-kit/grain-profiles';
import { RenderQualityService } from './lab-kit/render-quality.service';
import { reactionOutcomeTable } from './mystery-science.config';
import { mysteryVials } from './mystery-substance.package';
import type { StationCapture } from './station-workspaces';
import { persistWorkspaceDraft } from '../../shared/drafts/persist-workspace-draft';

interface BenchDraft {
  vialId: string | undefined;
  step: BenchStep;
  volumeMl: number;
  massG: number;
  drops: number;
  recordedVolumeMl: number;
  recordedMassG: number;
  retries: number;
  liquid: string;
  temperature: number;
  stages: readonly StageResult[];
  observation: string;
}

/**
 * The bench runs one sealed vessel at a time. The student pours solution from
 * the tun, weighs the specimen on the balance, transfers it, then adds the
 * indicator — so "equal conditions" is something they achieve by hand rather
 * than something the prompt claims on their behalf.
 */
export type BenchStep = 'select' | 'fill' | 'weigh' | 'react' | 'indicator' | 'complete';

interface StageResult {
  reagent: 'solution-a' | 'indicator-b';
  output: Record<string, unknown>;
}

interface ProcedureLogEntry {
  id: number;
  vialCode: string;
  volumeMl: number;
  massG: number;
  drops: number;
  retries: number;
  clean: boolean;
  headline: string;
}

// Protocol targets, taken from the reagent cards in mystery-science.config.
export const targetVolumeMl = 5;
export const volumeToleranceMl = 0.25;
export const targetMassG = 2;
export const massToleranceG = 0.05;
export const requiredDrops = 3;

const beakerCapacityMl = 7;
const pourRateMlPerTick = 0.11;
const trickleRateGPerTick = 0.035;
const tickMs = 60;
const ambientTemperature = 22;
const reactionDurationMs = 4200;
const developDurationMs = 2600;
const reactionSeconds = 18;

const liquidColors: Readonly<Record<string, string>> = {
  clear: 'rgba(206, 236, 243, 0.5)',
  cloudy: 'rgba(228, 236, 238, 0.88)',
  amber: '#c8891f',
  'golden tan': '#d9a441',
  'light tan': '#d9c79a',
  'dark blue-black': '#171d3d',
};

const solutionColor = 'rgba(206, 236, 243, 0.5)';

@Component({
  selector: 'app-reaction-bench',
  imports: [FormsModule],
  templateUrl: './reaction-bench.component.html',
  styleUrl: './reaction-bench.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactionBenchComponent implements OnDestroy {
  readonly captured = output<StationCapture>();
  readonly selectedVialId = input<string>();
  readonly active = input(true);
  readonly vialChanged = output<string>();
  private readonly drafts = new Map<string, BenchDraft>();
  private checkpoint?: BenchDraft;
  private flushDraft = () => {};

  readonly vials = mysteryVials;
  readonly targetVolumeMl = targetVolumeMl;
  readonly volumeToleranceMl = volumeToleranceMl;
  readonly targetMassG = targetMassG;
  readonly massToleranceG = massToleranceG;
  readonly requiredDrops = requiredDrops;
  readonly beakerCapacityMl = beakerCapacityMl;

  readonly step = signal<BenchStep>('select');
  readonly vialId = signal<string | undefined>(undefined);

  /** The vial the student has picked up from the tray but not yet docked. */
  readonly heldVialId = signal<string | undefined>(undefined);
  readonly dockHover = signal(false);

  readonly volumeMl = signal(0);
  readonly massG = signal(0);
  readonly drops = signal(0);
  readonly tapOpen = signal(false);
  readonly tipping = signal(false);
  readonly busy = signal(false);

  readonly liquid = signal(solutionColor);
  readonly temperature = signal(ambientTemperature);
  readonly bubbling = signal(false);
  readonly progress = signal(0);
  readonly transferring = signal(false);
  readonly dropFalling = signal(false);
  readonly splashing = signal(false);

  readonly art = apparatusArt;
  private readonly renderQuality = inject(RenderQualityService);

  /** False on hardware that could not hold frame rate, or reduced motion. */
  readonly filters = computed(() => this.renderQuality.quality() === 'high');

  /** What the student actually achieved, latched when each step is locked in. */
  readonly recordedVolumeMl = signal(0);
  readonly recordedMassG = signal(0);
  readonly retries = signal(0);

  readonly stages = signal<readonly StageResult[]>([]);
  readonly observation = signal('');
  readonly procedureLog = signal<readonly ProcedureLogEntry[]>([]);
  readonly screenedVialIds = signal<readonly string[]>([]);

  private readonly simulation = new DeterministicSimulationAdapter();
  private tapTimer?: ReturnType<typeof setInterval>;
  private scaleTimer?: ReturnType<typeof setInterval>;
  private tweenTimer?: ReturnType<typeof setInterval>;

  constructor() {
    this.simulation.initialize({
      id: 'chemical-reaction-comparison',
      settings: { keyFields: ['specimen', 'test'], outcomeTable: reactionOutcomeTable },
    });
    this.flushDraft = persistWorkspaceDraft(
      'reaction-bench',
      () => {
        if (!this.busy()) this.checkpoint = this.readDraft();
        return {
          current: this.checkpoint,
          drafts: [...this.drafts.entries()],
          screened: this.screenedVialIds(),
          log: this.procedureLog(),
        };
      },
      (saved) => {
        if (Array.isArray(saved.drafts))
          for (const [id, draft] of saved.drafts) this.drafts.set(id, draft);
        if (saved.current) this.restoreDraft(saved.current);
        if (Array.isArray(saved.screened)) this.screenedVialIds.set(saved.screened);
        if (Array.isArray(saved.log)) this.procedureLog.set(saved.log);
      },
    );
    effect(() => {
      const id = this.selectedVialId();
      untracked(() => {
        if (id && id !== this.vialId()) this.selectVial(id);
      });
    });
    effect(() => {
      if (!this.active())
        untracked(() => {
          this.stopTap();
          this.stopTip();
        });
    });
  }

  ngOnDestroy(): void {
    this.stopTap();
    this.stopTip();
    this.clearTween();
    this.flushDraft();
  }

  private readDraft(): BenchDraft {
    return {
      vialId: this.vialId(),
      step: this.step(),
      volumeMl: this.volumeMl(),
      massG: this.massG(),
      drops: this.drops(),
      recordedVolumeMl: this.recordedVolumeMl(),
      recordedMassG: this.recordedMassG(),
      retries: this.retries(),
      liquid: this.liquid(),
      temperature: this.temperature(),
      stages: this.stages(),
      observation: this.observation(),
    };
  }

  private restoreDraft(draft: BenchDraft): void {
    if (
      !this.vials.some((v) => v.vialId === draft.vialId) ||
      !['fill', 'weigh', 'indicator', 'complete'].includes(draft.step)
    )
      return;
    this.vialId.set(draft.vialId);
    this.step.set(draft.step);
    this.volumeMl.set(draft.volumeMl);
    this.massG.set(draft.massG);
    this.drops.set(draft.drops);
    this.recordedVolumeMl.set(draft.recordedVolumeMl);
    this.recordedMassG.set(draft.recordedMassG);
    this.retries.set(draft.retries);
    this.liquid.set(draft.liquid);
    this.temperature.set(draft.temperature);
    this.stages.set(draft.stages);
    this.observation.set(draft.observation);
  }

  // ---- derived readouts ---------------------------------------------------

  readonly activeVial = computed(() => this.vials.find((vial) => vial.vialId === this.vialId()));

  readonly volumeOk = computed(
    () => Math.abs(this.volumeMl() - targetVolumeMl) <= volumeToleranceMl,
  );
  readonly volumeOver = computed(() => this.volumeMl() - targetVolumeMl > volumeToleranceMl);
  readonly massOk = computed(() => Math.abs(this.massG() - targetMassG) <= massToleranceG);
  readonly massOver = computed(() => this.massG() - targetMassG > massToleranceG);

  /** The balance only calls a reading stable once the student stops adding. */
  readonly scaleStable = computed(() => !this.tipping());

  readonly canTransfer = computed(
    () => this.step() === 'weigh' && this.massOk() && this.scaleStable() && !this.busy(),
  );

  readonly fillPercent = computed(() => Math.min((this.volumeMl() / beakerCapacityMl) * 100, 100));

  /** Where the target band sits on the beaker wall, as a percentage of capacity. */
  readonly bandBottomPercent = computed(
    () => ((targetVolumeMl - volumeToleranceMl) / beakerCapacityMl) * 100,
  );
  readonly bandHeightPercent = computed(() => ((volumeToleranceMl * 2) / beakerCapacityMl) * 100);

  /** The tun visibly empties as solution is drawn into the beaker. */
  readonly tunLevelPercent = computed(() => 74 - (this.volumeMl() / beakerCapacityMl) * 30);

  /** Grain profile for the loaded specimen — coarse crystals through fine powder. */
  readonly grainProfile = computed(() => grainProfiles[this.vialId() ?? ''] ?? defaultGrainProfile);

  /** Grains leaving the vial mouth, spread wide enough to read as a pour. */
  readonly pourGrains = computed(() => buildGrainSpecs(this.grainProfile(), 22));

  /** Grains dropping from the pan into the vessel, in a tighter column. */
  readonly transferGrains = computed(() => buildGrainSpecs(this.grainProfile(), 14));

  /** Depth-graded fill: liquid reads lighter at the surface than at the base. */
  readonly liquidTop = computed(() => this.liquid());

  // ---- vessel geometry, in the SVG's 128x176 user space -------------------

  // Vessel bore in the SVG's 128x176 space, matched to the beaker plate so the
  // drawn liquid sits inside the photographed glass.
  private static readonly wellTop = 47;
  private static readonly wellBottom = 143;
  readonly wellX = 33;
  readonly wellW = 61;

  private wellSpan(): number {
    return ReactionBenchComponent.wellBottom - ReactionBenchComponent.wellTop;
  }

  /** Y of the liquid surface: full beaker sits at wellTop. */
  liquidY(): number {
    const filled = Math.min(this.volumeMl() / beakerCapacityMl, 1);
    return ReactionBenchComponent.wellBottom - this.wellSpan() * filled;
  }

  liquidH(): number {
    return ReactionBenchComponent.wellBottom - this.liquidY();
  }

  /** Y of a graduation mark, in millilitres. */
  gradY(millilitres: number): number {
    return ReactionBenchComponent.wellBottom - this.wellSpan() * (millilitres / beakerCapacityMl);
  }

  bandY(): number {
    return this.gradY(targetVolumeMl + volumeToleranceMl);
  }

  bandH(): number {
    return this.gradY(targetVolumeMl - volumeToleranceMl) - this.bandY();
  }

  readonly elapsedSeconds = computed(() => Math.round(this.progress() * reactionSeconds));

  readonly solutionStage = computed(() =>
    this.stages().find((stage) => stage.reagent === 'solution-a'),
  );
  readonly indicatorStage = computed(() =>
    this.stages().find((stage) => stage.reagent === 'indicator-b'),
  );

  /**
   * The gates already refuse anything outside tolerance, so this asks the
   * harder question: did they land inside half a tolerance, first time?
   */
  readonly tightRun = computed(
    () =>
      this.retries() === 0 &&
      Math.abs(this.recordedVolumeMl() - targetVolumeMl) <= volumeToleranceMl / 2 &&
      Math.abs(this.recordedMassG() - targetMassG) <= massToleranceG / 2,
  );

  readonly canCapture = computed(
    () => this.step() === 'complete' && this.observation().trim().length > 0,
  );

  readonly stepHint = computed(() => {
    switch (this.step()) {
      case 'select':
        return 'Drag one sealed vial from the tray onto the bench. The rig runs a single vessel at a time.';
      case 'fill':
        return this.volumeOver()
          ? `Over the line at ${this.volumeMl().toFixed(2)} mL. Drain the beaker and pour again.`
          : this.volumeOk()
            ? `${this.volumeMl().toFixed(2)} mL — inside the band. Move to the balance.`
            : `Turn the valve to start the flow and close it at ${targetVolumeMl.toFixed(1)} mL. Nudge in ${volumeToleranceMl.toFixed(2)} mL either way is allowed.`;
      case 'weigh':
        return this.massOver()
          ? `${this.massG().toFixed(2)} g is too much. Take a pinch back off the pan.`
          : this.massOk()
            ? `${this.massG().toFixed(2)} g — on target. Transfer it into the vessel.`
            : `Tip the vial over the pan until the balance reads ${targetMassG.toFixed(2)} g.`;
      case 'react':
        return 'Sealed and reacting. Watch the vessel and the thermometer.';
      case 'indicator':
        return `Add ${requiredDrops} drops of Indicator B — no more, no fewer.`;
      case 'complete':
        return 'Both stages are done. Write down what you saw.';
    }
  });

  isScreened(vialId: string): boolean {
    return this.screenedVialIds().includes(vialId);
  }

  vialCode(vialId: string | undefined): string {
    return this.vials.find((vial) => vial.vialId === vialId)?.code ?? '—';
  }

  vialColor(vialId: string | undefined): string {
    return this.vials.find((vial) => vial.vialId === vialId)?.color ?? '#4d7f8c';
  }

  entries(value: Record<string, unknown> | undefined): readonly (readonly [string, string])[] {
    return value === undefined
      ? []
      : Object.entries(value).map(([key, item]) => [readableLabel(key), String(item)] as const);
  }

  // ---- step 0: choose the specimen ---------------------------------------

  /** Picks a vial up off the tray, ready to be carried to the bench. */
  holdVial(vialId: string): void {
    if (this.busy()) {
      return;
    }
    this.heldVialId.update((current) => (current === vialId ? undefined : vialId));
  }

  startVialDrag(event: DragEvent, vialId: string): void {
    if (this.busy()) {
      event.preventDefault();
      return;
    }
    this.heldVialId.set(vialId);
    event.dataTransfer?.setData('text/plain', vialId);
  }

  allowDock(event: DragEvent): void {
    if (this.busy() || this.heldVialId() === undefined) {
      return;
    }
    event.preventDefault();
    this.dockHover.set(true);
  }

  clearDockHover(): void {
    this.dockHover.set(false);
  }

  /** Drops the carried vial onto the bench, which starts the run. */
  dockVial(): void {
    this.dockHover.set(false);
    const vialId = this.heldVialId();
    if (vialId === undefined || this.busy()) {
      return;
    }
    this.selectVial(vialId);
  }

  selectVial(vialId: string): void {
    if (this.busy() || vialId === this.vialId() || !this.vials.some((v) => v.vialId === vialId)) {
      return;
    }
    const previous = this.vialId();
    if (previous) this.drafts.set(previous, this.readDraft());
    this.resetRun();
    this.vialId.set(vialId);
    this.heldVialId.set(undefined);
    this.step.set('fill');
    const draft = this.drafts.get(vialId);
    if (draft) this.restoreDraft(draft);
    this.vialChanged.emit(vialId);
  }

  // ---- step 1: pour from the tun -----------------------------------------

  toggleTap(): void {
    if (this.step() !== 'fill' || this.busy()) {
      return;
    }
    if (this.tapOpen()) {
      this.stopTap();
      return;
    }
    this.tapOpen.set(true);
    this.renderQuality.probe();
    this.tapTimer = setInterval(() => {
      this.volumeMl.update((current) =>
        round2(Math.min(current + pourRateMlPerTick, beakerCapacityMl)),
      );
      if (this.volumeMl() >= beakerCapacityMl) {
        this.stopTap();
      }
    }, tickMs);
  }

  nudgeVolume(): void {
    if (this.step() !== 'fill' || this.tapOpen() || this.busy()) {
      return;
    }
    this.volumeMl.update((current) => round2(Math.min(current + 0.1, beakerCapacityMl)));
  }

  drainBeaker(): void {
    if (this.busy() || this.volumeMl() === 0) {
      return;
    }
    this.stopTap();
    this.volumeMl.set(0);
    this.retries.update((count) => count + 1);
  }

  confirmVolume(): void {
    if (this.step() === 'fill' && this.volumeOk() && !this.tapOpen()) {
      this.recordedVolumeMl.set(this.volumeMl());
      this.step.set('weigh');
    }
  }

  private stopTap(): void {
    this.tapOpen.set(false);
    if (this.tapTimer !== undefined) {
      clearInterval(this.tapTimer);
      this.tapTimer = undefined;
    }
  }

  // ---- step 2: weigh the specimen ----------------------------------------

  toggleTip(): void {
    if (this.step() !== 'weigh' || this.busy()) {
      return;
    }
    if (this.tipping()) {
      this.stopTip();
      return;
    }
    this.tipping.set(true);
    this.scaleTimer = setInterval(() => {
      this.massG.update((current) => round2(Math.min(current + trickleRateGPerTick, 5)));
      if (this.massG() >= 5) {
        this.stopTip();
      }
    }, tickMs);
  }

  removePinch(): void {
    if (this.step() !== 'weigh' || this.tipping() || this.busy()) {
      return;
    }
    this.massG.update((current) => round2(Math.max(current - 0.1, 0)));
  }

  emptyPan(): void {
    if (this.busy() || this.massG() === 0) {
      return;
    }
    this.stopTip();
    this.massG.set(0);
    this.retries.update((count) => count + 1);
  }

  private stopTip(): void {
    this.tipping.set(false);
    if (this.scaleTimer !== undefined) {
      clearInterval(this.scaleTimer);
      this.scaleTimer = undefined;
    }
  }

  // ---- step 3: transfer and react ----------------------------------------

  async transfer(): Promise<void> {
    const vialId = this.vialId();
    if (!this.canTransfer() || vialId === undefined) {
      return;
    }
    const output = this.outcome(vialId, 'solution-a');

    this.recordedMassG.set(this.massG());
    this.busy.set(true);
    this.transferring.set(true);
    await delay(620);
    this.splashing.set(true);
    await delay(380);
    this.transferring.set(false);
    this.massG.set(0);
    await delay(220);
    this.splashing.set(false);

    this.step.set('react');
    this.liquid.set(colorOf(output, 'before'));
    await delay(180);
    this.liquid.set(colorOf(output, 'after'));
    this.bubbling.set(gasVisible(output));

    await this.tween(output, reactionDurationMs);

    this.bubbling.set(false);
    this.stages.update((current) => [...current, { reagent: 'solution-a', output }]);
    this.step.set('indicator');
    this.busy.set(false);
  }

  // ---- step 4: add the indicator -----------------------------------------

  async addDrop(): Promise<void> {
    const vialId = this.vialId();
    if (this.step() !== 'indicator' || this.busy() || vialId === undefined) {
      return;
    }
    this.busy.set(true);
    this.dropFalling.set(true);
    await delay(400);
    this.dropFalling.set(false);
    this.splashing.set(true);
    this.drops.update((count) => count + 1);
    await delay(320);
    this.splashing.set(false);

    if (this.drops() < requiredDrops) {
      this.busy.set(false);
      return;
    }

    const output = this.outcome(vialId, 'indicator-b');
    this.liquid.set(colorOf(output, 'before'));
    await delay(220);
    this.liquid.set(colorOf(output, 'after'));
    await delay(developDurationMs);

    this.stages.update((current) => [...current, { reagent: 'indicator-b', output }]);
    this.step.set('complete');
    this.busy.set(false);
    this.recordProcedure();
  }

  // ---- filing the record --------------------------------------------------

  capture(): void {
    const vialId = this.vialId();
    const solution = this.solutionStage();
    const indicator = this.indicatorStage();
    if (!this.canCapture() || vialId === undefined || !solution || !indicator) {
      return;
    }
    this.captured.emit({
      activityId: 'activity-reaction-comparison',
      evidenceId: 'evidence-reaction-trials',
      result: {
        vialId,
        procedure: {
          volumeMl: this.recordedVolumeMl(),
          massG: this.recordedMassG(),
          drops: this.drops(),
          retries: this.retries(),
          heldTightly: this.tightRun(),
        },
        stages: [
          { reagent: solution.reagent, vialId, output: solution.output },
          { reagent: indicator.reagent, vialId, output: indicator.output },
        ],
      },
      note: this.observation().trim(),
    });
    this.screenedVialIds.update((current) => [...new Set([...current, vialId])]);
    this.drafts.delete(vialId);
    this.resetRun();
    if (this.selectedVialId()) this.selectVial(vialId);
  }

  abandonRun(): void {
    if (this.busy()) return;
    const id = this.selectedVialId();
    if (id) this.drafts.delete(id);
    this.resetRun();
    if (id) this.selectVial(id);
  }

  resetRun(): void {
    this.stopTap();
    this.stopTip();
    this.clearTween();
    this.step.set('select');
    this.vialId.set(undefined);
    this.heldVialId.set(undefined);
    this.dockHover.set(false);
    this.volumeMl.set(0);
    this.massG.set(0);
    this.drops.set(0);
    this.recordedVolumeMl.set(0);
    this.recordedMassG.set(0);
    this.retries.set(0);
    this.busy.set(false);
    this.transferring.set(false);
    this.dropFalling.set(false);
    this.splashing.set(false);
    this.bubbling.set(false);
    this.progress.set(0);
    this.temperature.set(ambientTemperature);
    this.liquid.set(solutionColor);
    this.stages.set([]);
    this.observation.set('');
  }

  // ---- internals ----------------------------------------------------------

  private outcome(vialId: string, test: 'solution-a' | 'indicator-b'): Record<string, unknown> {
    this.simulation.setInputs({ specimen: vialId, test });
    this.simulation.beginTrial();
    return this.simulation.endTrial().outputs;
  }

  /** Walks the thermometer from the before reading to the after reading. */
  private tween(output: Record<string, unknown>, durationMs: number): Promise<void> {
    return new Promise((resolve) => {
      const started = Date.now();
      this.clearTween();
      this.tweenTimer = setInterval(() => {
        const ratio = Math.min((Date.now() - started) / durationMs, 1);
        this.progress.set(ratio);
        const eased = 1 - Math.pow(1 - ratio, 3);
        this.temperature.set(temperatureAt(output, eased));
        if (ratio >= 1) {
          this.clearTween();
          resolve();
        }
      }, 70);
    });
  }

  private clearTween(): void {
    if (this.tweenTimer !== undefined) {
      clearInterval(this.tweenTimer);
      this.tweenTimer = undefined;
    }
  }

  private recordProcedure(): void {
    const vialCode = this.vialCode(this.vialId());
    const solution = this.solutionStage()?.output ?? {};
    const indicator = this.indicatorStage()?.output ?? {};
    this.procedureLog.update((current) => [
      {
        id: current.length + 1,
        vialCode,
        volumeMl: this.recordedVolumeMl(),
        massG: this.recordedMassG(),
        drops: this.drops(),
        retries: this.retries(),
        clean: this.tightRun(),
        headline: headlineFor(solution, indicator),
      },
      ...current,
    ]);
  }
}

function gasVisible(output: Record<string, unknown>): boolean {
  return typeof output['gas'] === 'string' && output['gas'] !== 'none visible';
}

function colorOf(output: Record<string, unknown>, stage: 'before' | 'after'): string {
  const key = stage === 'before' ? 'colorBefore' : 'colorAfter';
  const value = typeof output[key] === 'string' ? output[key] : 'clear';
  return liquidColors[value] ?? liquidColors['clear'];
}

function temperatureAt(output: Record<string, unknown>, eased: number): number {
  const before = numberOr(output['temperatureBefore'], ambientTemperature);
  const after = numberOr(output['temperatureAfter'], before);
  return Math.round((before + (after - before) * eased) * 10) / 10;
}

function numberOr(value: unknown, fallback: number): number {
  return typeof value === 'number' ? value : fallback;
}

function headlineFor(
  solution: Record<string, unknown>,
  indicator: Record<string, unknown>,
): string {
  const notes: string[] = [];
  if (gasVisible(solution)) {
    notes.push(String(solution['gas']));
  }
  const before = numberOr(solution['temperatureBefore'], ambientTemperature);
  const after = numberOr(solution['temperatureAfter'], before);
  if (after !== before) {
    notes.push(`${(after - before).toFixed(0)} °C change`);
  }
  if (solution['colorBefore'] !== solution['colorAfter']) {
    notes.push(`solution turned ${String(solution['colorAfter'])}`);
  }
  if (indicator['colorBefore'] !== indicator['colorAfter']) {
    notes.push(`indicator turned ${String(indicator['colorAfter'])}`);
  }
  return notes.length > 0 ? notes.join(' · ') : 'No visible change at either stage';
}

function readableLabel(value: string): string {
  const spaced = value.replace(/([a-z])([A-Z])/g, '$1 $2');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
