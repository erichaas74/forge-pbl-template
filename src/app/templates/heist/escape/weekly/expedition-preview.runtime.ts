import { Injectable, computed, inject, signal } from '@angular/core';
import { ESCAPE_MISSION } from '../runtime/escape-runtime';
import { stepForGrade } from '../domain/escape.models';
import type { MathGrade } from '../locks/machine.models';
import {
  balanceReading,
  balancePlacements,
  canPlaceBalanceWeight,
} from '../balance-lock/balance-lock.domain';
import { evaluateGearLock, gearFeedback, gearMotion } from '../gear-lock/gear-lock.domain';
import { machineReading, validMachineAnswer } from '../locks/machine.rules';
import {
  EXPEDITION_PREVIEW_PERSISTENCE,
  EXPEDITION_PREVIEW_SESSION,
} from './expedition-preview.persistence';
import {
  initialPreviewAnswer,
  validPreviewAnswer,
  type ExpeditionPreviewDraft,
  type ExpeditionPreviewSnapshot,
  type PreviewAnswer,
} from './expedition-preview.models';

@Injectable()
export class ExpeditionPreviewRuntime {
  readonly mission = inject(ESCAPE_MISSION);
  private readonly session = inject(EXPEDITION_PREVIEW_SESSION);
  private readonly persistence = inject(EXPEDITION_PREVIEW_PERSISTENCE);
  readonly grade = signal<MathGrade>(5);
  readonly selected = signal(this.mission.previewWeeks![0].sessions[0].stepId);
  readonly drafts = signal<Readonly<Record<string, ExpeditionPreviewDraft>>>({});
  readonly warning = signal('');
  private restoreFailed = false;
  readonly step = computed(() =>
    stepForGrade(
      this.mission.steps.find((s) => s.id === this.selected())!,
      this.grade(),
    ),
  );
  readonly key = computed(() => `${this.grade()}:${this.selected()}`);
  readonly draft = computed(
    () => this.drafts()[this.key()] ?? { answer: initialPreviewAnswer(this.step()), trials: [] },
  );
  readonly source = signal('Sample setup — editable starting equipment.');

  constructor() {
    if (
      this.session.mode !== 'preview' ||
      this.session.authorityMode !== 'localDemo' ||
      !this.mission.previewWeeks
    )
      throw new Error('PERMISSION_DENIED: configured local authoring preview required');
    try {
      const saved = this.persistence.load();
      if (saved !== undefined) this.restore(saved);
    } catch (error) {
      console.warn('Expedition preview restore:', error instanceof Error ? error.message : 'INVALID_SNAPSHOT');
      this.restoreFailed = true;
      this.warning.set(
        'Saved preview could not be read. Your saved copy is retained; changes work in this visit only.',
      );
    }
  }
  choose(id: string): void {
    if (!this.mission.steps.some((s) => s.id === id)) return;
    this.selected.set(id);
    this.source.set(
      this.drafts()[this.key()]
        ? 'Your saved setup — edits retained.'
        : 'Sample setup — editable starting equipment.',
    );
  }
  setGrade(grade: number): void {
    if (!(this.mission.mathGrades ?? [5]).includes(grade as MathGrade)) return;
    this.grade.set(grade as MathGrade);
    this.choose(this.selected());
    this.save();
  }
  change(answer: PreviewAnswer): void {
    if (!validPreviewAnswer(this.step(), answer)) {
      this.warning.set('INVALID_COMMAND: those settings do not fit this mechanism.');
      return;
    }
    const puzzle = this.step().puzzle;
    if (puzzle.type === 'balance-lock' && Array.isArray(answer))
      answer = [...balancePlacements(puzzle.lock, answer)];
    this.drafts.update((all) => ({
      ...all,
      [this.key()]: { ...this.draft(), answer: structuredClone(answer) },
    }));
    this.source.set('Your setup — edits retained.');
    this.save();
  }
  moveWeight(index: number, side: number): void {
    const answer = this.draft().answer,
      puzzle = this.step().puzzle;
    if (puzzle.type === 'balance-lock' && !canPlaceBalanceWeight(puzzle.lock, side)) return;
    if (Array.isArray(answer)) this.change(answer.map((v, i) => (i === index ? side : v)));
  }
  trial(stage = 0): void {
    const p = this.step().puzzle,
      answer = this.draft().answer;
    let reading: { success: boolean; equation: string; feedback: string };
    if (!Number.isInteger(stage) || stage < 0) return;
    if (p.type === 'machine-lock' && validMachineAnswer(p.lock, answer) && p.lock.stages[stage]) {
      const value = machineReading(p.lock.stages[stage], answer.stages[stage]);
      reading = { success: value.solved, equation: value.equation, feedback: value.feedback };
    } else if (p.type === 'balance-lock' && Array.isArray(answer) && p.lock.scales[stage]) {
      const value = balanceReading(p.lock, stage, answer);
      reading = { success: value.balanced, equation: value.equation, feedback: value.feedback };
    } else if (p.type === 'gear-lock' && Array.isArray(answer) && stage === 0) {
      const motion = gearMotion(p.lock, answer, answer[2]);
      reading = {
        success: evaluateGearLock(p.lock, answer),
        equation: `${answer[2]} input turns · ${motion.output} output turns`,
        feedback: gearFeedback(p.lock, answer),
      };
    } else return;
    const trial = { id: crypto.randomUUID(), answer: structuredClone(answer), stage, ...reading };
    this.drafts.update((all) => ({
      ...all,
      [this.key()]: { ...this.draft(), trials: [...this.draft().trials, trial].slice(-30) },
    }));
    this.save();
  }
  restoreTrial(id: string): void {
    const trial = this.draft().trials.find((t) => t.id === id);
    if (trial) this.change(trial.answer);
  }
  reset(): void {
    this.change(initialPreviewAnswer(this.step()));
  }
  retrySave(): void {
    this.save();
  }
  private save(): void {
    if (this.restoreFailed) return;
    try {
      this.persistence.save({ version: 1, grade: this.grade(), drafts: this.drafts() });
      this.warning.set('');
    } catch {
      this.warning.set(
        'This browser could not save your preview. Keep this page open; your edits are still here.',
      );
    }
  }
  private restore(value: unknown): void {
    const fail = (): never => {
      throw new Error('INVALID_SNAPSHOT');
    };
    if (
      !value ||
      typeof value !== 'object' ||
      !('version' in value) ||
      value.version !== 1 ||
      !('grade' in value) ||
      !(this.mission.mathGrades ?? [5]).includes(value.grade as MathGrade) ||
      !('drafts' in value) ||
      !value.drafts ||
      typeof value.drafts !== 'object' ||
      Array.isArray(value.drafts)
    )
      return fail();
    const snapshot = value as ExpeditionPreviewSnapshot;
    if (Object.keys(snapshot.drafts).length > this.mission.steps.length * 4) return fail();
    for (const [key, draft] of Object.entries(snapshot.drafts)) {
      const [grade, id] = key.split(':');
      const base = this.mission.steps.find((s) => s.id === id);
      if (!base || !(this.mission.mathGrades ?? [5]).includes(Number(grade) as MathGrade))
        return fail();
      const step = stepForGrade(base, Number(grade) as MathGrade);
      if (
        !draft ||
        !validPreviewAnswer(step, draft.answer) ||
        !Array.isArray(draft.trials) ||
        draft.trials.length > 30
      )
        return fail();
      for (const t of draft.trials) {
        const count =
          step.puzzle.type === 'machine-lock'
            ? step.puzzle.lock.stages.length
            : step.puzzle.type === 'balance-lock'
              ? step.puzzle.lock.scales.length
              : 1;
        if (
          !t ||
          typeof t.id !== 'string' ||
          !validPreviewAnswer(step, t.answer) ||
          !Number.isInteger(t.stage) ||
          t.stage < 0 ||
          t.stage >= count ||
          typeof t.success !== 'boolean' ||
          typeof t.equation !== 'string' ||
          typeof t.feedback !== 'string'
        )
          return fail();
      }
    }
    this.grade.set(snapshot.grade);
    this.drafts.set(structuredClone(snapshot.drafts));
  }
}
