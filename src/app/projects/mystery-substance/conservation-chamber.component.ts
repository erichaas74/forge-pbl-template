import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { conservationTrials } from './mystery-science.config';
import { RenderQualityService } from './lab-kit/render-quality.service';
import { stationArt } from './station-art.config';
import type { StationCapture } from './station-workspaces';

export type ChamberId = (typeof conservationTrials)[number]['id'];
export type ChamberPhase = 'idle' | 'running' | 'settled';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Escaped particles keep travelling once past the boundary. */
  gone: boolean;
}

const runDurationMs = 6200;
const tickMs = 40;
/** The drawn chamber, in the SVG's own user space. */
const box = { left: 14, right: 146, top: 16, bottom: 116 };
/** Where the lid gapes on the open chamber. */
const vent = { left: 62, right: 98 };

@Component({
  selector: 'app-conservation-chamber',
  imports: [FormsModule],
  templateUrl: './conservation-chamber.component.html',
  styleUrl: './conservation-chamber.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConservationChamberComponent implements OnDestroy {
  readonly captured = output<StationCapture>();

  readonly trials = conservationTrials;
  readonly art = stationArt;
  readonly box = box;

  private readonly renderQuality = inject(RenderQualityService);

  readonly trialId = signal<ChamberId>('closed');
  readonly phase = signal<ChamberPhase>('idle');
  readonly progress = signal(0);
  readonly particles = signal<readonly Particle[]>([]);
  readonly observation = signal('');
  readonly showBoundary = signal(true);
  readonly log = signal<readonly { id: number; title: string; headline: string }[]>([]);

  private timer?: ReturnType<typeof setInterval>;

  ngOnDestroy(): void {
    this.stop();
  }

  readonly trial = computed(
    () => this.trials.find((item) => item.id === this.trialId()) ?? this.trials[0],
  );
  readonly running = computed(() => this.phase() === 'running');
  readonly sealed = computed(() => this.trial().system === 'sealed');

  /** Particles still inside the measured boundary — the number that matters. */
  readonly insideCount = computed(
    () => this.particles().filter((particle) => !particle.gone).length,
  );

  /** Mass falls in step with the particles that have left. */
  readonly mass = computed(() => {
    const trial = this.trial();
    if (this.phase() === 'idle') {
      return trial.beforeMass;
    }
    const lost = trial.beforeParticles - this.insideCount();
    const perParticle =
      trial.beforeParticles === trial.afterParticles
        ? 0
        : (trial.beforeMass - trial.afterMass) / (trial.beforeParticles - trial.afterParticles);
    return Math.round((trial.beforeMass - lost * perParticle) * 10) / 10;
  });

  readonly massDelta = computed(
    () => Math.round((this.mass() - this.trial().beforeMass) * 10) / 10,
  );

  readonly canCapture = computed(
    () => this.phase() === 'settled' && this.observation().trim().length > 0,
  );

  readonly hint = computed(() => {
    if (this.running()) {
      return this.sealed()
        ? 'Sealed. Watch the particle count and the balance together.'
        : 'Open. Watch what crosses the boundary — and what the balance does.';
    }
    if (this.phase() === 'settled') {
      return 'Describe what happened to the particles and to the mass.';
    }
    return 'Choose a chamber and run the reaction. The boundary is what you are measuring.';
  });

  selectTrial(id: ChamberId): void {
    if (this.running()) {
      return;
    }
    this.trialId.set(id);
    this.reset();
  }

  toggleBoundary(): void {
    this.showBoundary.update((shown) => !shown);
  }

  async run(): Promise<void> {
    if (this.running()) {
      return;
    }
    const trial = this.trial();
    this.seed(trial.beforeParticles);
    this.phase.set('running');
    this.progress.set(0);
    this.renderQuality.probe();

    const escapees = trial.beforeParticles - trial.afterParticles;
    await this.simulate(escapees);
    this.reconcile(trial.afterParticles);

    this.phase.set('settled');
    this.log.update((current) => [
      {
        id: current.length + 1,
        title: trial.title,
        headline: `${trial.beforeParticles} → ${this.insideCount()} particles · ${trial.beforeMass.toFixed(1)} → ${this.mass().toFixed(1)} g`,
      },
      ...current,
    ]);
  }

  private seed(count: number): void {
    this.particles.set(
      Array.from({ length: count }, (_, index) => ({
        id: index,
        // Deterministic scatter so a chamber behaves the same every run.
        x: box.left + 8 + ((index * 37) % (box.right - box.left - 16)),
        y: box.top + 8 + ((index * 53) % (box.bottom - box.top - 16)),
        vx: ((index % 5) - 2) * 0.5 || 0.6,
        vy: ((index % 7) - 3) * 0.4 || -0.5,
        gone: false,
      })),
    );
  }

  private simulate(escapees: number): Promise<void> {
    return new Promise((resolve) => {
      const started = Date.now();
      this.stop();
      this.timer = setInterval(() => {
        const ratio = Math.min((Date.now() - started) / runDurationMs, 1);
        this.progress.set(ratio);
        this.step(escapees, ratio);
        if (ratio >= 1) {
          this.stop();
          resolve();
        }
      }, tickMs);
    });
  }

  /** One frame of motion: bounce inside the box, leak through the vent. */
  private step(escapees: number, ratio: number): void {
    // Escapes are released gradually across the run rather than all at once.
    const allowed = Math.floor(escapees * Math.min(ratio * 1.25, 1));

    this.particles.update((current) => {
      let escapedSoFar = current.filter((particle) => particle.gone).length;

      return current.map((particle) => {
        let { x, y, vx, vy, gone } = particle;
        x += vx;
        y += vy;

        if (gone) {
          return { ...particle, x, y, vy: vy - 0.04 };
        }

        if (x <= box.left + 3 || x >= box.right - 3) {
          vx = -vx;
          x = Math.min(Math.max(x, box.left + 3), box.right - 3);
        }
        if (y >= box.bottom - 3) {
          vy = -Math.abs(vy);
          y = box.bottom - 3;
        }
        if (y <= box.top + 3) {
          const underVent = !this.sealed() && x > vent.left && x < vent.right;
          if (underVent && escapedSoFar < allowed) {
            escapedSoFar += 1;
            return { ...particle, x, y, vx, vy, gone: true };
          }
          vy = Math.abs(vy);
          y = box.top + 3;
        }
        return { ...particle, x, y, vx, vy, gone };
      });
    });
  }

  /**
   * Whether a particle happens to reach the vent is down to its path, so a run
   * can end a particle or two short. The recorded data is the authority: any
   * shortfall leaves as the reaction finishes, picking those closest to the gap.
   */
  private reconcile(target: number): void {
    const shortfall = this.insideCount() - target;
    if (shortfall <= 0) {
      return;
    }
    const ventCentre = (vent.left + vent.right) / 2;
    const nearest = this.particles()
      .filter((particle) => !particle.gone)
      .sort((a, b) => Math.abs(a.x - ventCentre) + a.y - (Math.abs(b.x - ventCentre) + b.y))
      .slice(0, shortfall)
      .map((particle) => particle.id);

    this.particles.update((current) =>
      current.map((particle) =>
        nearest.includes(particle.id)
          ? { ...particle, x: ventCentre, y: box.top - 4, gone: true }
          : particle,
      ),
    );
  }

  private stop(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  reset(): void {
    this.stop();
    this.phase.set('idle');
    this.progress.set(0);
    this.particles.set([]);
    this.observation.set('');
  }

  capture(): void {
    const trial = this.trial();
    if (!this.canCapture()) {
      return;
    }
    this.captured.emit({
      activityId: 'activity-conservation-model',
      evidenceId: 'evidence-conservation-trials',
      result: {
        ...trial,
        observedParticles: this.insideCount(),
        observedMass: this.mass(),
      },
      note: this.observation().trim(),
    });
    this.reset();
  }
}
