import data from '../../../../../public/projects/championship-show/project.json';
import { applyCompetitionRequest, createCompetition, finalTeams, leaders } from './competition-engine';
import { createBracket, seedTeams } from './competition-bracket';
import { requireCompetitionConfig } from './competition.validation';
import type { CompetitionCommand, CompetitionConfig, FinalMode } from './competition.models';

const config = requireCompetitionConfig(data);
function rehearsal(mode: FinalMode = 'game-show', count = 4, custom = config) {
  const c: CompetitionConfig = { ...custom, defaultMode: mode, teams: custom.teams.slice(0, count) };
  let state = createCompetition(c); let at = 1000; let id = 0;
  const send = (command: CompetitionCommand) => state = applyCompetitionRequest(c, state, { id: `e${++id}`, at, command });
  const play = () => {
    for (const round of c.rounds) {
      if (round.kind === 'wager') for (const teamId of state.participants) send({ type: 'wager', teamId, points: state.scores[teamId] });
      send({ type: 'open' });
      const answerers = round.kind === 'buzzer' ? state.participants.slice(0, 1) : state.participants;
      if (round.kind === 'buzzer') send({ type: 'buzz', teamId: answerers[0] });
      for (const teamId of answerers) send({ type: 'answer', teamId, text: 'My calculation and reasoning.' });
      send({ type: 'lock' });
      for (const [i, teamId] of answerers.entries()) send({ type: 'score', teamId,
        points: round.kind === 'wager' ? state.wagers[teamId] : round.maxPoints - i });
      send({ type: 'reveal' }); send({ type: 'next' });
    }
    send({ type: 'finish', winnerId: leaders(state)[0], reason: 'Host-led evidence tiebreak.' });
  };
  return { c, send, play, state: () => state, time: (value: number) => at = value };
}
describe('CompetitionShowEngine', () => {
  it('validates packages before launch', () => {
    for (const value of [null, {}, { ...config, teams: [] }, { ...config, rounds: [null] },
      { ...config, rounds: [{ ...config.rounds[0], kind: 'unsupported' }] },
      { ...config, rounds: [{ ...config.rounds[0], standards: [] }] },
      { ...config, teams: [config.teams[0], config.teams[0]] }])
      expect(() => requireCompetitionConfig(value)).toThrow('INVALID_COMPETITION');
  });
  it('uses separated seeding and never matches the top two before the final', () => {
    const bracket = createBracket(config.teams, false);
    expect(bracket.filter(m => m.round === 0).map(m => m.teamIds)).toEqual([
      ['nova', 'pulse'], ['falcons', 'titans'], ['atlas', 'orbit'], ['comets', 'ravens'],
    ]);
    expect(seedTeams([{ ...config.teams[0], qualificationPoints: 0 }, { ...config.teams[1], qualificationPoints: 0 }])[0].id).toBe('atlas');
  });
  it('runs 2–16 team tournaments with byes to a single champion without dead ends', () => {
    const expanded = { ...config, teams: Array.from({ length: 16 }, (_, i) => ({ id: `team-${i + 1}`, name: `Team ${i + 1}`, qualificationPoints: 16 - i })) };
    for (let count = 2; count <= 16; count++) {
      const r = rehearsal('tournament', count, expanded); r.send({ type: 'seed' });
      while (r.state().phase !== 'champion') {
        const match = r.state().matches.find(m => m.status === 'ready'); expect(match).toBeDefined();
        r.send({ type: 'start', matchId: match!.id }); r.play();
      }
      expect(r.state().championId).toBe('team-1');
      expect(r.state().results).toHaveLength(count - 1);
    }
  });
  it('runs eight-team hybrid quarterfinals then one four-team championship with fresh scores', () => {
    const r = rehearsal('hybrid', 8); r.send({ type: 'seed' });
    expect(() => r.send({ type: 'start' })).toThrow('Finish the bracket');
    for (let i = 0; i < 4; i++) { r.send({ type: 'start', matchId: r.state().matches.find(m => m.status === 'ready')!.id }); r.play(); }
    expect(finalTeams(r.state())).toHaveLength(4);
    r.send({ type: 'start' }); expect(Object.values(r.state().scores)).toEqual([0, 0, 0, 0]);
    r.play(); expect(r.state().phase).toBe('champion'); expect(r.state().results).toHaveLength(5);
  });
  it('lets four teams enter hybrid and all-team finals directly', () => {
    for (const mode of ['hybrid', 'game-show'] as const) {
      const r = rehearsal(mode); r.send({ type: 'seed' }); r.send({ type: 'start' }); r.play();
      expect(r.state().championId).toBe('nova'); expect(r.state().evidence).toHaveLength(13);
      expect(r.state().evidence[0]).toMatchObject({ prompt: config.rounds[0].prompt, response: 'My calculation and reasoning.', standards: config.rounds[0].standards });
      expect(r.state().evidence[0]).not.toHaveProperty('points'); expect(r.state().evidence[0]).not.toHaveProperty('rubricScore');
    }
  });
  it('locks answers on time, preserves pause duration, and rejects duplicate answers', () => {
    const r = rehearsal(); r.send({ type: 'seed' }); r.send({ type: 'start' }); r.send({ type: 'open' });
    r.send({ type: 'answer', teamId: 'nova', text: 'Reasoning' });
    expect(() => r.send({ type: 'answer', teamId: 'nova', text: 'Overwrite' })).toThrow('already locked');
    r.time(11000); r.send({ type: 'pause' }); expect(r.state().remainingSeconds).toBe(80);
    expect(() => r.send({ type: 'answer', teamId: 'atlas', text: 'Paused answer' })).toThrow();
    r.time(50000); r.send({ type: 'resume' }); expect(r.state().deadline).toBe(130000);
    r.time(130000); expect(() => r.send({ type: 'answer', teamId: 'atlas', text: 'Late' })).toThrow('time has ended');
  });
  it('requires scoring before reveal and never applies a reveal twice', () => {
    const r = rehearsal(); r.send({ type: 'seed' }); r.send({ type: 'start' }); r.send({ type: 'open' });
    r.send({ type: 'answer', teamId: 'nova', text: 'Evidence' }); r.send({ type: 'lock' });
    expect(() => r.send({ type: 'reveal' })).toThrow('Score each');
    expect(() => r.send({ type: 'score', teamId: 'nova', points: 101 })).toThrow('outside');
    r.send({ type: 'score', teamId: 'nova', points: 100 });
    r.send({ type: 'score', teamId: 'nova', points: 75 });
    const before = structuredClone(r.state());
    const request = { id: 'reveal-request', at: 1000, command: { type: 'reveal' as const } };
    const once = applyCompetitionRequest(r.c, before, request);
    expect(once.scores['nova']).toBe(75); expect(before.scores['nova']).toBe(0);
    expect(applyCompetitionRequest(r.c, once, request)).toBe(once);
    expect(() => applyCompetitionRequest(r.c, once, { ...request, id: 'another' })).toThrow();
  });
  it('records the first buzz and rejects answers from other teams', () => {
    const r = rehearsal('game-show', 4, { ...config, rounds: [config.rounds[1]] });
    r.send({ type: 'seed' }); r.send({ type: 'start' }); r.send({ type: 'open' });
    r.send({ type: 'buzz', teamId: 'atlas' }); r.send({ type: 'buzz', teamId: 'nova' });
    expect(r.state().buzzes).toEqual(['atlas', 'nova']);
    expect(() => r.send({ type: 'answer', teamId: 'nova', text: 'No' })).toThrow('first team');
    r.send({ type: 'answer', teamId: 'atlas', text: 'My explanation' });
  });
  it('locks wagers before opening, rejects excess risk and applies missed wagers', () => {
    const r = rehearsal('game-show', 2, { ...config, rounds: [config.rounds[0], config.rounds[3]] });
    r.send({ type: 'seed' }); r.send({ type: 'start' }); r.send({ type: 'open' });
    r.send({ type: 'answer', teamId: 'nova', text: 'Calculation' }); r.send({ type: 'lock' });
    r.send({ type: 'score', teamId: 'nova', points: 100 }); r.send({ type: 'reveal' }); r.send({ type: 'next' });
    expect(() => r.send({ type: 'open' })).toThrow('Lock every');
    expect(() => r.send({ type: 'wager', teamId: 'nova', points: 101 })).toThrow('between zero');
    r.send({ type: 'wager', teamId: 'nova', points: 50 });
    expect(() => r.send({ type: 'wager', teamId: 'nova', points: 0 })).toThrow('already locked');
    r.send({ type: 'wager', teamId: 'atlas', points: 0 });
    r.send({ type: 'open' }); r.send({ type: 'lock' }); r.send({ type: 'reveal' }); expect(r.state().scores['nova']).toBe(50);
  });
  it('requires a documented tiebreak and rejects lower-scoring winners', () => {
    const r = rehearsal('game-show', 2, { ...config, rounds: [config.rounds[0]] });
    r.send({ type: 'seed' }); r.send({ type: 'start' }); r.send({ type: 'open' });
    r.send({ type: 'lock' }); r.send({ type: 'reveal' }); r.send({ type: 'next' });
    expect(() => r.send({ type: 'finish', winnerId: 'nova', reason: '' })).toThrow('tiebreak');
    expect(() => r.send({ type: 'finish', winnerId: 'outsider', reason: 'Teacher choice' })).toThrow('highest score');
    r.send({ type: 'finish', winnerId: 'atlas', reason: 'Stronger evidence in oral tiebreak.' });
    expect(r.state().championId).toBe('atlas');
  });
  it('reuses the same engine for a different subject without changing behavior', () => {
    const history: CompetitionConfig = { ...config, projectId: 'history-defense-fixture', title: 'Source Defense', rounds: [
      { id: 'source-defense', title: 'Defend the source', kind: 'simultaneous', prompt: 'Which source best supports your historical claim? Explain its perspective.', seconds: 120, maxPoints: 10, standards: ['historical-source-reasoning'] },
    ] };
    const r = rehearsal('tournament', 2, history); r.send({ type: 'seed' }); r.send({ type: 'start', matchId: r.state().matches[0].id }); r.play();
    expect(r.state().evidence[0].projectId).toBe(history.projectId);
    expect(r.state().evidence[0].standards).toEqual(['historical-source-reasoning']); expect(r.state().phase).toBe('champion');
  });
});
