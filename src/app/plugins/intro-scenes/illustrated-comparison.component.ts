import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type {
  IllustratedComparisonConfig,
  ProjectTeaserResult,
} from '../../shared/project-intro/project-teaser.models';
import { TaskGuideComponent } from '../../shared/learning/task-guide.component';
import { TeaserAudioPlayer } from '../../shared/project-intro/teaser-audio-player';

export type ComparisonStage = 'welcome' | 'testing' | 'poof' | 'reveal' | 'handoff';

@Component({
  selector: 'app-illustrated-comparison',
  imports: [TaskGuideComponent],
  templateUrl: './illustrated-comparison.component.html',
  styleUrl: './illustrated-comparison.component.scss',
})
export class IllustratedComparisonComponent implements OnDestroy {
  readonly config = input.required<IllustratedComparisonConfig>();
  /** Story playback for an invitation; does not collect or emit practice responses. */
  readonly storyMode = input(false);
  readonly completed = output<ProjectTeaserResult>();
  readonly stage = signal<ComparisonStage>('welcome');
  readonly prediction = signal('');
  readonly conclusion = signal('');
  readonly feedback = signal('');
  readonly thinking = signal<NonNullable<ProjectTeaserResult['thinking']>>([]);
  readonly firstColor = signal(false);
  readonly secondColor = signal(false);
  readonly voices = signal(false);
  readonly activeLine = signal(-1);
  readonly audioNotice = signal('Voices are off. All dialogue is captioned.');
  readonly singed = computed(() => ['poof', 'reveal', 'handoff'].includes(this.stage()));
  readonly lines = computed(
    () =>
      this.config().dialogue[
        this.stage() === 'poof'
          ? 'testing'
          : (this.stage() as keyof IllustratedComparisonConfig['dialogue'])
      ],
  );
  private readonly narrator = new TeaserAudioPlayer();
  private readonly injector = inject(Injector);
  private readonly dialoguePanel = viewChild<ElementRef<HTMLElement>>('dialoguePanel');
  private readonly sceneHeading = viewChild<ElementRef<HTMLElement>>('sceneHeading');
  private readonly delays = new Map<ReturnType<typeof setTimeout>, () => void>();
  private sequence = 0;
  private voiceSequence = 0;
  private emitted = false;

  constructor() {
    afterNextRender(
      () => {
        if (this.storyMode()) return;
        const heading = this.sceneHeading()?.nativeElement;
        heading?.scrollIntoView({ block: 'nearest' });
        heading?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }

  async runTest(): Promise<void> {
    if (this.stage() !== 'welcome' || (!this.storyMode() && !this.prediction())) return;
    if (!this.storyMode()) this.thinking.set([{ step: 'prediction', answer: this.prediction() }]);
    const sequence = ++this.sequence;
    this.stopVoice();
    this.stage.set('testing');
    void this.delay(850).then(() => {
      if (sequence === this.sequence) this.firstColor.set(true);
    });
    await Promise.all([this.delay(2400), this.playLines()]);
    if (sequence !== this.sequence) return;
    this.secondColor.set(true);
    this.stage.set('poof');
    await this.delay(950);
    if (sequence !== this.sequence) return;
    this.stage.set('reveal');
    this.focusDialogue();
    void this.playLines();
  }

  showCase(): void {
    if (this.storyMode() && this.stage() === 'reveal') {
      this.stage.set('handoff');
      this.focusDialogue();
      void this.playLines();
      return;
    }
    if (this.stage() !== 'reveal' || !this.conclusion()) return;
    const samples = this.config().samples;
    const expected =
      samples[0].result === samples[1].result && samples[0].color === samples[1].color
        ? 'same'
        : 'different';
    const correct = this.conclusion() === expected;
    this.thinking.update((items) => [
      ...items.slice(-39),
      { step: 'observation', answer: this.conclusion(), correct },
    ]);
    if (!correct) {
      this.feedback.set('Compare the two colors after the test.');
      return;
    }
    this.feedback.set('');
    this.stage.set('handoff');
    this.focusDialogue();
    void this.playLines();
  }

  finish(skipped = false): void {
    if (this.storyMode()) return;
    if (this.emitted || (!skipped && this.stage() !== 'handoff')) return;
    this.emitted = true;
    this.cancel();
    this.completed.emit({
      eventType: skipped ? 'projectIntro.teaserSkipped' : 'projectIntro.teaserCompleted',
      teaserId: this.config().id,
      teaserVersion: this.config().version,
      timestamp: new Date().toISOString(),
      ...(this.thinking().length ? { thinking: this.thinking() } : {}),
      observations: this.config()
        .samples.filter((_, index) => (index === 0 ? this.firstColor() : this.secondColor()))
        .map((sample) => ({ sampleId: sample.id, result: sample.result })),
    });
  }

  toggleVoice(): void {
    this.voices.update((value) => !value);
    if (this.voices()) {
      this.audioNotice.set('Voices on · Captions stay visible');
      if (this.stage() !== 'poof') void this.playLines();
    } else {
      this.stopVoice();
      this.audioNotice.set('Voices are off. All dialogue is captioned.');
    }
  }

  replayVoices(): void {
    if (this.voices() && this.stage() !== 'poof') void this.playLines();
  }

  reset(): void {
    this.cancel();
    this.prediction.set('');
    this.conclusion.set('');
    this.feedback.set('');
    this.thinking.set([]);
    this.firstColor.set(false);
    this.secondColor.set(false);
    this.stage.set('welcome');
    this.emitted = false;
    this.focusDialogue();
    void this.playLines();
  }

  ngOnDestroy(): void {
    this.cancel();
  }

  private async playLines(): Promise<void> {
    this.stopVoice();
    if (!this.voices()) return;
    const generation = this.voiceSequence;
    const lines = this.lines();
    for (let index = 0; index < lines.length; index++) {
      if (generation !== this.voiceSequence || !this.voices()) return;
      this.activeLine.set(index);
      const played = await this.narrator.play(lines[index].audioUrl);
      if (generation !== this.voiceSequence) return;
      if (!played) {
        this.audioNotice.set('Audio could not play. Follow the captions, or try the voices again.');
        this.voices.set(false);
        this.activeLine.set(-1);
        return;
      }
    }
    if (generation === this.voiceSequence) this.activeLine.set(-1);
  }

  private stopVoice(): void {
    this.voiceSequence++;
    this.narrator.stop();
    this.activeLine.set(-1);
  }
  private cancel(): void {
    this.sequence++;
    this.stopVoice();
    for (const [timer, resolve] of this.delays) {
      clearTimeout(timer);
      resolve();
    }
    this.delays.clear();
  }
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.delays.delete(timer);
        resolve();
      }, ms);
      this.delays.set(timer, resolve);
    });
  }
  private focusDialogue(): void {
    afterNextRender(
      () => {
        const element = this.dialoguePanel()?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
}
