import { evaluateEscapePuzzle } from './escape-puzzles';
import type { EscapeAttempt, EscapeEnvelope, EscapeMission } from './escape.models';

/** Deterministic local-practice progression; the UI cannot release animals or skip locks. */
export class EscapeEngine {
  started = false;
  index = 0;
  readonly solved = new Set<string>();
  readonly attempts: EscapeAttempt[] = [];
  private readonly processed = new Set<string>();
  constructor(readonly mission: EscapeMission) {}
  get current() {
    return this.mission.steps[this.index];
  }
  get complete(): boolean {
    return this.index === this.mission.steps.length;
  }
  get released(): ReadonlySet<string> {
    return new Set(
      this.mission.steps.filter((s) => this.solved.has(s.id)).flatMap((s) => s.release),
    );
  }
  get rescued(): number {
    return this.mission.animals
      .filter((a) => this.released.has(a.id))
      .reduce((n, a) => n + a.count, 0);
  }
  dispatch(value: unknown): boolean {
    if (
      !value ||
      typeof value !== 'object' ||
      !('id' in value) ||
      typeof value.id !== 'string' ||
      !value.id ||
      value.id.length > 100 ||
      !('command' in value)
    )
      return false;
    if (this.processed.has(value.id)) return true;
    const c = value.command;
    if (!c || typeof c !== 'object' || !('type' in c)) return false;
    if (c.type === 'start') {
      if (this.started) return false;
      this.started = true;
    } else {
      if (!this.started || this.complete || !('stepId' in c) || c.stepId !== this.current.id)
        return false;
      if (c.type === 'continue') {
        if (!this.solved.has(this.current.id)) return false;
        this.index++;
      } else if (c.type === 'submit') {
        if (this.solved.has(this.current.id) || !('answer' in c) || this.attempts.length >= 1500)
          return false;
        const a = c.answer;
        if (!(
          (typeof a === 'number' && Number.isFinite(a)) ||
          (typeof a === 'string' && /^\d{1,6}$/.test(a)) ||
          (Array.isArray(a) &&
            a.length <= (this.current.puzzle.type === 'balance-lock' ? 24 : 12) &&
            a.every((i) => typeof i === 'number' && Number.isInteger(i)))
        ))
          return false;
        const answer = a as EscapeAttempt['answer'];
        const correct = evaluateEscapePuzzle(this.current.puzzle, answer);
        this.attempts.push({ stepId: this.current.id, answer: structuredClone(answer), correct });
        if (correct) this.solved.add(this.current.id);
      } else return false;
    }
    this.processed.add((value as EscapeEnvelope).id);
    return true;
  }
}
