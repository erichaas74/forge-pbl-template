import marketData from '../../../../../public/projects/live-strategy-league/project.json';
import { applyLeagueCommand, createLeague, decisionError, freshDecision, requireLeagueConfig, standings } from './league-engine';
import { requireLeagueModel } from './league-calculations';
import type { LeagueConfig } from './league.models';

const market = requireLeagueConfig(marketData);
const survival: LeagueConfig = {
  ...market, projectId: 'resource-survival-fixture', title: 'Resource Survival League', modelId: 'resource-v1',
  initialState: { reserve: 300, wellbeing: 0, protected: 0 },
  metrics: [{ id: 'reserve', label: 'Supplies', unit: '' }, { id: 'wellbeing', label: 'Wellbeing', unit: '' }, { id: 'protected', label: 'Protected', unit: '' }],
  decisions: ['water', 'food', 'shelter'].map(id => ({ id, label: id, unit: 'supplies', min: 0, max: 30, step: 1, initial: 10 })),
  rounds: market.rounds.map((r, i) => ({ ...r, world: { rainfall: i === 2 ? 0.5 : 1, exposure: 15 } })),
};

describe('Live Strategy League practice engine', () => {
  it('rejects invalid or unsupported project packages before starting', () => {
    expect(() => requireLeagueConfig(null)).toThrow('INVALID_LEAGUE_CONFIG');
    expect(() => requireLeagueConfig({ ...market, decisions: [null] })).toThrow('INVALID_LEAGUE_CONFIG');
    expect(() => requireLeagueConfig({ ...market, modelId: 'unknown' })).toThrow('CAPABILITY_NOT_INSTALLED');
    expect(() => requireLeagueConfig({ ...market, rounds: [] })).toThrow('INVALID_LEAGUE_CONFIG');
    expect(() => requireLeagueConfig({ ...market, initialState: {} })).toThrow('INVALID_LEAGUE_CONFIG');
  });

  it('keeps the source snapshot immutable and refuses early calculations', () => {
    const initial = createLeague(market);
    const open = applyLeagueCommand(market, initial, { type: 'start' }, 1000);
    expect(initial.phase).toBe('preview');
    expect(open.deadline).toBe(181000);
    expect(() => applyLeagueCommand(market, open, { type: 'calculate' }, 2000)).toThrow();
  });

  it('validates steps, non-finite values, resource constraints and predictions', () => {
    const state = createLeague(market);
    const d = freshDecision(market);
    d.values['production'] = 51;
    expect(decisionError(market, state, d)).toContain('steps');
    d.values['production'] = Infinity;
    expect(decisionError(market, state, d)).toBeTruthy();
    d.values['production'] = 1000; d.values['marketing'] = 2000;
    state.teams[0].state['cash'] = 100;
    expect(decisionError(market, state, d)).toContain('resources');
    d.prediction = NaN;
    expect(decisionError(market, state, d)).toContain('prediction');
  });

  it('stores reasoning and lock time, locks simulated teams, and prevents editing or duplicate scoring', () => {
    const d = { ...freshDecision(market), prediction: 1000, reasoning: 'Demand supports 500 units.' };
    let s = applyLeagueCommand(market, createLeague(market), { type: 'start' }, 1000);
    s = applyLeagueCommand(market, s, { type: 'lock', decision: d }, 2000);
    expect(s.teams.every(t => t.decision.lockedAt === 2000)).toBe(true);
    expect(() => applyLeagueCommand(market, s, { type: 'draft', decision: d }, 2100)).toThrow();
    s = applyLeagueCommand(market, s, { type: 'calculate' }, 3000);
    expect(s.teams[0].score).toBe(0);
    expect(s.history).toHaveLength(0);
    expect(() => applyLeagueCommand(market, s, { type: 'calculate' }, 3001)).toThrow();
    s = applyLeagueCommand(market, s, { type: 'reveal' }, 4000);
    expect(s.teams[0].score).toBe(5500);
    expect(s.history[0].teams.find(t => t.id === s.teams[0].id)?.decision.reasoning).toBe(d.reasoning);
    expect(() => applyLeagueCommand(market, s, { type: 'reveal' }, 4100)).toThrow();
    const next = applyLeagueCommand(market, s, { type: 'next' }, 4200);
    expect(next.teams[0].decision.values).toEqual(d.values);
    expect(next.teams[0].decision.lockedAt).toBeUndefined();
  });

  it('enforces deadlines and preserves remaining time across pause, extension and resume', () => {
    let s = applyLeagueCommand(market, createLeague(market), { type: 'start' }, 1000);
    expect(() => applyLeagueCommand(market, s, { type: 'lock', decision: freshDecision(market) }, 181000)).toThrow('deadline');
    s = applyLeagueCommand(market, s, { type: 'pause' }, 61000);
    expect(s.pausedSeconds).toBe(120);
    expect(() => applyLeagueCommand(market, s, { type: 'lock', decision: freshDecision(market) }, 62000)).toThrow('paused');
    s = applyLeagueCommand(market, s, { type: 'extend' }, 65000);
    s = applyLeagueCommand(market, s, { type: 'resume' }, 100000);
    expect(s.deadline).toBe(280000);
  });

  it('uses a saved draft at close and generates affordable decisions for depleted teams', () => {
    let s = applyLeagueCommand(market, createLeague(market), { type: 'start' }, 1000);
    const d = freshDecision(market); d.values['production'] = 100;
    s = applyLeagueCommand(market, s, { type: 'draft', decision: d }, 2000);
    s.teams[2].state['cash'] = 0;
    s = applyLeagueCommand(market, s, { type: 'close' }, 181000);
    expect(s.teams[0].decision.values['production']).toBe(100);
    expect(s.teams[2].decision.values['production']).toBe(0);
    expect(s.teams[2].decision.values['marketing']).toBe(0);
  });

  it('changes outcomes when world conditions change, without mutating previous resources', () => {
    const model = requireLeagueModel('market-v1');
    const state = { ...market.initialState };
    const d = freshDecision(market).values;
    const a = model.calculate(state, d, { demand: 900, cost: 8 });
    const b = model.calculate(state, d, { demand: 900, cost: 12 });
    expect(a.scoreDelta - b.scoreDelta).toBe(2000);
    expect(state['cash']).toBe(10000);
    expect(model.calculate(state, d, { demand: 900, cost: 8 })).toEqual(a);
  });

  for (const config of [market, survival]) {
    it(`runs four rounds and names a stable winner with ${config.modelId} on the same engine`, () => {
      requireLeagueConfig(config);
      let s = createLeague(config);
      for (let round = 0; round < 4; round++) {
        s = applyLeagueCommand(config, s, { type: 'start' }, 1000);
        s = applyLeagueCommand(config, s, { type: 'close' }, 2000);
        s = applyLeagueCommand(config, s, { type: 'calculate' }, 3000);
        s = applyLeagueCommand(config, s, { type: 'reveal' }, 4000);
        if (round < 3) s = applyLeagueCommand(config, s, { type: 'next' }, 5000);
      }
      expect(s.phase).toBe('complete'); expect(s.history).toHaveLength(4);
      expect(standings(s.teams)[0].score).toBe(Math.max(...s.teams.map(t => t.score)));
      expect(s.teams.every(t => Object.values(t.state).every(Number.isFinite))).toBe(true);
      expect(() => applyLeagueCommand(config, s, { type: 'next' }, 6000)).toThrow();
      const restarted = applyLeagueCommand(config, s, { type: 'restart' }, 6000);
      expect(restarted.phase).toBe('preview');
      expect(restarted.history).toEqual([]);
      expect(restarted.revision).toBe(s.revision + 1);
    });
  }
});
