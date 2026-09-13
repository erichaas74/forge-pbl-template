import data from '../../../../public/projects/shadow-gallery/versions/1.1.0/project.json';
import { encounterActions, encounterReady, initialEncounterState, transitionEncounter } from './encounter.engine';
import type { EncounterAction, EncounterDefinition } from './encounter.models';
import { requireEncounters } from './encounter.validation';

const sources = new Set(data.evidence.map(e => e.id)), chambers = new Set(data.chambers.map(c => c.id));
const definition = requireEncounters(data.encounters, sources, chambers)[0];
function progress(d: EncounterDefinition) {
  let state = initialEncounterState(d);
  const act = (action: EncounterAction) => { const result = transitionEncounter(d, state, action); if (result) state = result.state; return result; };
  const access = () => {
    act({ type: 'enter' });
    act({ type: 'view', viewId: d.views.find(v => v.mode === 'listen')!.id }); act({ type: 'chapter', chapterId: d.chapters[0].id });
    act({ type: 'view', viewId: d.views.find(v => v.mode === 'talk')!.id }); act({ type: 'question', questionId: d.questions.find(q => !q.requiresQuestionId)!.id });
    act({ type: 'view', viewId: d.views.find(v => v.mode === 'object')!.id }); act({ type: 'feature', featureId: d.object.features[0].id });
  };
  return { act, access, state: () => state };
}
describe('Registered encounter actions', () => {
  it('records access separately from an earned, source-supported insight', () => {
    const p = progress(definition);
    expect(p.act({ type: 'insight', evidenceId: definition.insight.answerEvidenceId, relationship: definition.insight.relationship })).toBeUndefined();
    expect(p.act({ type: 'exit' })?.eventType).toBe('encounter.exited');
    expect(p.state().insightEarned).toBe(false);
    p.access(); expect(encounterReady(p.state())).toBe(true); expect(p.state().insightEarned).toBe(false);
    const before = structuredClone(p.state());
    const wrong = p.act({ type: 'insight', evidenceId: definition.insight.evidenceIds.find(id => id !== definition.insight.answerEvidenceId)!, relationship: 'supports' });
    expect(wrong?.correct).toBe(false); expect(p.state().insightEarned).toBe(false); expect(before.attempts).toBe(0);
    expect(p.act({ type: 'insight', evidenceId: definition.insight.answerEvidenceId, relationship: definition.insight.relationship })?.correct).toBe(true);
    expect(p.state().attempts).toBe(2);
    expect(p.act({ type: 'insight', evidenceId: definition.insight.answerEvidenceId, relationship: definition.insight.relationship })).toBeUndefined();
  });
  it('requires the correct viewpoint and a prior question before opening a follow-up', () => {
    const p = progress(definition), followUp = definition.questions.find(q => q.requiresQuestionId)!;
    expect(p.act({ type: 'chapter', chapterId: definition.chapters[0].id })).toBeUndefined();
    expect(p.act({ type: 'feature', featureId: definition.object.features[0].id })).toBeUndefined();
    p.act({ type: 'view', viewId: definition.views.find(v => v.mode === 'talk')!.id });
    expect(p.act({ type: 'question', questionId: followUp.id })).toBeUndefined();
    expect(p.act({ type: 'question', questionId: followUp.requiresQuestionId! })?.eventType).toBe('npc.questionAsked');
    expect(p.act({ type: 'question', questionId: followUp.id })).toBeDefined();
    expect(p.act({ type: 'question', questionId: followUp.id })).toBeUndefined();
    expect(p.state().questions).toHaveLength(2);
    expect(p.act({ type: 'view', viewId: 'missing' })).toBeUndefined();
    expect(Object.keys(encounterActions)).toHaveLength(7);
  });
  it('supports a different instrument-workshop curriculum without shore-specific behavior', () => {
    const d: EncounterDefinition = {
      ...definition, id: 'instrument-encounter', chamberIds: ['workshop'], title: 'A workshop experiment',
      chapters: [{ ...definition.chapters[0], id: 'full-circle', title: 'A complete turn', text: 'A circle has 360 degrees.', evidenceIds: ['rotation-rule'] }],
      questions: [{ ...definition.questions[0], id: 'why-half', title: 'How far is half a turn?', text: 'Half of 360 is 180.', evidenceIds: ['rotation-rule'] }],
      object: { ...definition.object, id: 'compass-study', title: 'Compass arm', evidenceIds: ['rotation-rule'], features: [{ id: 'north-mark', label: 'Locate north', text: 'The starting marker is north.' }] },
      insight: { ...definition.insight, claim: 'Half a clockwise turn from north reaches south.', evidenceIds: ['rotation-rule'], answerEvidenceId: 'rotation-rule', relationship: 'supports' },
    };
    expect(requireEncounters([d], sources, chambers)[0]).toBe(d);
    const p = progress(d); p.access();
    expect(p.act({ type: 'insight', evidenceId: 'rotation-rule', relationship: 'supports' })?.correct).toBe(true);
    expect(p.state().chapters).toEqual(['full-circle']); expect(p.state().features).toEqual(['north-mark']);
  });
});
describe('Encounter content validation', () => {
  it('rejects unsupported presenters, missing sources, unsafe media and unreachable interactions', () => {
    for (const override of [{ type: 'unknown' }, { image: 'https://untrusted.test/photo.png' }, { entryViewId: 'missing' }, { chamberIds: ['missing'] }, { views: definition.views.filter(v => v.mode !== 'object') }]) {
      expect(() => requireEncounters([{ ...definition, ...override }], sources, chambers)).toThrow();
    }
    expect(() => requireEncounters([{ ...definition, chapters: [{ ...definition.chapters[0], evidenceIds: ['missing'] }] }], sources, chambers)).toThrow('reference');
    expect(() => requireEncounters([{ ...definition, insight: { ...definition.insight, answerEvidenceId: 'missing' } }], sources, chambers)).toThrow('answer unavailable');
  });
  it('rejects cyclic questions, duplicate IDs, and unsupported source access', () => {
    expect(() => requireEncounters([{ ...definition, questions: [{ ...definition.questions[0], requiresQuestionId: definition.questions[0].id }] }], sources, chambers)).toThrow('cyclic');
    expect(() => requireEncounters([definition, definition], sources, chambers)).toThrow('duplicate');
    expect(() => requireEncounters([{ ...definition, chapters: [{ ...definition.chapters[0], audioSrc: '/projects/../secret.mp3' }] }], sources, chambers)).toThrow('audioSrc');
  });
});
