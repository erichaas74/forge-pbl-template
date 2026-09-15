import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { describe, expect, it, afterEach } from 'vitest';
import { romanSenateDebateConfig as roman } from '../../../projects/roman-senate-debate/roman-senate-debate.config';
import { hammurabiOnTrialConfig as hammurabi } from '../../../projects/hammurabi-on-trial/hammurabi-on-trial.config';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../../../shared/project-lessons/project-lesson.models';
import { projectLessonRegistry } from '../../../runtime/project-launch/project-lesson.registry';
import { DEBATE_STUDIO_CONFIG } from '../runtime/debate-studio.tokens';
import { applyExchangeCommand, emptyDraft, emptyExchange, rankDebatePerformers, validateExchangeConfig, type DebateContribution, type DebateCritique, type DebateExchangeState, type DebateJudgment } from './debate-exchange.models';
import { BrowserDebateExchangeAdapter, DEBATE_EXCHANGE_PORT, exchangeFile, importExchangeFile } from './debate-exchange.persistence';
import { DebateExchangeRuntime } from './debate-exchange-runtime.service';
import { DebateExchangeComponent } from './debate-exchange.component';

const now = '2026-09-15T12:00:00.000Z';
function opening(id: string, actorId = id, side = roman.factions[0].id): DebateContribution {
  return { ...emptyDraft(side), id, actorId, name: actorId, lesson: 1, kind: 'opening', points: ['A limited claim'], speech: 'A limited claim. Evidence supports it.', evidenceIds: [roman.evidence[0].id], createdAt: now };
}
function submit(state: DebateExchangeState, entry: DebateContribution): DebateExchangeState { return applyExchangeCommand(state, { type: 'debate.exchange.submit', value: entry }, roman); }
function review(): DebateCritique { return { id: 'review', actorId: 'peer', name: 'Peer', contributionId: 'me', moment: 'A limited claim.', strength: 'Names a limited claim.', suggestion: 'Explain the source limits.', ratings: { evidence: 3, reasoning: 2, response: 1 }, createdAt: now }; }
class TestStorage implements Storage {
  private readonly values = new Map<string, string>();
  get length(): number { return this.values.size; }
  clear(): void { this.values.clear(); }
  getItem(key: string): string | null { return this.values.get(key) ?? null; }
  key(index: number): string | null { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string): void { this.values.delete(key); }
  setItem(key: string, value: string): void { this.values.set(key, value); }
}
const scope = { tenantId: 'test-tenant', projectId: roman.projectId, projectVersion: roman.projectVersion, classId: 'class', actorId: 'me' };
afterEach(() => TestBed.resetTestingModule());

describe('debate exchange cycle', () => {
  it('validates both eight-session projects and rejects invalid source references', () => {
    for (const config of [roman, hammurabi]) {
      expect(() => validateExchangeConfig(config)).not.toThrow();
      expect(config.exchange!.lessons.map(lesson => lesson.mode)).toEqual(['opening', 'exchange', 'refine', 'exchange', 'refine', 'exchange', 'refine', 'final']);
      expect(projectLessonRegistry.find(config.projectId, config.projectVersion)?.planVersion).toBe('2.0.0');
    }
    expect(() => validateExchangeConfig({ ...roman, exchange: { ...roman.exchange!, lessons: roman.exchange!.lessons.map(lesson => ({ ...lesson, sourceIds: ['missing'] })) } })).toThrow(/source/);
  });
  it('keeps linked opposing exchanges, feedback and revisions without overwriting earlier work', () => {
    let state = submit(submit(submit(emptyExchange(), opening('me')), opening('peer')), opening('opponent', 'opponent', roman.factions[1].id));
    state = applyExchangeCommand(state, { type: 'debate.exchange.critique', value: review() }, roman);
    state = submit(state, { ...opening('reply', 'me'), lesson: 2, kind: 'response', replyTo: 'opponent', speech: 'I answer the strongest objection with evidence.' });
    state = submit(state, { ...opening('revision', 'me'), lesson: 3, kind: 'revision', revises: 'me', reviewIds: ['review'], changeNote: 'Limited the source claim after the critique.', speech: 'A narrower claim with the source limits explained.' });
    expect(state.contributions.find(entry => entry.id === 'me')?.speech).toBe('A limited claim. Evidence supports it.');
    expect(state.contributions.at(-1)?.reviewIds).toEqual(['review']);
    expect(submit(state, state.contributions.at(-1)!)).toBe(state);
    const packet = exchangeFile(roman, state);
    expect(importExchangeFile(roman, emptyExchange(), packet)).toEqual(state);
    expect(importExchangeFile(roman, state, packet)).toEqual(state);
  });
  it('rejects self or opposing-side critiques, invented moments and wrong reply targets', () => {
    const state = submit(submit(submit(emptyExchange(), opening('me')), opening('peer')), opening('opponent', 'opponent', roman.factions[1].id));
    for (const change of [{ actorId: 'me' }, { actorId: 'opponent' }, { moment: 'Invented quotation' }]) expect(() => applyExchangeCommand(state, { type: 'debate.exchange.critique', value: { ...review(), ...change } }, roman)).toThrow();
    expect(() => submit(state, { ...opening('reply', 'me'), lesson: 2, kind: 'response', replyTo: 'peer' })).toThrow(/opposing/);
    expect(() => submit(state, { ...opening('revision', 'me'), lesson: 3, kind: 'revision', revises: 'peer', changeNote: 'Changed it' })).toThrow(/earlier/);
  });
  it('counts each voter’s latest ballot, preserves ties, and excludes self-ranking', () => {
    let state = submit(submit(emptyExchange(), opening('a')), opening('b', 'b', roman.factions[1].id));
    const judgment = (performerId: string): DebateJudgment => ({ performerId, contributionId: performerId, ratings: { evidence: 3, reasoning: 3, response: 2 }, reason: 'Uses a source and explains its limits.' });
    state = applyExchangeCommand(state, { type: 'debate.exchange.rank', value: { id: 'ballot1', actorId: 'voter1', judgments: [judgment('a')], createdAt: now } }, roman);
    state = applyExchangeCommand(state, { type: 'debate.exchange.rank', value: { id: 'ballot2', actorId: 'voter2', judgments: [judgment('b')], createdAt: now } }, roman);
    expect(rankDebatePerformers(state).map(rank => [rank.place, rank.points])).toEqual([[1, 3], [1, 3]]);
    state = applyExchangeCommand(state, { type: 'debate.exchange.rank', value: { id: 'ballot3', actorId: 'voter1', judgments: [judgment('b')], createdAt: '2026-09-15T13:00:00.000Z' } }, roman);
    expect(rankDebatePerformers(state)).toHaveLength(1);
    expect(rankDebatePerformers(state)[0].points).toBe(6);
    expect(() => applyExchangeCommand(state, { type: 'debate.exchange.rank', value: { id: 'self', actorId: 'a', judgments: [judgment('a')], createdAt: now } }, roman)).toThrow(/yourself/);
  });
  it('requires explicit recording review and validates imported work atomically', () => {
    expect(() => submit(emptyExchange(), { ...opening('me'), mediaId: 'media', mediaReviewed: false })).toThrow(/review/);
    const state = submit(emptyExchange(), opening('me'));
    const conflict = exchangeFile(roman, { ...state, contributions: [{ ...opening('me'), speech: 'Replacement' }] });
    expect(() => importExchangeFile(roman, state, conflict)).toThrow(/different work/);
    expect(state.contributions[0].speech).toBe('A limited claim. Evidence supports it.');
    expect(() => importExchangeFile(hammurabi, emptyExchange(), exchangeFile(roman, state))).toThrow(/project and version/);
    expect(() => importExchangeFile(roman, state, JSON.stringify({ format: 'forge-debate-exchange', projectId: roman.projectId, projectVersion: roman.projectVersion, state: { schemaVersion: '1.0', contributions: [null], critiques: [], ballots: [] } }))).toThrow(/imported/);
  });
  it('isolates project, tenant, class, actor, attempt, practice and private drafts', () => {
    const storage = new TestStorage(); const adapter = new BrowserDebateExchangeAdapter(roman, scope, storage);
    const state = submit(emptyExchange(), opening('me')); adapter.save(state, false);
    adapter.saveDrafts({ '1': { ...emptyDraft(), speech: 'Private writing' } }, false);
    expect(new BrowserDebateExchangeAdapter(roman, scope, storage).load(false)).toEqual(state);
    expect(adapter.load(true).contributions).toHaveLength(0);
    for (const change of [{ tenantId: 'other' }, { projectId: 'other' }, { projectVersion: '9.0.0' }, { classId: 'other' }, { actorId: 'other' }, { attemptId: 'other' }]) {
      const other = new BrowserDebateExchangeAdapter(roman, { ...scope, ...change }, storage);
      expect(other.load(false).contributions).toHaveLength(0); expect(other.loadDrafts(false)).toEqual({});
    }
    expect(exchangeFile(roman, state)).not.toContain('Private writing');
  });
});

describe('debate exchange activity', () => {
  for (const config of [roman, hammurabi]) {
    it(`opens all eight ${config.projectId} sessions without completing earlier work`, async () => {
      const plan = projectLessonRegistry.find(config.projectId, config.projectVersion)!;
      const focus = signal<ProjectLesson | undefined>(plan.lessons[0]);
      await TestBed.configureTestingModule({ imports: [DebateExchangeComponent], providers: [
        { provide: DEBATE_STUDIO_CONFIG, useValue: config },
        { provide: DEBATE_EXCHANGE_PORT, useValue: new BrowserDebateExchangeAdapter(config, { ...scope, projectId: config.projectId, projectVersion: config.projectVersion }, new TestStorage()) },
        { provide: PROJECT_LESSON_FOCUS, useValue: focus }, DebateExchangeRuntime,
      ] }).compileComponents();
      const fixture = TestBed.createComponent(DebateExchangeComponent);
      for (const lesson of plan.lessons) {
        focus.set(lesson); fixture.detectChanges(); await fixture.whenStable();
        const element: HTMLElement = fixture.nativeElement;
        expect(element.querySelector('main')?.getAttribute('data-session')).toBe(String(lesson.number));
        expect(element.querySelector('.task-box')?.textContent).toContain(config.exchange!.lessons[lesson.number - 1].title);
        expect(element.querySelector('main textarea, main input[type=text]')).toBeNull();
        expect(element.querySelector('.tutor-box')?.textContent).toContain('Disconnected');
      }
      const runtime = TestBed.inject(DebateExchangeRuntime);
      runtime.openPractice(); fixture.detectChanges();
      expect(runtime.peers().length).toBeGreaterThan(0); expect(runtime.received()).toHaveLength(1);
      runtime.closePractice(); fixture.detectChanges(); expect(runtime.state().contributions).toHaveLength(0);
    });
  }
});
