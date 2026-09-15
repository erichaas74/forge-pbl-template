import { emptyGears, validGearDraft } from '../gear-lock/gear-lock.domain';
import { initialMachine, validMachineAnswer } from '../locks/machine.rules';
import type { MathGrade } from '../locks/machine.models';
import { stepForGrade } from '../domain/escape.models';
import {
  allBalancePieces,
  emptyBalance,
  balancePlacements,
  canPlaceBalanceWeight,
} from '../balance-lock/balance-lock.domain';
import { Injectable, InjectionToken, computed, inject, signal } from '@angular/core';
import type { EscapeAnswer, EscapeStep } from '../domain/escape.models';
import type {
  ExpeditionDraft,
  ExpeditionInput,
  ExpeditionPlayer,
  WorldPoint,
} from '../domain/expedition.models';
import { ExpeditionNavigation, worldDistance } from '../domain/expedition.navigation';
import { EscapeRuntime } from './escape-runtime';

export const EXPEDITION_PLAYER = new InjectionToken<{ id: string; name: string; color: number }>(
  'EXPEDITION_PLAYER',
  {
    factory: () => ({ id: 'local-rescuer', name: 'You', color: 0x82e6d2 }),
  },
);
const blankDraft = (): ExpeditionDraft => ({
  digits: [0, 0, 0, 0, 0, 0],
  quantity: null,
  departure: 0,
  weights: [],
  counted: [],
});
export type ExpeditionPhase =
  'opening' | 'explore' | 'puzzle' | 'celebrate' | 'journal' | 'complete';

@Injectable()
export class ExpeditionRuntime {
  readonly progress = inject(EscapeRuntime);
  readonly mission = this.progress.mission;
  readonly localIdentity = inject(EXPEDITION_PLAYER);
  readonly definition = this.mission.world!;
  readonly navigation = new ExpeditionNavigation(this.definition, this.definition.spawn, true);
  readonly engine = computed(
    () => {
      this.progress.revision();
      return this.progress.engine;
    },
    { equal: () => false },
  );
  readonly current = computed(() =>
    stepForGrade(
      this.mission.steps[Math.min(this.engine().index, this.mission.steps.length - 1)],
      this.engine().grade,
    ),
  );
  readonly phase = signal<ExpeditionPhase>('opening');
  readonly draft = signal<ExpeditionDraft>(blankDraft());
  readonly nearby = signal(false);
  readonly message = signal('');
  readonly hint = signal(false);
  readonly paused = signal(false);
  readonly reducedMotion = signal(
    globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  );
  readonly audioEnabled = signal(true);
  readonly totalAnimals = this.mission.animals.reduce((sum, a) => sum + a.count, 0);
  readonly celebration = signal(0);
  /** Only this collection crosses the presentation boundary; the scene is not tied to a single avatar. */
  private remotePresence: readonly ExpeditionPlayer[] = [];
  private pendingInteraction: string | null = null;
  private walkingTo = false;
  private readonly drafts = new Map<string, ExpeditionDraft>();
  constructor() {
    this.navigation.setSolved(this.engine().solved);
    this.restoreDraft();
    if (this.engine().started) {
      this.navigation.position = this.point(this.current());
      this.nearby.set(true);
    }
  }
  private restoreDraft(): void {
    const step = this.current();
    const saved = this.drafts.get(step.id);
    this.draft.set(saved ? structuredClone(saved) : blankDraft());
    const answer = this.engine()
      .attempts.slice()
      .reverse()
      .find((attempt) => attempt.stepId === step.id && attempt.correct)?.answer;
    if (['balance-lock', 'gear-lock'].includes(step.puzzle.type) && Array.isArray(answer))
      this.draft.update((d) => ({ ...d, placements: answer }));
    if (step.puzzle.type === 'machine-lock') {
      const checkpoint = answer ?? this.engine().checkpoints.get(step.id);
      if (validMachineAnswer(step.puzzle.lock, checkpoint))
        this.draft.update((d) => ({ ...d, machine: structuredClone(checkpoint) }));
    }
  }
  /** Visit without recording an answer, a rescue, or completion. */
  visitLock(index: number, open = true): boolean {
    if (
      this.paused() ||
      !this.engine().started ||
      !Number.isInteger(index) ||
      index < 0 ||
      index >= this.mission.steps.length
    )
      return false;
    const oldId = this.current().id;
    const draft = structuredClone(this.draft());
    if (!this.progress.send({ type: 'visit', stepId: this.mission.steps[index].id })) return false;
    this.drafts.set(oldId, draft);
    this.restoreDraft();
    this.navigation.stop();
    this.pendingInteraction = null;
    this.walkingTo = false;
    this.hint.set(false);
    this.message.set('');
    if (open) this.navigation.position = this.point(this.current());
    this.nearby.set(
      worldDistance(this.navigation.position, this.point(this.current())) <=
        this.definition.interactionRadius,
    );
    this.phase.set(
      open ? (this.engine().solved.has(this.current().id) ? 'celebrate' : 'puzzle') : 'explore',
    );
    return true;
  }

  get players(): readonly ExpeditionPlayer[] {
    return [
      {
        ...this.localIdentity,
        position: this.navigation.position,
        facing: this.navigation.facing,
        moving: this.navigation.moving,
      },
      ...this.remotePresence,
    ];
  }
  /** A future authenticated presence adapter may feed peer snapshots here, never answer outcomes. */
  receivePresence(players: readonly ExpeditionPlayer[]): void {
    const ids = new Set([this.localIdentity.id]);
    this.remotePresence = players
      .filter((p) => {
        if (
          ids.has(p.id) ||
          !p.id ||
          !this.navigation.walkable(p.position) ||
          !Number.isFinite(p.facing)
        )
          return false;
        ids.add(p.id);
        return true;
      })
      .slice(0, 3)
      .map((p) => ({ ...p, name: p.name.slice(0, 24), position: { ...p.position } }));
  }
  start(): boolean {
    if (this.progress.restoreBlocked()) return false;
    if (!this.engine().started && !this.progress.send({ type: 'start' })) return false;
    this.phase.set(
      this.engine().complete
        ? 'complete'
        : this.engine().solved.has(this.current().id)
          ? 'celebrate'
          : 'explore',
    );
    this.message.set('Follow the gold beacon. Click to walk, or use WASD / arrow keys.');
    return true;
  }
  setGrade(grade: number): void {
    if (this.phase() === 'opening' && !this.engine().started && [5, 6, 7, 8].includes(grade))
      this.progress.send({ type: 'select-grade', grade: grade as MathGrade });
  }
  point(step: EscapeStep): WorldPoint {
    return {
      x: (step.x / 100) * this.definition.width,
      y: (step.y / 100) * this.definition.height,
    };
  }
  tick(dt: number, direction: WorldPoint): void {
    if (this.phase() !== 'explore' || this.paused()) {
      this.navigation.moving = false;
      return;
    }
    if (direction.x || direction.y) this.pendingInteraction = null;
    this.navigation.tick(dt, direction);
    const near =
      worldDistance(this.navigation.position, this.point(this.current())) <=
      this.definition.interactionRadius;
    if (near !== this.nearby()) this.nearby.set(near);
    if (this.pendingInteraction === this.current().id && near) {
      this.navigation.stop();
      this.pendingInteraction = null;
      this.openPuzzle();
    }
    if (this.walkingTo && !this.navigation.route.length) {
      this.walkingTo = false;
      if (this.phase() === 'explore')
        this.message.set(
          near
            ? 'You found the mechanism. Press E to inspect it.'
            : 'Explore the courtyard, or follow the gold beacon.',
        );
    }
  }
  input(input: ExpeditionInput): void {
    if (this.paused()) return;
    if (input.type === 'walk' && this.phase() === 'explore') {
      this.pendingInteraction = null;
      this.walkingTo = this.navigation.navigate(input.destination);
      if (!this.walkingTo) this.message.set('Stay on the courtyard paths.');
    }
    if (input.type === 'interact' && this.phase() === 'explore') {
      if (input.stepId !== this.current().id) {
        const index = this.mission.steps.findIndex((step) => step.id === input.stepId);
        if (!this.visitLock(index, false)) return;
      }
      if (this.nearby()) this.openPuzzle();
      else {
        this.pendingInteraction = input.stepId;
        this.walkingTo = this.navigation.navigate(this.point(this.current()));
        this.message.set(`Walking to ${this.current().place}…`);
      }
    }
    if (this.phase() !== 'puzzle') return;
    const p = this.current().puzzle;
    if (
      input.type === 'machine-change' &&
      p.type === 'machine-lock' &&
      validMachineAnswer(p.lock, input.answer)
    ) {
      if (
        this.progress.send({ type: 'checkpoint', stepId: this.current().id, answer: input.answer })
      )
        this.draft.update((d) => ({ ...d, machine: structuredClone(input.answer) }));
      this.message.set('');
    }
    if (
      input.type === 'gear-change' &&
      p.type === 'gear-lock' &&
      validGearDraft(p.lock, input.answer)
    ) {
      this.draft.update((d) => ({ ...d, placements: [...input.answer] }));
      this.message.set('');
    }
    if (
      input.type === 'balance-place' &&
      p.type === 'balance-lock' &&
      Number.isInteger(input.index) &&
      input.index >= 0 &&
      input.index < allBalancePieces(p.lock).length &&
      canPlaceBalanceWeight(p.lock, input.side)
    ) {
      this.draft.update((d) => ({
        ...d,
        placements: balancePlacements(p.lock, d.placements ?? emptyBalance(p.lock)).map(
          (side, i) => (i === input.index ? input.side : side),
        ),
      }));
      this.message.set('');
    }
    if (
      input.type === 'dial' &&
      p.type === 'code' &&
      Number.isInteger(input.index) &&
      input.index >= 0 &&
      input.index < p.labels.length &&
      [-1, 1].includes(input.change)
    ) {
      this.draft.update((d) => ({
        ...d,
        digits: d.digits.map((n, i) => (i === input.index ? (n + input.change + 10) % 10 : n)),
      }));
      this.message.set('');
    }
    if (
      input.type === 'weight' &&
      p.type === 'balance' &&
      Number.isInteger(input.index) &&
      input.index >= 0 &&
      input.index < p.weights.length
    ) {
      this.draft.update((d) => ({
        ...d,
        weights: d.weights.includes(input.index)
          ? d.weights.filter((i) => i !== input.index)
          : [...d.weights, input.index],
      }));
      this.message.set('');
    }
    if (input.type === 'count')
      this.draft.update((d) => ({
        ...d,
        counted: d.counted.includes(input.id)
          ? d.counted.filter((id) => id !== input.id)
          : [...d.counted, input.id],
      }));
  }
  setNumber(value: number | null): void {
    this.draft.update((d) => ({ ...d, quantity: value }));
    this.message.set('');
  }
  setDeparture(value: number): void {
    this.draft.update((d) => ({ ...d, departure: value }));
    this.message.set('');
  }
  inspect(): void {
    this.input({ type: 'interact', stepId: this.current().id });
  }
  private openPuzzle(): void {
    this.phase.set(this.engine().solved.has(this.current().id) ? 'celebrate' : 'puzzle');
    this.message.set('');
    this.navigation.stop();
  }
  closePuzzle(): void {
    this.phase.set('explore');
    this.message.set('Your settings are kept. Come back when you are ready.');
  }
  submit(): 'correct' | 'incorrect' | 'invalid' {
    if (
      this.phase() !== 'puzzle' ||
      this.paused() ||
      worldDistance(this.navigation.position, this.point(this.current())) >
        this.definition.interactionRadius
    )
      return 'invalid';
    const p = this.current().puzzle,
      d = this.draft();
    let answer: EscapeAnswer;
    if (p.type === 'code') answer = p.labels.map((_, i) => d.digits[i]).join('');
    else if (p.type === 'timing') answer = d.departure;
    else if (p.type === 'balance') answer = d.weights;
    else if (p.type === 'machine-lock') answer = d.machine ?? initialMachine(p.lock);
    else if (p.type === 'gear-lock') answer = d.placements ?? emptyGears();
    else if (p.type === 'balance-lock') answer = d.placements ?? emptyBalance(p.lock);
    else {
      if (
        d.quantity === null ||
        !Number.isFinite(d.quantity) ||
        d.quantity < 0 ||
        d.quantity > p.max
      ) {
        this.message.set(`Choose a number from 0 to ${p.max}.`);
        return 'invalid';
      }
      answer = d.quantity;
    }
    if (!this.progress.send({ type: 'submit', stepId: this.current().id, answer })) {
      this.message.set('The attempt could not be saved. Check the save message before continuing.');
      return 'invalid';
    }
    if (this.engine().solved.has(this.current().id)) {
      this.navigation.setSolved(this.engine().solved);
      this.phase.set('celebrate');
      this.celebration.update((n) => n + 1);
      this.message.set('');
      return 'correct';
    }
    const timing =
      p.type === 'timing'
        ? d.departure < p.safeStart || d.departure + p.crossing > p.safeEnd
          ? `You would cross from ${d.departure} to ${d.departure + p.crossing} seconds, while the lookout is watching. `
          : 'Safe, but there is a later departure. '
        : '';
    this.message.set(`${timing}${p.hint}`);
    return 'incorrect';
  }
  next(): void {
    if (this.paused() || this.phase() !== 'celebrate') return;
    const oldId = this.current().id;
    const draft = structuredClone(this.draft());
    if (!this.progress.send({ type: 'continue', stepId: oldId })) return;
    this.drafts.set(oldId, draft);
    this.restoreDraft();
    this.hint.set(false);
    this.nearby.set(false);
    this.navigation.stop();
    this.phase.set(this.engine().complete ? 'complete' : 'explore');
    this.message.set(
      this.engine().complete
        ? 'Every animal is home.'
        : `Next: ${this.current().place}. Follow the beacon.`,
    );
  }
  openJournal(): void {
    this.navigation.stop();
    this.phase.set('journal');
  }
  closeJournal(): void {
    this.phase.set(
      this.engine().complete
        ? 'complete'
        : this.engine().solved.has(this.current().id)
          ? 'celebrate'
          : 'explore',
    );
  }
  reset(): void {
    this.progress.reset();
    this.drafts.clear();
    this.navigation.setSolved(this.engine().solved);
    this.navigation.position = { ...this.definition.spawn };
    this.navigation.stop();
    this.draft.set(blankDraft());
    this.hint.set(false);
    this.nearby.set(false);
    this.message.set('');
    this.phase.set('opening');
    this.pendingInteraction = null;
    this.remotePresence = [];
    this.celebration.set(0);
  }
}
