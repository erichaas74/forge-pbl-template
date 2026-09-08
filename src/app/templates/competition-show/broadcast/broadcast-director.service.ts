import { Injectable, OnDestroy, signal } from '@angular/core';
import { BroadcastAudio } from './broadcast-audio';
import type { BroadcastConfig, BroadcastCue, BroadcastShot, CueStep } from './broadcast.models';

@Injectable()
export class BroadcastDirectorService implements OnDestroy {
  readonly shot = signal<BroadcastShot>('wide');
  readonly teamId = signal<string | null>(null);
  readonly cue = signal<BroadcastCue | null>(null);
  readonly step = signal<CueStep>('idle');
  readonly automatic = signal(true);
  readonly reducedMotion = signal(typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  readonly sound = signal(false);
  readonly audioError = signal('');
  private readonly audio = new BroadcastAudio();
  private readonly media = typeof matchMedia !== 'undefined' ? matchMedia('(prefers-reduced-motion: reduce)') : undefined;
  private readonly onMotionChange = (event: MediaQueryListEvent) => { this.reducedMotion.set(event.matches); if (event.matches) this.finish(); };
  private timers: ReturnType<typeof setTimeout>[] = [];
  private complete?: () => void;
  private generation = 0;
  constructor() { this.media?.addEventListener('change', this.onMotionChange); }
  tension(config: BroadcastConfig, active: boolean): void { this.audio.tension(config, active); }

  select(shot: BroadcastShot, teamId: string | null = null): void {
    this.cancel(); this.shot.set(shot); this.teamId.set(teamId);
  }
  autoShot(shot: BroadcastShot, teamId: string | null = null): void {
    if (this.automatic()) { this.shot.set(shot); this.teamId.set(teamId); }
  }
  run(kind: BroadcastCue, config: BroadcastConfig, onComplete: () => void = () => undefined, teamId: string | null = null): void {
    this.cancel(); this.complete = onComplete; this.cue.set(kind); this.step.set('dim');
    this.audio.cue(kind, config);
    if (this.reducedMotion()) {
      this.autoShot(kind === 'question' ? 'question' : kind === 'champion' ? 'winner' : kind === 'entrance' ? 'matchup' : 'wide', teamId);
      this.step.set('reveal'); this.finish(); return;
    }
    const generation = this.generation;
    const schedule = (at: number, action: () => void) => this.timers.push(setTimeout(() => { if (generation === this.generation) action(); }, at));
    schedule(250, () => {
      this.step.set('travel');
      this.autoShot(kind === 'question' ? 'question' : kind === 'champion' ? 'winner' : kind === 'entrance' ? 'matchup' : 'wide', teamId);
    });
    schedule(250 + config.camera.moveMs, () => this.step.set('reveal'));
    schedule(250 + config.camera.moveMs + config.camera.revealMs, () => this.step.set('hold'));
    schedule(400 + config.camera.moveMs + config.camera.revealMs, () => this.finish());
  }
  finish(): void {
    const complete = this.complete; this.complete = undefined; this.clearTimers();
    this.cue.set(null); this.step.set('idle'); complete?.();
  }
  cancel(): void { this.complete = undefined; this.clearTimers(); this.cue.set(null); this.step.set('idle'); this.audio.stop(); }
  private clearTimers(): void { this.generation++; for (const timer of this.timers) clearTimeout(timer); this.timers = []; }
  async toggleSound(): Promise<void> {
    if (this.sound()) { this.audio.mute(); this.sound.set(false); return; }
    try { await this.audio.enable(); this.sound.set(true); this.audioError.set(''); }
    catch { this.audioError.set('Sound could not start. Visual cues remain available.'); }
  }
  ngOnDestroy(): void { this.media?.removeEventListener('change', this.onMotionChange); this.cancel(); this.audio.dispose(); }
}
