import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import type { EscapeAnswer } from '../domain/escape.models';
import { EscapeRuntime } from '../runtime/escape-runtime';

@Component({
  selector: 'app-heist-escape',
  imports: [FormsModule, RouterLink],
  templateUrl: './escape.component.html',
  styleUrls: ['./escape.component.scss', './escape-mechanisms.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EscapeComponent {
  readonly runtime = inject(EscapeRuntime);
  readonly mission = this.runtime.mission;
  readonly engine = computed(
    () => {
      this.runtime.revision();
      return this.runtime.engine;
    },
    { equal: () => false },
  );
  readonly total = this.mission.animals.reduce((n, a) => n + a.count, 0);
  readonly pens = this.mission.steps
    .filter((s) => s.release.length > 0)
    .map((s) => ({
      id: s.id,
      x: s.x,
      y: s.y + 10,
      animals: this.mission.animals.filter((a) => s.release.includes(a.id)),
    }));
  readonly review = signal<number | null>(null);
  readonly step = computed(
    () =>
      this.mission.steps[
        this.review() ?? Math.min(this.engine().index, this.mission.steps.length - 1)
      ],
  );
  readonly puzzle = computed(() => this.step().puzzle);
  readonly countAnimals = computed(() => {
    const p = this.puzzle();
    return p.type === 'code' && p.countAnimals;
  });
  readonly solved = computed(() => this.engine().solved.has(this.step().id));
  readonly hint = signal(false);
  readonly feedback = signal('');
  readonly marked = signal<ReadonlySet<string>>(new Set());
  readonly weights = signal<readonly number[]>([]);
  readonly balanceTotal = computed(() => {
    const p = this.puzzle();
    return p.type === 'balance' ? this.weights().reduce((n, i) => n + p.weights[i], 0) : 0;
  });
  readonly digits = signal<readonly number[]>([0, 0, 0, 0, 0, 0]);
  readonly departure = signal(0);
  readonly showRestart = signal(false);
  answer: number | null = null;
  @ViewChild('panel') private panel?: ElementRef<HTMLElement>;
  sequence(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }
  start(): void {
    if (this.runtime.send({ type: 'start' })) this.clearInput();
  }
  mark(id: string): void {
    this.marked.update((old) => {
      const next = new Set(old);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  turn(index: number, direction: number): void {
    this.digits.update((old) =>
      this.sequence(this.puzzle().type === 'code' ? this.codeLength() : 3).map((i) =>
        i === index ? ((old[i] ?? 0) + direction + 10) % 10 : (old[i] ?? 0),
      ),
    );
    this.feedback.set('');
  }
  private codeLength(): number {
    const p = this.puzzle();
    return p.type === 'code' ? p.labels.length : 0;
  }
  toggleWeight(index: number): void {
    this.weights.update((old) =>
      old.includes(index) ? old.filter((i) => i !== index) : [...old, index],
    );
    this.feedback.set('');
  }
  adjust(delta: number): void {
    const p = this.puzzle();
    if (p.type === 'number') this.answer = Math.max(0, Math.min(p.max, (this.answer ?? 0) + delta));
    this.feedback.set('');
  }
  submit(): void {
    const p = this.puzzle();
    let answer: EscapeAnswer;
    if (p.type === 'code') answer = p.labels.map((_, i) => this.digits()[i] ?? 0).join('');
    else if (p.type === 'timing') answer = this.departure();
    else if (p.type === 'balance') answer = this.weights();
    else if (p.type === 'balance-lock' || p.type === 'gear-lock' || p.type === 'machine-lock') return; // Validated packages require the expedition renderer.
    else {
      if (
        this.answer === null ||
        !Number.isFinite(this.answer) ||
        this.answer < 0 ||
        this.answer > p.max
      ) {
        this.feedback.set(`Enter a number from 0 to ${p.max} first.`);
        return;
      }
      answer = this.answer;
    }
    if (!this.runtime.send({ type: 'submit', stepId: this.step().id, answer })) {
      this.feedback.set(
        'This attempt could not be recorded. Check the save message or start a new rescue.',
      );
      return;
    }
    if (this.solved()) {
      this.feedback.set('');
      this.focusPanel();
    } else {
      const timingFeedback =
        p.type === 'timing'
          ? this.departure() < p.safeStart || this.departure() + p.crossing > p.safeEnd
            ? `The crossing from second ${this.departure()} to ${this.departure() + p.crossing} overlaps the lookout's watch. `
            : `That crossing is safe, but you can leave later. `
          : '';
      this.feedback.set(`${timingFeedback}The mechanism stays closed. ${p.hint}`);
    }
  }
  next(): void {
    if (this.runtime.send({ type: 'continue', stepId: this.step().id })) {
      this.review.set(null);
      this.clearInput();
    }
  }
  inspect(index: number): void {
    if (!this.engine().started || index > this.engine().index) return;
    this.review.set(index === this.engine().index ? null : index);
    this.feedback.set('');
    this.focusPanel();
  }
  resume(): void {
    this.review.set(null);
    this.focusPanel();
  }
  requestRestart(): void {
    this.showRestart.set(true);
    this.focusPanel();
  }
  dismissRestart(): void {
    this.showRestart.set(false);
    this.focusPanel();
  }
  restart(): void {
    this.runtime.reset();
    this.review.set(null);
    this.showRestart.set(false);
    this.marked.set(new Set());
    this.clearInput();
  }
  private clearInput(): void {
    this.answer = null;
    this.digits.set([0, 0, 0, 0, 0, 0]);
    this.weights.set([]);
    this.departure.set(0);
    this.feedback.set('');
    this.hint.set(false);
    this.focusPanel();
  }
  private focusPanel(): void {
    setTimeout(() => {
      const panel = this.panel?.nativeElement;
      if (!panel?.isConnected) return;
      panel.scrollIntoView?.({ block: 'nearest', behavior: 'instant' });
      panel.focus({ preventScroll: true });
    }, 0);
  }
}
