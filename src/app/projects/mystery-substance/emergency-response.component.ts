import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  defaultTubIdentity,
  emergencyBriefing,
  emergencyBudgetMinutes,
  emergencyCalls,
  emergencyOutcomes,
  emergencyRetryMinutes,
  emergencyTests,
  judgeCall,
  priorRecords,
  type EmergencyCall,
  type EmergencyTestDefinition,
  type EmergencyTestId,
  type EmergencyVerdict,
  type TubIdentity,
} from './emergency.config';
import { RenderQualityService } from './lab-kit/render-quality.service';
import type { StationCapture } from './station-workspaces';

/** One test the team bought, in the order they bought it. */
interface RanTest {
  id: EmergencyTestId;
  title: string;
  cost: number;
  decisive: boolean;
  reading: string;
  fields: readonly { label: string; value: string }[];
  /** Minutes left when the result came back — the record of what it cost. */
  clockAfter: number;
}

/** A bubble of carbon dioxide leaving the Bay 3 floor. */
interface Fizz {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

const runDurationMs = 1400;
const tickMs = 40;
const neutraliseTargetCount = 24;

@Component({
  selector: 'app-emergency-response',
  imports: [FormsModule],
  templateUrl: './emergency-response.component.html',
  styleUrl: './emergency-response.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmergencyResponseComponent implements OnDestroy {
  readonly captured = output<StationCapture>();

  /** What the teacher loaded into the tub. Never shown until the call is filed. */
  readonly tub = input<TubIdentity>(defaultTubIdentity);

  readonly briefing = emergencyBriefing;
  readonly tests = emergencyTests;
  readonly calls = emergencyCalls;
  readonly priorRecords = priorRecords;
  readonly retryMinutes = emergencyRetryMinutes;

  private readonly renderQuality = inject(RenderQualityService);

  readonly briefingOpen = signal(true);
  readonly minutesLeft = signal(emergencyBudgetMinutes);
  readonly running = signal<EmergencyTestId | undefined>(undefined);
  readonly ran = signal<readonly RanTest[]>([]);
  readonly showPrior = signal(false);

  readonly call = signal<EmergencyCall | undefined>(undefined);
  readonly reasoning = signal('');
  readonly confidence = signal(50);
  readonly citedTestIds = signal<readonly EmergencyTestId[]>([]);
  readonly verdict = signal<EmergencyVerdict | undefined>(undefined);

  /** Second attempt after a rejected call — the crew is still outside. */
  readonly attempt = signal(1);
  readonly fizz = signal<readonly Fizz[]>([]);
  readonly gasCount = signal(0);

  private timer?: ReturnType<typeof setInterval>;

  ngOnDestroy(): void {
    this.stop();
  }

  readonly clockLabel = computed(() => {
    const minutes = Math.max(this.minutesLeft(), 0);
    return `${String(minutes).padStart(2, '0')}:00`;
  });

  readonly clockPercent = computed(() =>
    Math.max((this.minutesLeft() / emergencyBudgetMinutes) * 100, 0),
  );

  readonly outOfTime = computed(() => this.minutesLeft() <= 0);

  readonly decisiveRun = computed(() => this.ran().filter((test) => test.decisive).length);

  readonly spent = computed(() => this.ran().reduce((total, test) => total + test.cost, 0));

  readonly canFile = computed(
    () =>
      this.verdict() === undefined &&
      this.call() !== undefined &&
      this.reasoning().trim().length > 0,
  );

  readonly hint = computed(() => {
    if (this.verdict() !== undefined) {
      return 'File the record so the review board can read what you did.';
    }
    if (this.outOfTime()) {
      return 'The clock is gone. Make the call you can defend with what you already have.';
    }
    if (this.ran().length === 0) {
      return 'Twenty-five minutes buys about three tests. Choose the ones that could tell the two apart.';
    }
    return 'Every test costs the crew time. Before you buy one, say what it could rule out.';
  });

  /** Reasons a test cannot be bought right now, in the order they bite. */
  blockedReason(test: EmergencyTestDefinition): string | undefined {
    if (this.hasRun(test.id)) {
      return 'Already run';
    }
    if (this.verdict() !== undefined) {
      return 'Call filed';
    }
    if (test.cost > this.minutesLeft()) {
      return 'Not enough time left';
    }
    if (test.requires !== undefined && !this.hasRun(test.requires)) {
      const required = this.tests.find((item) => item.id === test.requires);
      return `Needs ${required?.title ?? test.requires} first`;
    }
    return undefined;
  }

  hasRun(id: EmergencyTestId): boolean {
    return this.ran().some((test) => test.id === id);
  }

  cited(id: EmergencyTestId): boolean {
    return this.citedTestIds().includes(id);
  }

  toggleCitation(id: EmergencyTestId): void {
    this.citedTestIds.update((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  chooseCall(id: EmergencyCall): void {
    if (this.verdict() !== undefined) {
      return;
    }
    this.call.set(id);
  }

  setConfidence(event: Event): void {
    this.confidence.set(Number((event.target as HTMLInputElement).value));
  }

  /** Buys one test: the clock runs down for its cost, then the bench reports. */
  async runTest(test: EmergencyTestDefinition): Promise<void> {
    if (this.running() !== undefined || this.blockedReason(test) !== undefined) {
      return;
    }
    this.running.set(test.id);
    this.renderQuality.probe();

    const from = this.minutesLeft();
    const to = Math.max(from - test.cost, 0);
    await this.drainClock(from, to);

    const outcome = emergencyOutcomes[this.tub()][test.id];
    const { reading, ...rest } = outcome;
    this.ran.update((current) => [
      ...current,
      {
        id: test.id,
        title: test.title,
        cost: test.cost,
        decisive: test.decisive,
        reading,
        fields: Object.entries(rest).map(([label, value]) => ({
          label: readableLabel(label),
          value,
        })),
        clockAfter: to,
      },
    ]);
    this.citedTestIds.update((current) => [...current, test.id]);
    this.running.set(undefined);
  }

  /** Files the call with the marshal and plays out what happens in Bay 3. */
  fileCall(): void {
    const call = this.call();
    if (call === undefined || !this.canFile()) {
      return;
    }
    const verdict = judgeCall(call, this.tub(), this.decisiveRun());
    this.verdict.set(verdict);
    if (verdict.neutralises) {
      this.neutralise();
    }
  }

  /**
   * A rejected call does not end the investigation — the crew is still outside
   * and the clock restarts short. The log of what they already ran stays.
   */
  tryAgain(): void {
    this.verdict.set(undefined);
    this.call.set(undefined);
    this.attempt.update((value) => value + 1);
    this.minutesLeft.set(emergencyRetryMinutes);
    this.stop();
    this.fizz.set([]);
    this.gasCount.set(0);
  }

  /** Sends the incident record to the evidence locker. */
  captureRecord(): void {
    const verdict = this.verdict();
    if (verdict === undefined) {
      return;
    }
    this.captured.emit({
      activityId: 'activity-emergency-response',
      evidenceId: 'evidence-emergency-response',
      result: {
        call: this.call(),
        verdict: verdict.id,
        confidence: this.confidence(),
        attempt: this.attempt(),
        minutesSpent: this.spent(),
        minutesLeft: this.minutesLeft(),
        testsRun: this.ran().map((test) => `${test.title}: ${test.reading}`),
        decisiveTestsRun: this.decisiveRun(),
        citedTestIds: [...this.citedTestIds()],
      },
      note: this.reasoning(),
    });
  }

  private drainClock(from: number, to: number): Promise<void> {
    return new Promise((resolve) => {
      const started = Date.now();
      this.stop();
      this.timer = setInterval(() => {
        const ratio = Math.min((Date.now() - started) / runDurationMs, 1);
        this.minutesLeft.set(Math.round(from - (from - to) * ratio));
        if (ratio >= 1) {
          this.minutesLeft.set(to);
          this.stop();
          resolve();
        }
      }, tickMs);
    });
  }

  /**
   * The payoff. Carbon dioxide rises off the Bay 3 floor and the counter climbs
   * — the same particles the sealed chamber held in, now leaving an acid that
   * is being neutralised.
   */
  private neutralise(): void {
    this.stop();
    this.fizz.set([]);
    this.gasCount.set(0);
    let released = 0;
    this.timer = setInterval(() => {
      if (released < neutraliseTargetCount) {
        released += 1;
        this.gasCount.set(released);
        this.fizz.update((current) => [...current, seedFizz(released)]);
      }
      this.fizz.update((current) =>
        current
          .map((bubble) => ({ ...bubble, y: bubble.y - bubble.speed }))
          .filter((bubble) => bubble.y > -6),
      );
      if (released >= neutraliseTargetCount && this.fizz().length === 0) {
        this.stop();
      }
    }, 90);
  }

  private stop(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}

/** Deterministic scatter, so Bay 3 fizzes the same way for every team. */
function seedFizz(index: number): Fizz {
  return {
    id: index,
    x: 8 + ((index * 37) % 144),
    y: 86 + ((index * 13) % 8),
    size: 1.4 + ((index * 7) % 5) * 0.4,
    speed: 1.1 + ((index * 11) % 6) * 0.25,
  };
}

function readableLabel(value: string): string {
  const spaced = value.replace(/([a-z])([A-Z])/g, '$1 $2');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
