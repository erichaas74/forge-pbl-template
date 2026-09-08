import { afterNextRender, Component, computed, ElementRef, inject, Injector, OnDestroy, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPETITION_CONFIG } from '../runtime/competition-runtime.service';
import { BroadcastDirectorService } from '../broadcast/broadcast-director.service';
import { midnightBroadcast } from '../broadcast/broadcast.models';
import { TelevisionStageComponent } from '../broadcast/television-stage.component';
import { studioProjection } from '../broadcast/studio-projection';
import { CompetitionBracketComponent } from '../ui/competition-bracket.component';
import { FINAL_SHOWCASE } from './final-showcase.models';
import { buildFinalShowcase } from './final-showcase.engine';
import { QuizBreakComponent } from './quiz-break.component';

@Component({
  selector: 'app-final-showcase', standalone: true,
  imports: [RouterLink, TelevisionStageComponent, CompetitionBracketComponent, QuizBreakComponent],
  providers: [BroadcastDirectorService],
  templateUrl: './final-showcase.component.html', styleUrl: './final-showcase.component.scss',
})
export class FinalShowcaseComponent implements OnDestroy {
  readonly project = inject(COMPETITION_CONFIG); readonly demo = inject(FINAL_SHOWCASE); readonly director = inject(BroadcastDirectorService);
  readonly model = buildFinalShowcase(this.project, this.demo); readonly theme = this.project.broadcast ?? midnightBroadcast;
  readonly chapter = signal(0); readonly highlight = signal(0); readonly playing = signal(false); readonly questionOpen = signal(false); readonly resultShown = signal(false);
  readonly bracketRevealed = signal(false); readonly seconds = signal(90); readonly videoFailed = signal(false);
  readonly video = viewChild<ElementRef<HTMLVideoElement>>('video'); readonly area = viewChild<ElementRef<HTMLElement>>('area');
  readonly stage = viewChild(TelevisionStageComponent);
  readonly chapters = ['Opening', 'Season rewind', 'The bracket', 'Opening Move', 'Quiz break', 'The buzzer', 'One more laugh', 'Final wager', 'The champions'];
  readonly roundIndex = computed(() => this.chapter() === 5 ? 1 : this.chapter() === 7 ? 2 : 0);
  readonly isStudio = computed(() => [3, 5, 7, 8].includes(this.chapter()));
  readonly round = computed(() => this.model.config.rounds[this.roundIndex()]);
  readonly currentState = computed(() => {
    if (this.chapter() === 8) return this.model.champion;
    const pair = this.model.rounds[this.roundIndex()];
    if (this.resultShown()) return pair.after;
    return this.questionOpen() ? { ...pair.before, phase: 'open' as const, buzzes: this.round().kind === 'buzzer' ? [this.demo.buzzerTeamId] : [] } : pair.before;
  });
  readonly view = computed(() => studioProjection(this.model.config, this.currentState(), this.theme,
    this.director.shot(), this.director.teamId(), this.director.cue(), this.director.step(), this.seconds()));
  readonly finalRanking = [...this.model.champion.participants].sort((a, b) => this.model.champion.scores[b] - this.model.champion.scores[a]);
  private scheduled: ReturnType<typeof setTimeout>[] = []; private readonly clock: ReturnType<typeof setInterval>;
  private readonly injector = inject(Injector);
  constructor() {
    this.clock = setInterval(() => { if (this.playing() && this.questionOpen() && !this.resultShown()) this.seconds.update(v => Math.max(0, v - 1)); }, 1000);
  }
  name(id: string): string { return this.model.config.teams.find(t => t.id === id)?.name ?? id; }
  play(): void { this.playing.set(true); this.go(this.chapter() === 0 || this.chapter() === 8 ? 1 : this.chapter()); }
  pause(): void { this.playing.set(false); this.clear(); this.director.cancel(); this.video()?.nativeElement.pause(); }
  go(index: number): void {
    this.clear(); this.director.cancel(); this.chapter.set(Math.max(0, Math.min(this.chapters.length - 1, index)));
    this.questionOpen.set(false); this.resultShown.set(false); this.seconds.set(this.round().seconds);
    afterNextRender(() => {
      const area = this.area()?.nativeElement;
      area?.focus({ preventScroll: true });
      area?.scrollIntoView?.({ block: 'start', behavior: this.director.reducedMotion() ? 'instant' : 'smooth' });
    }, { injector: this.injector });
    if (this.chapter() === 1) {
      this.highlight.set(0);
      if (this.playing() && (!this.demo.recapVideo || this.videoFailed())) this.playStoryboard();
    } else if (this.chapter() === 2) {
      this.bracketRevealed.set(false);
      if (this.playing()) { this.later(4000, () => this.bracketRevealed.set(true)); this.later(10000, () => this.next()); }
    } else if (this.chapter() === 8) {
      this.director.run('champion', this.theme, undefined, this.model.champion.championId); this.playing.set(false);
    } else if (this.isStudio()) {
      this.director.autoShot('wide');
      if (this.playing()) this.openQuestion();
    } else if (this.playing()) this.later(16000, () => this.next());
  }
  next(): void { this.go(this.chapter() + 1); }
  openQuestion(): void {
    if (this.questionOpen() || this.director.cue()) return;
    this.stage()?.focusStage();
    this.director.run('question', this.theme, () => {
      this.questionOpen.set(true);
      if (this.round().kind === 'buzzer') this.later(1000, () => this.director.autoShot('team', this.demo.buzzerTeamId));
      if (this.playing()) this.later(4500, () => this.showResult());
    });
  }
  showResult(): void {
    if (!this.questionOpen() || this.director.cue() || this.resultShown()) return;
    this.stage()?.focusStage();
    this.director.run('score', this.theme, () => {
      this.resultShown.set(true);
      if (this.playing()) this.later(3500, () => this.next());
    });
  }
  selectChapter(index: number): void { this.pause(); this.go(index); }
  showHighlight(index: number): void { this.pause(); this.highlight.set(index); }
  videoEnded(): void { if (this.playing()) this.next(); }
  videoError(): void { this.videoFailed.set(true); if (this.playing()) this.playStoryboard(); }
  private playStoryboard(): void {
    this.clear(); this.highlight.set(0);
    this.demo.highlights.forEach((_, index) => { if (index) this.later(index * 11000, () => this.highlight.set(index)); });
    this.later(this.demo.highlights.length * 11000, () => this.next());
  }
  private later(ms: number, action: () => void): void { this.scheduled.push(setTimeout(action, ms)); }
  private clear(): void { this.scheduled.forEach(clearTimeout); this.scheduled = []; }
  ngOnDestroy(): void { this.clear(); clearInterval(this.clock); this.director.cancel(); }
}
