import { afterNextRender, Component, computed, effect, ElementRef, inject, input, OnDestroy, signal, viewChild } from '@angular/core';
import { BroadcastDirectorService } from './broadcast-director.service';
import type { BroadcastConfig, StudioView } from './broadcast.models';
import type { StudioScene } from './studio-scene';

@Component({
  selector: 'app-television-stage', standalone: true,
  template: `
    <section #frame class="tv-frame" [style.--broadcast-accent]="theme().palette.accent"
      [class.cue-active]="director.cue() !== null" [class.question-cue]="director.cue() === 'question'"
      [class.reduced]="director.reducedMotion()" [attr.data-shot]="view().shot" [attr.data-cue]="director.cue()" tabindex="-1" aria-label="Championship television stage">
      <div #viewport class="viewport" aria-hidden="true"></div>
      @if (!ready() || unavailable()) {
        <div class="stage-fallback" [style.background-image]="theme().assets.backdrop ? 'url(' + theme().assets.backdrop + ')' : null">
          <p>{{ unavailable() ? '3D stage unavailable on this device' : 'Preparing the studio…' }}</p>
          <h2>{{ view().title }}</h2><p>{{ unavailable() ? 'The bracket, readable prompts, scores, and host controls below still work.' : 'Lighting the set. Taking our positions.' }}</p>
        </div>
      }
      <div class="broadcast-bug"><span class="live-dot"></span> REHEARSAL <span class="hd">HD</span></div>
      <div class="show-brand">@if (theme().assets.showLogo) { <img [src]="theme().assets.showLogo" alt="" /> } {{ view().title }}</div>
      @if (director.cue()) {
        <div class="cue-caption" role="status">{{ cueLabel() }}</div>
      }
      @if (view().shot === 'team' || view().shot === 'winner') {
        @if (selectedTeam(); as team) {
          <div class="lower-third" [class.winner]="view().shot === 'winner'"><span>{{ view().shot === 'winner' ? 'YOUR CHAMPIONS' : view().firstBuzzId === team.id ? 'FIRST TO THE BUZZER' : 'IN THE SPOTLIGHT' }}</span>
            <strong>{{ team.name }}</strong><small>SEED {{ team.seed }} <b>{{ team.score }} PTS</b></small></div>
        }
      } @else if (!view().prompt && !director.cue()) {
        <div class="lower-third intro"><span>{{ view().phase === 'setup' ? 'WELCOME TO THE FINAL' : 'THE STAKES ARE SET' }}</span><strong>{{ view().roundTitle || 'Every team has a story.' }}</strong></div>
      }
      @if (view().prompt && !director.cue()) {
        <div class="round-strip"><span>{{ view().roundTitle }}</span><strong>{{ view().phase === 'paused' ? 'PAUSED' : view().phase === 'open' ? view().seconds + ' SEC' : 'ANSWERS LOCKED' }}</strong></div>
      }
      <div class="safe-frame" aria-hidden="true"></div>
      <button class="fullscreen" (click)="fullscreen()">Full screen</button>
      <div class="sr-only" aria-live="polite">{{ view().prompt || view().title }} @if (view().winnerId) { Champion: {{ selectedTeam()?.name }} }</div>
    </section>
    @if (warning()) { <p class="asset-warning" role="status">{{ warning() }}</p> }
    @if (!presentation()) {
      <div class="director" aria-label="Camera and show direction">
        <span class="director-label">DIRECTOR</span>
        <button [attr.aria-pressed]="director.shot() === 'wide'" (click)="director.select('wide')">Studio wide</button>
        <button [attr.aria-pressed]="director.shot() === 'matchup'" (click)="director.select('matchup')">Matchup</button>
        <button [attr.aria-pressed]="director.shot() === 'question'" (click)="director.select('question')">Question screen</button>
        <label>Team camera <select aria-label="Team close-up" [value]="director.teamId() ?? ''" (change)="teamShot($event)">
          <option value="">Choose team</option>@for (team of view().teams; track team.id) { <option [value]="team.id">{{ team.name }}</option> }
        </select></label>
        <button [attr.aria-pressed]="director.automatic()" (click)="director.automatic.update(toggle)">{{ director.automatic() ? 'Auto direction on' : 'Manual direction' }}</button>
        <button [attr.aria-pressed]="director.sound()" (click)="director.toggleSound()">{{ director.sound() ? 'Sound on' : 'Sound off' }}</button>
        <button [attr.aria-pressed]="director.reducedMotion()" (click)="reduceMotion()">{{ director.reducedMotion() ? 'Camera cuts' : 'Camera moves' }}</button>
        @if (director.cue()) { <button class="skip" (click)="director.finish()">Skip cue & continue</button><button (click)="director.cancel()">Cancel cue</button> }
      </div>
    }
    @if (director.audioError()) { <p class="asset-warning">{{ director.audioError() }}</p> }
  `,
  styleUrl: './television-stage.component.scss',
})
export class TelevisionStageComponent implements OnDestroy {
  readonly view = input.required<StudioView>();
  readonly theme = input.required<BroadcastConfig>();
  readonly presentation = input(false);
  readonly director = inject(BroadcastDirectorService);
  readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  readonly frame = viewChild<ElementRef<HTMLElement>>('frame');
  readonly ready = signal(false); readonly unavailable = signal(false); readonly warning = signal('');
  readonly selectedTeam = computed(() => this.view().teams.find(t => t.id === (this.view().teamId ?? this.view().winnerId)));
  readonly cueLabel = computed(() => ({ entrance: 'TEAMS, TAKE YOUR PLACES', question: 'YOUR NEXT QUESTION', score: 'THE SCORES ARE IN', champion: 'A CHAMPIONSHIP PERFORMANCE' }[this.director.cue() ?? 'question']));
  readonly toggle = (value: boolean) => !value;
  private scene?: StudioScene; private dead = false; private generation = 0; private mounted = signal(false);
  constructor() {
    afterNextRender(() => this.mounted.set(true));
    effect(() => { const theme = this.theme(); if (this.mounted()) void this.mount(theme); });
    effect(() => { const view = this.view(); const reduced = this.director.reducedMotion(); if (this.ready()) this.scene?.update(view, reduced); });
  }
  private async mount(theme: BroadcastConfig): Promise<void> {
    const generation = ++this.generation; this.scene?.dispose(); this.scene = undefined; this.ready.set(false); this.warning.set(''); this.unavailable.set(false);
    // A readable HTML stage remains available when WebGL is unsupported (including test DOMs).
    if (typeof WebGL2RenderingContext === 'undefined') { this.unavailable.set(true); return; }
    try {
      const { StudioScene } = await import('./studio-scene');
      if (this.dead || generation !== this.generation) return;
      this.scene = new StudioScene(this.viewport()!.nativeElement, theme, message => this.warning.set(message));
      this.scene.update(this.view(), this.director.reducedMotion()); this.ready.set(true);
    } catch { if (!this.dead && generation === this.generation) { this.unavailable.set(true); this.warning.set('The 3D studio could not start. Host controls and readable game content remain available.'); } }
  }
  teamShot(event: Event): void { const id = (event.target as HTMLSelectElement).value; if (id) this.director.select('team', id); }
  focusStage(): void {
    this.frame()?.nativeElement.scrollIntoView?.({ block: 'nearest', behavior: this.director.reducedMotion() ? 'instant' : 'smooth' });
    this.frame()?.nativeElement.focus({ preventScroll: true });
  }
  reduceMotion(): void { this.director.reducedMotion.update(this.toggle); if (this.director.reducedMotion()) this.director.finish(); }
  async fullscreen(): Promise<void> {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await this.frame()?.nativeElement.requestFullscreen(); }
    catch { this.warning.set('Full screen is unavailable in this browser. Presentation view still works.'); }
  }
  ngOnDestroy(): void { this.dead = true; this.generation++; this.scene?.dispose(); }
}
