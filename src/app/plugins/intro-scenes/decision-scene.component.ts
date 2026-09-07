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
  DecisionSceneConfig,
  OpeningChoice,
} from '../../shared/project-intro/decision-scene.models';
import type { ProjectTeaserResult } from '../../shared/project-intro/project-teaser.models';
import { TeaserAudioPlayer } from '../../shared/project-intro/teaser-audio-player';
import { OpeningMediaComponent } from './opening-media.component';
import { OpeningSpeechesComponent } from './opening-speeches.component';
import { ObjectModelViewerComponent } from '../../shared/media/object-model-viewer.component';
import { FormsModule } from '@angular/forms';
import { TaskGuideComponent } from '../../shared/learning/task-guide.component';
import { cargoMathSteps, checkCargoAnswer } from '../../shared/project-intro/opening-practice';
import { CargoWagonComponent } from './cargo-wagon.component';
import { cargoOutcome, cargoTotals } from '../../shared/project-intro/cargo-selection';

@Component({
  selector: 'app-decision-scene',
  imports: [
    OpeningMediaComponent,
    OpeningSpeechesComponent,
    ObjectModelViewerComponent,
    FormsModule,
    TaskGuideComponent,
    CargoWagonComponent,
  ],
  templateUrl: './decision-scene.component.html',
  styleUrl: './decision-scene.component.scss',
})
export class DecisionSceneComponent implements OnDestroy {
  readonly config = input.required<DecisionSceneConfig>();
  readonly completed = output<ProjectTeaserResult>();
  readonly stage = signal<'briefing' | 'thinking' | 'reveal' | 'mission'>('briefing');
  private readonly prologueDismissed = signal(false);
  readonly prologue = computed(() =>
    this.prologueDismissed() ? undefined : this.config().prologue,
  );
  readonly selected = signal<OpeningChoice | undefined>(undefined);
  readonly videoFinished = signal(false);
  readonly cargoItems = signal<readonly OpeningChoice[]>([]);
  readonly cargoBalance = computed(() =>
    cargoTotals(this.config().cargo?.startingCoins ?? 0, this.cargoItems()),
  );
  readonly mathIndex = signal(0);
  readonly mathStep = computed(() => cargoMathSteps[this.mathIndex()]);
  readonly answer = signal('');
  readonly evidenceId = signal('');
  readonly feedback = signal('');
  readonly attempts = signal<NonNullable<ProjectTeaserResult['thinking']>>([]);
  readonly canSaveThought = computed(
    () =>
      this.answer().trim().length >= 8 &&
      (!this.selected()?.thinking?.evidence || !!this.evidenceId()),
  );
  readonly mathPrompt = computed(
    () =>
      ({
        cost: 'What will your cargo cost?',
        remaining: 'How many coins will you have left?',
        sale: 'How much did you earn from sales?',
        profit: 'How much profit did you make?',
      })[this.mathStep()],
  );
  readonly voices = signal(false);
  readonly activeLine = signal(-1);
  readonly audioNotice = signal('Sound off · Everything is readable on screen');
  readonly replayKey = signal(0);
  readonly transitioning = signal(false);
  readonly lines = computed(() =>
    this.prologue()
      ? this.prologue()!.dialogue
      : this.stage() === 'briefing'
        ? this.config().dialogue
        : this.stage() === 'reveal'
          ? (this.selected()?.result.dialogue ?? [])
          : (this.config().mission.dialogue ?? []),
  );
  private readonly narrator = new TeaserAudioPlayer();
  private readonly speeches = viewChild(OpeningSpeechesComponent);
  private readonly injector = inject(Injector);
  private readonly heading = viewChild<ElementRef<HTMLElement>>('sceneHeading');
  private readonly revealHeading = viewChild<ElementRef<HTMLElement>>('revealHeading');
  private generation = 0;
  private emitted = false;
  private transitionTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    this.focus(false);
  }

  choose(id: string): void {
    if (this.prologue() || this.stage() !== 'briefing' || this.transitioning() || this.emitted)
      return;
    const choice = this.config().choices.find((item) => item.id === id);
    if (!choice) return;
    if (this.config().cargo) {
      if (this.isLoaded(choice))
        this.cargoItems.update((items) => items.filter((item) => item.id !== id));
      else if (!this.choiceDisabled(choice)) this.cargoItems.update((items) => [...items, choice]);
      return;
    }
    this.speeches()?.pauseAll();
    this.selected.set(choice);
    if (choice.thinking) {
      this.stage.set('thinking');
      this.focus(true);
    } else if (this.config().transition) {
      this.stopVoice();
      this.transitioning.set(true);
      this.focus(false);
      this.transitionTimer = setTimeout(() => this.reveal(), 1300);
    } else this.reveal();
  }

  isLoaded(choice: OpeningChoice): boolean {
    return this.cargoItems().some((item) => item.id === choice.id);
  }

  choiceDisabled(choice: OpeningChoice): boolean {
    const cargo = this.config().cargo;
    return (
      this.transitioning() ||
      (!!cargo &&
        !this.isLoaded(choice) &&
        (this.cargoItems().length >= cargo.capacity ||
          (choice.cargo?.cost ?? 0) > this.cargoBalance().remaining))
    );
  }

  depart(): void {
    const cargo = this.config().cargo;
    if (
      !cargo ||
      this.prologue() ||
      this.stage() !== 'briefing' ||
      this.emitted ||
      this.cargoItems().length !== cargo.capacity ||
      this.cargoBalance().remaining < 0
    )
      return;
    this.stage.set('thinking');
    this.mathIndex.set(0);
    this.answer.set('');
    this.focus(true);
  }

  checkMath(): void {
    const cargo = this.config().cargo;
    if (!cargo || this.stage() !== 'thinking' || this.emitted) return;
    const answer = this.answer().trim();
    if (!answer) {
      this.feedback.set('Enter your total.');
      return;
    }
    const correct = checkCargoAnswer(
      cargo.startingCoins,
      this.cargoItems(),
      this.mathStep(),
      answer,
    );
    this.recordThought({ step: this.mathStep(), answer, correct });
    if (!correct) {
      this.feedback.set(
        this.mathStep() === 'cost' || this.mathStep() === 'sale'
          ? 'Try adding the two prices. You can use the guide.'
          : 'Check which amount you are subtracting. You can use the guide.',
      );
      return;
    }
    this.feedback.set('');
    this.answer.set('');
    if (this.mathIndex() < cargoMathSteps.length - 1) {
      this.mathIndex.update((value) => value + 1);
      this.focus(true);
    } else {
      this.selected.set(cargoOutcome(this.config(), this.cargoItems()));
      this.reveal();
    }
  }

  saveThought(): void {
    if (
      this.stage() !== 'thinking' ||
      !this.canSaveThought() ||
      !this.selected()?.thinking ||
      this.emitted
    )
      return;
    this.recordThought({
      step: this.selected()!.id,
      answer: this.answer().trim(),
      ...(this.evidenceId() ? { evidenceId: this.evidenceId() } : {}),
    });
    this.reveal();
  }

  private recordThought(attempt: NonNullable<ProjectTeaserResult['thinking']>[number]): void {
    this.attempts.update((items) => [...items.slice(-39), attempt]);
  }

  private reveal(): void {
    this.transitioning.set(false);
    this.stage.set('reveal');
    this.focus(true);
    void this.playLines();
  }

  showMission(): void {
    if (this.stage() !== 'reveal' || this.emitted) return;
    this.stage.set('mission');
    this.focus(true);
    void this.playLines();
  }

  finish(skipped = false): void {
    if (this.emitted || (!skipped && !['reveal', 'mission'].includes(this.stage()))) return;
    this.emitted = true;
    this.speeches()?.pauseAll();
    clearTimeout(this.transitionTimer);
    this.stopVoice();
    const choice = this.selected();
    this.completed.emit({
      eventType: skipped ? 'projectIntro.teaserSkipped' : 'projectIntro.teaserCompleted',
      teaserId: this.config().id,
      teaserVersion: this.config().version,
      timestamp: new Date().toISOString(),
      ...(choice ? { choiceId: choice.id } : {}),
      ...(this.attempts().length ? { thinking: this.attempts() } : {}),
      observations:
        choice && ['reveal', 'mission'].includes(this.stage())
          ? this.config().cargo
            ? this.cargoItems().map((item) => ({ sampleId: item.id, result: item.result.evidence }))
            : [{ sampleId: choice.id, result: choice.result.evidence }]
          : [],
    });
  }

  reset(): void {
    this.speeches()?.pauseAll();
    clearTimeout(this.transitionTimer);
    this.transitioning.set(false);
    this.stopVoice();
    this.selected.set(undefined);
    this.videoFinished.set(false);
    this.cargoItems.set([]);
    this.mathIndex.set(0);
    this.answer.set('');
    this.feedback.set('');
    this.evidenceId.set('');
    this.attempts.set([]);
    this.prologueDismissed.set(false);
    this.stage.set('briefing');
    this.emitted = false;
    this.replayKey.update((value) => value + 1);
    this.focus(false);
    void this.playLines();
  }

  continuePrologue(): void {
    if (!this.prologue() || this.emitted) return;
    this.stopVoice();
    this.prologueDismissed.set(true);
    this.focus(false);
    void this.playLines();
  }

  listenToStory(): void {
    if (!this.prologue() || this.emitted) return;
    if (this.activeLine() >= 0) {
      this.voices.set(false);
      this.stopVoice();
      this.audioNotice.set('Sound off · Everything is readable on screen');
    } else {
      this.voices.set(true);
      this.audioNotice.set('Story playing · Follow the words below');
      void this.playLines();
    }
  }

  toggleVoice(): void {
    this.voices.update((value) => !value);
    this.audioNotice.set(
      this.voices()
        ? 'Voices on · Captions stay visible'
        : 'Sound off · Everything is readable on screen',
    );
    if (this.voices()) void this.playLines();
    else this.stopVoice();
  }

  ngOnDestroy(): void {
    clearTimeout(this.transitionTimer);
    this.stopVoice();
  }

  private async playLines(): Promise<void> {
    this.stopVoice();
    if (!this.voices()) return;
    const generation = this.generation;
    for (let i = 0; i < this.lines().length; i++) {
      this.activeLine.set(i);
      const played = await this.narrator.play(this.lines()[i].audioUrl);
      if (generation !== this.generation) return;
      if (!played) {
        this.voices.set(false);
        this.audioNotice.set(
          'Audio could not play. The full dialogue is below; you can try voices again.',
        );
        break;
      }
    }
    this.activeLine.set(-1);
    if (this.prologue() && this.voices())
      this.audioNotice.set('Story finished · Listen again or continue when you’re ready');
  }

  private stopVoice(): void {
    this.generation++;
    this.narrator.stop();
    this.activeLine.set(-1);
  }

  private focus(reveal: boolean): void {
    afterNextRender(
      () => {
        const element = (reveal ? this.revealHeading() : this.heading())?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
}
