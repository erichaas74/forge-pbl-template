import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DebateExchangeRuntime } from './debate-exchange-runtime.service';
import { debateCriteria, type DebateContribution, type DebateCriterion, type DebateJudgment, type DebateRatings } from './debate-exchange.models';
import type { DebateEvidence } from '../domain/debate-studio.models';
import { DebateAuthorComponent } from './debate-author.component';
import { DebateRecordingComponent } from './debate-recording.component';

@Component({
  selector: 'app-debate-exchange',
  imports: [FormsModule, DebateAuthorComponent, DebateRecordingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './debate-exchange.component.html',
  styleUrl: './debate-exchange.component.scss',
})
export class DebateExchangeComponent {
  readonly runtime = inject(DebateExchangeRuntime);
  readonly config = this.runtime.config;
  readonly view = signal<'debate' | 'case' | 'critique' | 'judging'>('debate');
  readonly selectedId = signal('');
  readonly source = signal<DebateEvidence | undefined>(undefined);
  readonly skillChoice = signal<number | undefined>(undefined);
  readonly authorOpen = signal(false);
  readonly reading = signal(false);
  readonly criteria = debateCriteria;
  readonly ratings = signal<DebateRatings>({ evidence: 2, reasoning: 2, response: 2 });
  readonly criterionHelp: Readonly<Record<DebateCriterion, string>> = {
    evidence: '1 Unsupported · 2 Source named · 3 Relevant source explained · 4 Source weighed with its limits',
    reasoning: '1 Assertion · 2 Partial link · 3 Clear claim–evidence link · 4 Coherent case with limitations',
    response: '1 No response · 2 Mentions an objection · 3 Answers fairly · 4 Answers the strongest objection with evidence',
  };
  readonly critiqueTarget = signal<DebateContribution | undefined>(undefined);
  readonly moment = signal('');
  readonly strength = signal('');
  readonly suggestion = signal('');
  readonly judgmentTarget = signal<DebateContribution | undefined>(undefined);
  readonly reason = signal('');
  readonly ballot = signal<readonly DebateJudgment[]>([]);
  readonly entries = computed(() => this.view() === 'critique' ? this.runtime.peers() : this.runtime.state().contributions);
  readonly selected = computed(() => this.entries().find(entry => entry.id === this.selectedId()) ?? this.entries().filter(entry => entry.lesson <= this.runtime.lesson().number).at(-1) ?? this.entries().at(-1));
  readonly feedback = computed(() => this.runtime.state().critiques.filter(review => review.contributionId === this.selected()?.id));
  readonly contextId = signal('');
  readonly contextTarget = computed(() => this.config.inquiry?.targets.find(target => target.id === this.contextId()) ?? this.config.inquiry?.targets[0]);
  readonly contextDraft = computed(() => this.runtime.drafts()[`context-${this.contextTarget()?.id}`]?.speech ?? '');
  constructor() {
    effect(() => { this.runtime.lesson(); this.skillChoice.set(undefined); });
    effect(() => { this.runtime.practice(); this.selectedId.set(''); });
    effect(() => { this.runtime.practice(); this.ballot.set(this.runtime.latestBallot()?.judgments ?? []); });
    inject(DestroyRef).onDestroy(() => { if (this.reading()) globalThis.speechSynthesis?.cancel(); });
  }
  factionName(id: string): string { return this.config.factions.find(faction => faction.id === id)?.shortName ?? id; }
  author(id: string | undefined): string { return this.runtime.state().contributions.find(entry => entry.id === id)?.name ?? 'Argument'; }
  sourceName(id: string): string { return this.config.evidence.find(source => source.id === id)?.title ?? id; }
  inspectSource(id: string, dialog: HTMLDialogElement): void { this.source.set(this.config.evidence.find(source => source.id === id)); dialog.showModal(); }
  hearPrompt(): void {
    if (!globalThis.speechSynthesis) { this.runtime.message.set('Spoken playback is unavailable. Read the debate prompt or have it read aloud.'); return; }
    if (this.reading()) { speechSynthesis.cancel(); this.reading.set(false); return; }
    const utterance = new SpeechSynthesisUtterance(this.config.centralQuestion);
    utterance.onend = () => this.reading.set(false);
    utterance.onerror = () => { this.reading.set(false); this.runtime.message.set('Prompt playback unavailable. The prompt remains visible.'); };
    this.reading.set(true); speechSynthesis.speak(utterance);
  }
  openAuthor(dialog: HTMLDialogElement): void { this.authorOpen.set(true); dialog.showModal(); }
  prepareCritique(entry: DebateContribution, dialog: HTMLDialogElement): void {
    this.critiqueTarget.set(entry); this.moment.set(''); this.strength.set(''); this.suggestion.set('');
    this.ratings.set({ evidence: 2, reasoning: 2, response: 2 }); dialog.showModal();
  }
  rate(criterion: DebateCriterion, value: string): void { this.ratings.update(ratings => ({ ...ratings, [criterion]: Number(value) })); }
  submitCritique(dialog: HTMLDialogElement): void {
    const target = this.critiqueTarget(); if (!target) return;
    if (this.runtime.critique({ contributionId: target.id, moment: this.moment(), strength: this.strength(), suggestion: this.suggestion(), ratings: this.ratings() })) dialog.close();
  }
  prepareJudgment(entry: DebateContribution, dialog: HTMLDialogElement): void {
    this.judgmentTarget.set(entry);
    const prior = this.ballot().find(judgment => judgment.performerId === entry.actorId);
    this.ratings.set(prior?.ratings ?? { evidence: 2, reasoning: 2, response: 2 }); this.reason.set(prior?.reason ?? ''); dialog.showModal();
  }
  saveJudgment(dialog: HTMLDialogElement): void {
    const target = this.judgmentTarget(); if (!target || !this.reason().trim()) return;
    const judgment = { performerId: target.actorId, contributionId: target.id, ratings: this.ratings(), reason: this.reason().trim() };
    const prior = this.ballot().findIndex(entry => entry.performerId === target.actorId);
    if (prior < 0 && this.ballot().length === 3) { this.runtime.message.set('Remove a performer before adding another; rank up to three.'); return; }
    this.ballot.update(ballot => prior < 0 ? [...ballot, judgment] : ballot.map((entry, index) => index === prior ? judgment : entry));
    dialog.close();
  }
  moveRank(index: number, delta: number): void {
    const next = [...this.ballot()]; const target = index + delta; if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]]; this.ballot.set(next);
  }
  removeRank(id: string): void { this.ballot.update(ballot => ballot.filter(entry => entry.performerId !== id)); }
  exportExchange(): void {
    if (this.runtime.practice()) { this.runtime.message.set('Practice examples stay separate. Return to your classroom workspace to export.'); return; }
    const url = URL.createObjectURL(new Blob([this.runtime.exportFile()], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = `${this.config.projectId}-exchange.json`; link.click(); URL.revokeObjectURL(url);
  }
  async importExchange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement; const file = input.files?.[0];
    try { if (file) { if (file.size > 4_000_000) throw new Error('Choose an exchange file under 4 MB.'); this.runtime.importFile(await file.text()); } }
    catch (error) { this.runtime.report(error); } finally { input.value = ''; }
  }
  saveContext(text: string): void { this.runtime.saveContext(`context-${this.contextTarget()?.id}`, text); }
}
