import mission from '../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { initialRestoration, selectedRepair, transitionRestoration } from './restoration.engine';
import type { RestorationAction, RestorationDefinition, RestorationState } from './restoration.models';
import { requireRestorations } from './restoration.validation';
const definitions = requireRestorations(mission.works, new Set(mission.sourceGallery.evidence.map(e => e.id)));
const complete = (d: RestorationDefinition): RestorationState => {
  let state = initialRestoration();
  const send = (a: RestorationAction) => { state = transitionRestoration(d, state, a)?.state ?? state; };
  for (const r of d.regions) { const a = r.answers[0]; send({ type: 'inspect', regionId: r.id }); send({ type: 'edit', regionId: r.id, optionId: a.optionId }); send({ type: 'justify', regionId: r.id, note: { evidenceId: a.evidenceId, relationship: a.relationship, explanation: 'The reference establishes a different date and supports the reconstruction.' } }); }
  send({ type: 'submit' }); return state;
};
describe('Layered painting restoration', () => {
  it('requires inspection, a source relationship and reasoning for every region', () => {
    const d = definitions[0], initial = initialRestoration();
    expect(transitionRestoration(d, initial, { type: 'edit', regionId: 'detail', optionId: 'remove' })).toBeUndefined();
    expect(transitionRestoration(d, initial, { type: 'submit' })!.state.issues).toHaveLength(2);
    const s = complete(d); expect(s.verified).toBe(true); expect(selectedRepair(d.regions[0], s).tool).toBe('remove'); expect(selectedRepair(d.regions[1], s).tool).toBe('keep');
    expect(initial.choices).toEqual({}); expect(d.regions[0].originalOptionId).toBe('original');
  });
  it('invalidates the check after a changed choice and can undo the visual edit', () => {
    const d = definitions[0], s = complete(d), changed = transitionRestoration(d, s, { type: 'edit', regionId: 'detail', optionId: 'original' })!.state;
    expect(changed.verified).toBe(false); expect(changed.notes['detail']).toBeUndefined();
    const undone = transitionRestoration(d, changed, { type: 'undo' })!.state;
    expect(selectedRepair(d.regions[0], undone).tool).toBe('remove'); expect(undone.notes['detail']).toEqual(s.notes['detail']); expect(undone.verified).toBe(false);
  });
  it('rejects an irrelevant source, incorrect relationship and missing explanation', () => {
    const d = definitions[0], done = complete(d);
    for (const note of [ { evidenceId: 'first-contact', relationship: 'contradicts' as const, explanation: 'This note is long enough but its source does not establish the repair.' }, { ...done.notes['detail'], relationship: 'supports' as const }, { ...done.notes['detail'], explanation: 'Yes' } ]) {
      const changed = transitionRestoration(d, done, { type: 'justify', regionId: 'detail', note })!.state;
      expect(transitionRestoration(d, changed, { type: 'submit' })!.state.verified).toBe(false);
    }
  });
  it('has a reachable restoration for all sixteen works', () => { expect(definitions).toHaveLength(16); for (const d of definitions) expect(complete(d).verified, d.id).toBe(true); });
  it('handles a different subject with the same engine', () => {
    const d: RestorationDefinition = { ...definitions[0], id: 'ecosystem-study', title: 'Repair a food web', date: 'Present day', location: 'Classroom pond', regions: [{ ...definitions[0].regions[0], id: 'arrow', claim: 'Energy flows from frog to sunlight', originalOptionId: 'wrong', options: [{ id: 'wrong', tool: 'keep', label: 'Keep arrow', description: 'Frog to sunlight', text: 'Frog → sunlight' }, { id: 'fixed', tool: 'relabel', label: 'Reverse the claim', description: 'Sunlight powers the food web', text: 'Sunlight → plants → food web' }], evidenceIds: ['energy'], answers: [{ optionId: 'fixed', evidenceId: 'energy', relationship: 'contradicts' }] }] };
    expect(requireRestorations([d], new Set(['energy']))).toHaveLength(1); expect(complete(d).verified).toBe(true);
  });
  it('rejects unknown actions and malformed notes', () => {
    expect(transitionRestoration(definitions[0], initialRestoration(), { type: 'constructor' } as unknown as RestorationAction)).toBeUndefined();
    expect(transitionRestoration(definitions[0], complete(definitions[0]), { type: 'justify', regionId: 'detail', note: null } as unknown as RestorationAction)).toBeUndefined();
  });
  it('validates required kinds, rectangles, media and reachable evidence', () => {
    const sourceIds = new Set(mission.sourceGallery.evidence.map(e => e.id));
    for (const change of [ (d: Record<string, unknown>) => d['type'] = 'missing', (d: Record<string, unknown>) => d['image'] = { src: 'https://example.org/image.png', frame: 0, grid: 1 }, (d: Record<string, unknown>) => (d['regions'] as Record<string, unknown>[])[0]['width'] = 101, (d: Record<string, unknown>) => (d['regions'] as Record<string, unknown>[])[0]['answers'] = [{ optionId: 'missing', evidenceId: 'missing', relationship: 'supports' }] ]) { const d = structuredClone(mission.works[0]) as unknown as Record<string, unknown>; change(d); expect(() => requireRestorations([d], sourceIds)).toThrow(); }
  });
});
