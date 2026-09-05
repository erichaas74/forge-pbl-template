import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DeterministicSimulationAdapter } from '../../templates/investigation/simulation/deterministic-simulation.adapter';
import { physicalOutcomeTable, physicalTests } from './mystery-science.config';
import { mysteryVials } from './mystery-substance.package';
import { buildGrainSpecs, defaultGrainProfile, grainProfiles } from './lab-kit/grain-profiles';
import { RenderQualityService } from './lab-kit/render-quality.service';
import { stationArt } from './station-art.config';
import type { StationCapture } from './station-workspaces';

export type PhysicalTestId = (typeof physicalTests)[number]['id'];
export type TrialPhase = 'idle' | 'running' | 'settled';

interface TrialRecord {
  id: number;
  vialCode: string;
  testTitle: string;
  headline: string;
}

const trialDurationMs = 3800;
/** Seconds the water trial reports, compressed into the run window. */
const waterTrialSeconds = 60;

@Component({
  selector: 'app-properties-lab',
  imports: [FormsModule],
  templateUrl: './properties-lab.component.html',
  styleUrl: './properties-lab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesLabComponent {
  readonly captured = output<StationCapture>();

  readonly vials = mysteryVials;
  readonly tests = physicalTests;
  readonly art = stationArt;

  private readonly renderQuality = inject(RenderQualityService);
  readonly filters = computed(() => this.renderQuality.quality() === 'high');

  readonly testId = signal<PhysicalTestId>('appearance');
  readonly vialId = signal('vial-a');
  readonly phase = signal<TrialPhase>('idle');
  readonly progress = signal(0);
  readonly observation = signal('');
  readonly result = signal<Record<string, unknown> | undefined>(undefined);
  readonly trials = signal<readonly TrialRecord[]>([]);
  readonly covered = signal<readonly string[]>([]);

  /** Sweeping the light is what separates sparkling crystals from dull powder. */
  readonly lightAngle = signal(35);
  readonly zoom = signal(6);

  private readonly simulation = new DeterministicSimulationAdapter();
  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    this.simulation.initialize({
      id: 'physical-property-comparison',
      settings: { keyFields: ['specimen', 'test'], outcomeTable: physicalOutcomeTable },
    });
  }

  readonly activeTest = computed(
    () => this.tests.find((test) => test.id === this.testId()) ?? this.tests[0],
  );
  readonly activeVial = computed(
    () => this.vials.find((vial) => vial.vialId === this.vialId()) ?? this.vials[0],
  );
  readonly running = computed(() => this.phase() === 'running');
  readonly grainProfile = computed(() => grainProfiles[this.vialId()] ?? defaultGrainProfile);
  readonly grains = computed(() => buildGrainSpecs(this.grainProfile(), 26));

  /** Specimen field for the magnifier and scan bed, scattered under the lens. */
  readonly field = computed(() => {
    const profile = this.grainProfile();
    return buildGrainSpecs(profile, 100).map((grain, index) => ({
      ...grain,
      top: 12 + ((index * 29) % 74),
      left: 8 + ((index * 47) % 82),
    }));
  });

  readonly elapsedSeconds = computed(() => Math.round(this.progress() * waterTrialSeconds));

  /** How cloudy the water is right now, 0-1, driven by the outcome. */
  readonly cloudiness = computed(() => {
    const output = this.result();
    if (this.testId() !== 'solubility' || this.phase() === 'idle') {
      return 0;
    }
    const settles = String(output?.['settledLayer'] ?? '').includes('thin');
    const reading = String(output?.['reading'] ?? '');
    const peak = reading.includes('Cloudy') ? 0.85 : 0.35;
    const ratio = this.progress();
    // Everything clouds when stirred; only the suspension stays cloudy.
    return settles ? peak : peak * Math.max(0, 1 - ratio * 1.35);
  });

  /** Probe reading as a fraction of the instrument's range. */
  readonly conductanceRatio = computed(() => {
    const ms = Number(this.result()?.['millisiemens'] ?? 0);
    return Math.min((ms / 10) * this.progress(), 1);
  });

  readonly needleAngle = computed(() => -52 + this.conductanceRatio() * 104);
  readonly lampGlow = computed(() => this.conductanceRatio());

  readonly canCapture = computed(
    () => this.phase() === 'settled' && this.observation().trim().length > 0,
  );

  readonly hint = computed(() => {
    if (this.running()) {
      return 'Instrument running under equal conditions. Watch what changes.';
    }
    if (this.phase() === 'settled') {
      return 'Describe what the instrument showed, then file it.';
    }
    switch (this.testId()) {
      case 'appearance':
        return 'Swing the light across the specimen. Crystals flash; powders stay dull.';
      case 'solubility':
        return 'Equal mass into equal water, stirred the same way. Watch for 60 seconds.';
      case 'conductivity':
        return 'Dip the calibrated probe into the solution and read the meter.';
      case 'texture':
        return 'Scan the surface without touching it and compare particle size.';
    }
  });

  vialColor(vialId: string): string {
    return this.vials.find((vial) => vial.vialId === vialId)?.color ?? '#4d7f8c';
  }

  hasRun(vialId: string, testId: PhysicalTestId): boolean {
    return this.covered().includes(`${testId}::${vialId}`);
  }

  coverage(testId: PhysicalTestId): number {
    return this.vials.filter((vial) => this.hasRun(vial.vialId, testId)).length;
  }

  selectTest(id: PhysicalTestId): void {
    if (this.running()) {
      return;
    }
    this.testId.set(id);
    this.resetTrial();
  }

  selectVial(id: string): void {
    if (this.running()) {
      return;
    }
    this.vialId.set(id);
    this.resetTrial();
  }

  setLightAngle(value: number): void {
    this.lightAngle.set(value);
  }

  setZoom(value: number): void {
    this.zoom.set(value);
  }

  numberValue(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }

  async run(): Promise<void> {
    if (this.running()) {
      return;
    }
    this.simulation.setInputs({ specimen: this.vialId(), test: this.testId() });
    this.simulation.beginTrial();
    const outputs = this.simulation.endTrial().outputs;

    this.result.set(outputs);
    this.observation.set('');
    this.phase.set('running');
    this.progress.set(0);
    this.renderQuality.probe();

    await this.sweep();

    this.phase.set('settled');
    this.record(outputs);
  }

  private sweep(): Promise<void> {
    return new Promise((resolve) => {
      const started = Date.now();
      this.stopTimer();
      this.timer = setInterval(() => {
        const ratio = Math.min((Date.now() - started) / trialDurationMs, 1);
        this.progress.set(ratio);
        if (ratio >= 1) {
          this.stopTimer();
          resolve();
        }
      }, 70);
    });
  }

  private stopTimer(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private resetTrial(): void {
    this.stopTimer();
    this.phase.set('idle');
    this.progress.set(0);
    this.result.set(undefined);
    this.observation.set('');
  }

  private record(outputs: Record<string, unknown>): void {
    const key = `${this.testId()}::${this.vialId()}`;
    this.covered.update((current) => [...new Set([...current, key])]);
    this.trials.update((current) => [
      {
        id: current.length + 1,
        vialCode: this.activeVial().code,
        testTitle: this.activeTest().title,
        headline: String(outputs['reading'] ?? 'Recorded'),
      },
      ...current,
    ]);
  }

  capture(): void {
    const outputs = this.result();
    if (!this.canCapture() || outputs === undefined) {
      return;
    }
    this.captured.emit({
      activityId: 'activity-property-comparison',
      evidenceId: 'evidence-property-trials',
      result: {
        inputs: { specimen: this.vialId(), test: this.testId() },
        outputs,
      },
      note: this.observation().trim(),
    });
    this.resetTrial();
  }

  entries(value: Record<string, unknown> | undefined): readonly (readonly [string, string])[] {
    return value === undefined
      ? []
      : Object.entries(value).map(([key, item]) => [readableLabel(key), String(item)] as const);
  }
}

function readableLabel(value: string): string {
  const spaced = value.replace(/([a-z])([A-Z])/g, '$1 $2');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
