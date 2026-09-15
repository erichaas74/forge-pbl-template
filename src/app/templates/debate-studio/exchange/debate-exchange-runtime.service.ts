import { computed, inject, Injectable, InjectionToken, signal } from '@angular/core';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import { DEBATE_STUDIO_CONFIG } from '../runtime/debate-studio.tokens';
import { applyExchangeCommand, emptyDraft, emptyExchange, rankDebatePerformers, validateExchangeConfig, type DebateContribution, type DebateCritique, type DebateDraft, type DebateExchangeState, type DebateJudgment, type ExchangeCommand } from './debate-exchange.models';
import { DEBATE_EXCHANGE_PORT, exchangeFile, importExchangeFile } from './debate-exchange.persistence';

export const DEBATE_EXCHANGE_EXAMPLE = new InjectionToken<boolean>('DEBATE_EXCHANGE_EXAMPLE', { factory: () => false });

@Injectable()
export class DebateExchangeRuntime {
  readonly config = inject(DEBATE_STUDIO_CONFIG);
  readonly port = inject(DEBATE_EXCHANGE_PORT);
  private readonly focus = inject(PROJECT_LESSON_FOCUS, { optional: true });
  private readonly example = inject(DEBATE_EXCHANGE_EXAMPLE);
  readonly practice = signal(false);
  readonly state = signal<DebateExchangeState>(emptyExchange());
  readonly drafts = signal<Readonly<Record<string, DebateDraft>>>({});
  readonly message = signal('');
  readonly lesson = computed(() => this.config.exchange!.lessons[(this.focus?.()?.number ?? (this.example ? 8 : 1)) - 1]);
  readonly actorId = this.config.viewer.studentId;
  readonly own = computed(() => this.state().contributions.filter(entry => entry.actorId === this.actorId));
  readonly side = computed(() => this.own()[0]?.side ?? this.drafts()['identity']?.side ?? '');
  readonly draft = computed(() => this.drafts()[String(this.lesson().number)] ?? emptyDraft(this.side()));
  readonly ranks = computed(() => rankDebatePerformers(this.state()));
  readonly latestBallot = computed(() => this.state().ballots.filter(ballot => ballot.actorId === this.actorId).sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id)).at(-1));
  readonly peers = computed(() => this.state().contributions.filter(entry => entry.side === this.side() && entry.actorId !== this.actorId));
  readonly opponents = computed(() => this.state().contributions.filter(entry => entry.side !== this.side()));
  readonly received = computed(() => this.state().critiques.filter(review => this.own().some(entry => entry.id === review.contributionId)));
  readonly performers = computed(() => [...new Map(this.state().contributions.filter(entry => entry.actorId !== this.actorId).map(entry => [entry.actorId, entry])).values()]);
  constructor() { validateExchangeConfig(this.config); this.restore(false); if (this.example) this.openPractice(); }
  private restore(practice: boolean): void {
    try {
      const state = this.port.load(practice);
      const drafts = this.port.loadDrafts(practice);
      this.state.set(state); this.drafts.set(drafts); this.practice.set(practice);
      this.message.set('');
    } catch (error) { this.report(error); }
  }
  report(error: unknown): void { this.message.set(error instanceof Error ? error.message : 'The action could not be completed.'); }
  updateDraft(change: Partial<DebateDraft>): void {
    const drafts = { ...this.drafts(), [this.lesson().number]: { ...this.draft(), ...change } };
    this.drafts.set(drafts);
    try { this.port.saveDrafts(drafts, this.practice()); this.message.set('Draft saved in this browser.'); } catch (error) { this.report(error); }
  }
  saveContext(key: string, speech: string): void {
    const drafts = { ...this.drafts(), [key]: { ...emptyDraft(this.side()), speech } };
    this.drafts.set(drafts);
    try { this.port.saveDrafts(drafts, this.practice()); this.message.set('Context response saved privately in this browser. Teacher review required.'); } catch (error) { this.report(error); }
  }
  chooseSide(side: string): void {
    if (this.own().length) { this.message.set('Your submitted side stays with this debate.'); return; }
    this.drafts.update(drafts => Object.fromEntries([...Object.entries(drafts).map(([key, draft]) => [key, { ...draft, side }]), ['identity', emptyDraft(side)]]));
    this.updateDraft({ side });
  }
  toggleSource(id: string): void {
    const ids = this.draft().evidenceIds;
    this.updateDraft({ evidenceIds: ids.includes(id) ? ids.filter(source => source !== id) : [...ids, id] });
  }
  movePoint(index: number, direction: number): void {
    const points = [...this.draft().points]; const target = index + direction;
    if (target < 0 || target >= points.length) return;
    [points[index], points[target]] = [points[target], points[index]];
    this.updateDraft({ points });
  }
  revise(entry: DebateContribution): void {
    if (entry.actorId !== this.actorId) return;
    this.updateDraft({ ...entry, revises: entry.id, reviewIds: [], changeNote: '', mediaId: undefined, mediaType: undefined, mediaReviewed: false });
  }
  dispatch(command: ExchangeCommand): boolean {
    try {
      const next = applyExchangeCommand(this.state(), command, this.config);
      // Keep unsaved state visible and exportable if storage fails.
      this.state.set(next);
      try {
        this.port.save(next, this.practice());
        this.message.set(this.practice() ? 'Saved in the practice debate.' : 'Saved locally. Export the exchange to share it with your class.');
      } catch { this.message.set('Submitted in memory only. Browser save failed; export your exchange before leaving.'); }
      return true;
    } catch (error) { this.report(error); return false; }
  }
  submit(): boolean {
    const mode = this.lesson().mode;
    const draft = this.draft();
    const contribution: DebateContribution = {
      ...draft, side: this.side(), id: crypto.randomUUID(), actorId: this.actorId,
      name: this.config.viewer.studentDisplayName, lesson: this.lesson().number,
      kind: mode === 'opening' ? 'opening' : mode === 'refine' ? 'revision' : mode === 'final' ? 'closing' : 'response',
      group: this.lesson().number % 2 === 0 ? draft.group : '', createdAt: new Date().toISOString(),
    };
    return this.dispatch({ type: 'debate.exchange.submit', value: contribution });
  }
  critique(value: Omit<DebateCritique, 'id' | 'actorId' | 'name' | 'createdAt'>): boolean {
    return this.dispatch({ type: 'debate.exchange.critique', value: { ...value, id: crypto.randomUUID(), actorId: this.actorId, name: this.config.viewer.studentDisplayName, createdAt: new Date().toISOString() } });
  }
  rank(judgments: readonly DebateJudgment[]): boolean {
    return this.dispatch({ type: 'debate.exchange.rank', value: { id: crypto.randomUUID(), actorId: this.actorId, judgments, createdAt: new Date().toISOString() } });
  }
  exportFile(): string { return exchangeFile(this.config, this.state()); }
  importFile(raw: string): void {
    try {
      if (this.practice()) throw new Error('Return to your classroom workspace before importing a class exchange.');
      const next = importExchangeFile(this.config, this.state(), raw);
      this.state.set(next); this.port.save(next, false);
      this.message.set('Exchange imported. Arguments and feedback are ready to review.');
    } catch (error) { this.report(error); }
  }
  openPractice(): void {
    this.restore(true);
    if (!this.practice() || this.state().contributions.length) return;
    let state = emptyExchange();
    const date = new Date().toISOString();
    this.config.exchange!.examples.forEach((example, index) => {
      state = applyExchangeCommand(state, { type: 'debate.exchange.submit', value: { ...emptyDraft(example.side), ...example, id: `example-${index}`, actorId: `example-speaker-${index}`, lesson: 1, kind: 'opening', createdAt: date } }, this.config);
    });
    const example = this.config.exchange!.examples[0];
    const own: DebateContribution = { ...emptyDraft(example.side), ...example, id: 'example-own', actorId: this.actorId, name: `${this.config.viewer.studentDisplayName} · practice`, lesson: 1, kind: 'opening', createdAt: date };
    state = applyExchangeCommand(state, { type: 'debate.exchange.submit', value: own }, this.config);
    state = applyExchangeCommand(state, { type: 'debate.exchange.critique', value: { id: 'example-feedback', actorId: 'example-speaker-0', name: example.name, contributionId: own.id, moment: own.speech, strength: 'Your claim stays close to a named source.', suggestion: 'Answer the opposing side’s strongest point and explain what this source cannot prove.', ratings: { evidence: 3, reasoning: 3, response: 1 }, createdAt: date } }, this.config);
    this.state.set(state);
    try { this.port.save(state, true); this.message.set('Fictional practice debate opened. Classroom work is separate.'); } catch (error) { this.report(error); }
  }
  closePractice(): void { this.restore(false); }
}
