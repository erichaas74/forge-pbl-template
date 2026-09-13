import { afterNextRender, Component, computed, ElementRef, inject, Injector, OnDestroy, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPETITION_CONFIG } from '../runtime/competition-runtime.service';
import { BroadcastDirectorService } from '../broadcast/broadcast-director.service';
import { midnightBroadcast } from '../broadcast/broadcast.models';
import { TelevisionStageComponent } from '../broadcast/television-stage.component';
import { studioProjection } from '../broadcast/studio-projection';
import { CompetitionBracketComponent } from '../ui/competition-bracket.component';
import { ScoreboardComponent } from '../ui/scoreboard.component';
import { FINAL_SHOWCASE } from './final-showcase.models';
import { buildFinalShowcase } from './final-showcase.engine';
import { QuizBreakComponent, QUIZ_GAMES } from './quiz-break.component';

@Component({
  selector: 'app-final-showcase', standalone: true,
  imports: [RouterLink, TelevisionStageComponent, CompetitionBracketComponent, QuizBreakComponent, ScoreboardComponent],
  providers: [BroadcastDirectorService],
  templateUrl: './final-showcase.component.html', styleUrl: './final-showcase.component.scss',
})
export class FinalShowcaseComponent implements OnDestroy {
  readonly project = inject(COMPETITION_CONFIG); readonly demo = inject(FINAL_SHOWCASE); readonly director = inject(BroadcastDirectorService);
  readonly model = buildFinalShowcase(this.project, this.demo);
  readonly stepMs = 4000;
  // The fast showcase fits its camera move and both reveals inside one chapter.
  readonly theme = { ...(this.project.broadcast ?? midnightBroadcast), camera: {
    ...(this.project.broadcast ?? midnightBroadcast).camera, moveMs: 450, revealMs: 250,
  } };
  readonly chapter = signal(0); readonly highlight = signal(0); readonly playing = signal(true); readonly questionOpen = signal(false); readonly resultShown = signal(false);
  readonly bracketRevealed = signal(false); readonly seconds = signal(90); readonly videoFailed = signal(false);
  readonly video = viewChild<ElementRef<HTMLVideoElement>>('video'); readonly area = viewChild<ElementRef<HTMLElement>>('area');
  readonly stage = viewChild(TelevisionStageComponent);
  readonly pageTop = viewChild<ElementRef<HTMLElement>>('pageTop');
  readonly quiz = viewChild(QuizBreakComponent);
  readonly teacherPanel = viewChild<ElementRef<HTMLDialogElement>>('teacherPanel');
  readonly teacherButton = viewChild<ElementRef<HTMLButtonElement>>('teacherButton');
  readonly teacherOpen = signal(false); readonly selectedGame = signal('odd'); readonly games = QUIZ_GAMES;
  readonly descriptions = ['Three weeks of learning. One unforgettable final.', 'The moments that brought our teams here.', 'Eight teams compete for four places on stage.', 'One question. Four teams. Make your answer count.', 'Everybody plays. The scoreboard takes a break.', 'A fast answer could change the lead.', 'A little laughter before the last big decision.', 'The final question. Everything can change.', 'A comeback worth celebrating.'];
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
    afterNextRender(() => {
      for (const moment of this.demo.highlights) if (moment.image) { const image = new Image(); image.src = moment.image.src; }
    });
    this.clock = setInterval(() => { if (this.playing() && this.questionOpen() && !this.resultShown()) this.seconds.update(v => Math.max(0, v - 1)); }, 1000);
    this.later(this.stepMs, () => this.next());
  }
  name(id: string): string { return this.model.config.teams.find(t => t.id === id)?.name ?? id; }
  play(): void { this.playing.set(true); this.go(this.chapter() === 0 || this.chapter() === 8 ? 1 : this.chapter()); }
  pause(): void { this.playing.set(false); this.clear(); this.director.cancel(); this.video()?.nativeElement.pause(); }
  go(index: number): void {
    this.clear(); this.director.cancel(); this.chapter.set(Math.max(0, Math.min(this.chapters.length - 1, index)));
    this.questionOpen.set(false); this.resultShown.set(false); this.seconds.set(this.round().seconds);
    this.selectedGame.set(this.chapter() === 6 ? 'wrong' : 'odd');
    afterNextRender(() => {
      const area = this.area()?.nativeElement;
      area?.focus({ preventScroll: true });
      this.pageTop()?.nativeElement.scrollIntoView?.({ block: 'start', behavior: this.director.reducedMotion() ? 'instant' : 'smooth' });
    }, { injector: this.injector });
    if (this.chapter() === 1) {
      this.highlight.set(0);
      if (this.playing() && (!this.demo.recapVideo || this.videoFailed())) this.playStoryboard();
    } else if (this.chapter() === 2) {
      this.bracketRevealed.set(false);
      if (this.playing()) this.later(1400, () => this.bracketRevealed.set(true));
    } else if (this.chapter() === 8) {
      this.director.run('champion', this.theme, undefined, this.model.champion.championId); this.playing.set(false);
    } else if (this.isStudio()) {
      this.director.autoShot('wide');
      if (this.playing()) this.openQuestion();
    }
    if (this.playing()) this.later(this.stepMs, () => this.next());
  }
  next(): void { this.go(this.chapter() + 1); }
  openQuestion(): void {
    if (this.questionOpen() || this.director.cue()) return;
    this.area()?.nativeElement.focus({ preventScroll: true });
    this.director.run('question', this.theme, () => {
      this.questionOpen.set(true);
      if (this.round().kind === 'buzzer') this.later(400, () => this.director.autoShot('team', this.demo.buzzerTeamId));
      if (this.playing()) this.later(900, () => this.showResult());
    });
  }
  showResult(): void {
    if (!this.questionOpen() || this.director.cue() || this.resultShown()) return;
    this.area()?.nativeElement.focus({ preventScroll: true });
    this.director.run('score', this.theme, () => {
      this.resultShown.set(true);
    });
  }
  selectChapter(index: number): void { this.pause(); this.go(index); }
  selectGame(id: string): void { this.pause(); this.selectedGame.set(id); this.quiz()?.choose(id); }
  toggleCameraMotion(): void { this.director.reducedMotion.update(value => !value); }
  openTeacher(): void {
    this.pause(); this.teacherOpen.set(true);
    afterNextRender(() => {
      const panel = this.teacherPanel()?.nativeElement;
      if (panel && !panel.open) { if (panel.showModal) panel.showModal(); else panel.setAttribute('open', ''); }
    }, { injector: this.injector });
  }
  closeTeacher(event?: Event): void {
    event?.preventDefault(); this.teacherOpen.set(false);
    const panel = this.teacherPanel()?.nativeElement;
    if (panel?.open) { if (panel.close) panel.close(); else panel.removeAttribute('open'); }
    this.teacherButton()?.nativeElement.focus({ preventScroll: true });
  }
  showHighlight(index: number): void { this.pause(); this.highlight.set(index); }
  videoError(): void { this.videoFailed.set(true); if (this.playing()) this.playStoryboard(); }
  private playStoryboard(): void {
    this.highlight.set(0);
    this.demo.highlights.forEach((_, index) => { if (index) this.later(index * this.stepMs / this.demo.highlights.length, () => this.highlight.set(index)); });
  }
  private later(ms: number, action: () => void): void { this.scheduled.push(setTimeout(action, ms)); }
  private clear(): void { this.scheduled.forEach(clearTimeout); this.scheduled = []; }
  ngOnDestroy(): void { this.clear(); clearInterval(this.clock); this.director.cancel(); }
}
