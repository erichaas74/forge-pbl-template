import type { EscapeStep } from '../domain/escape.models';
import type { MachineAnswer, MathGrade } from '../locks/machine.models';
import { emptyBalance, validPlacements } from '../balance-lock/balance-lock.domain';
import { emptyGears, validGearDraft } from '../gear-lock/gear-lock.domain';
import { initialMachine, validMachineAnswer } from '../locks/machine.rules';

export interface ExpeditionPreviewWeek {
  readonly week: number;
  readonly title: string;
  readonly setting: string;
  readonly sessions: readonly [
    { readonly stepId: string; readonly product: string; readonly sample: string },
    { readonly stepId: string; readonly product: string; readonly sample: string },
  ];
  readonly questions: readonly string[];
  readonly evidence: readonly string[];
  readonly controls: readonly string[];
}
export type PreviewAnswer = readonly number[] | MachineAnswer;
export interface ExpeditionPreviewTrial {
  readonly id: string;
  readonly answer: PreviewAnswer;
  readonly stage: number;
  readonly success: boolean;
  readonly equation: string;
  readonly feedback: string;
}
export interface ExpeditionPreviewDraft {
  readonly answer: PreviewAnswer;
  readonly trials: readonly ExpeditionPreviewTrial[];
}
export interface ExpeditionPreviewSnapshot {
  readonly version: 1;
  readonly grade: MathGrade;
  readonly drafts: Readonly<Record<string, ExpeditionPreviewDraft>>;
}
export function initialPreviewAnswer(step: EscapeStep): PreviewAnswer {
  const p = step.puzzle;
  if (p.type === 'balance-lock') return emptyBalance(p.lock);
  if (p.type === 'gear-lock') return emptyGears();
  if (p.type === 'machine-lock') return initialMachine(p.lock);
  throw new Error(`CAPABILITY_NOT_INSTALLED: expedition preview renderer ${p.type}`);
}
export function validPreviewAnswer(step: EscapeStep, value: unknown): value is PreviewAnswer {
  const p = step.puzzle;
  if (p.type === 'balance-lock') return Array.isArray(value) && validPlacements(p.lock, value);
  if (p.type === 'gear-lock') return Array.isArray(value) && validGearDraft(p.lock, value);
  return p.type === 'machine-lock' && validMachineAnswer(p.lock, value) && value.seals.length === 0;
}

/** Optional template extension: every session points at an installed interactive workshop. */
export function validatePreviewWeeks(value: unknown, steps: readonly EscapeStep[]): void {
  const fail = (): never => {
    throw new Error('INVALID_HEIST_ESCAPE: previewWeeks');
  };
  const row = (v: unknown): v is Record<string, unknown> =>
    !!v && typeof v === 'object' && !Array.isArray(v);
  const text = (v: unknown): v is string =>
    typeof v === 'string' && v.trim().length > 0 && v.length <= 1500;
  const texts = (v: unknown): boolean =>
    Array.isArray(v) && v.length > 0 && v.length <= 8 && v.every(text);
  if (!Array.isArray(value) || value.length !== 4) return fail();
  const seen = new Set<string>();
  value.forEach((week, index) => {
    if (
      !row(week) ||
      week['week'] !== index + 1 ||
      !text(week['title']) ||
      !text(week['setting']) ||
      !texts(week['questions']) ||
      !texts(week['evidence']) ||
      !texts(week['controls']) ||
      !Array.isArray(week['sessions']) ||
      week['sessions'].length !== 2
    )
      return fail();
    for (const session of week['sessions']) {
      if (
        !row(session) ||
        !text(session['stepId']) ||
        !text(session['product']) ||
        !text(session['sample'])
      )
        return fail();
      const step = steps.find((s) => s.id === session['stepId']);
      if (!step || seen.has(step.id)) return fail();
      seen.add(step.id);
    }
  });
  // The selector exposes extra locations too; all must have an installed renderer.
  for (const step of steps) {
    if (!['balance-lock', 'gear-lock', 'machine-lock'].includes(step.puzzle.type))
      throw new Error(`CAPABILITY_NOT_INSTALLED: expedition preview renderer ${step.puzzle.type}`);
  }
}
