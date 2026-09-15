import data from '../../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../../domain/escape.validation';
import { validateMachine } from '../machine.validation';
const puzzle = requireEscapeMission(data).steps[1].puzzle;
if (puzzle.type !== 'machine-lock') throw new Error('Timing machine required');
describe('Optional timing cage presentation contract', () => {
  it('keeps classic configurations valid and checks the complete animated model configuration', () => {
    const definition = structuredClone(puzzle.lock);
    expect(() => validateMachine(definition)).not.toThrow();
    const stage = definition.stages[0];
    if (stage.kind !== 'timing-wheels') throw new Error('Timing required');
    const classic = { ...definition, stages: [{ ...stage, presentation: undefined }] };
    expect(() => validateMachine(classic)).not.toThrow();
    const animal = stage.presentation!.animal;
    for (const change of [
      { model: 'https://untrusted.example/fox.glb' },
      { model: '/projects/../fox.glb' },
      { walk: '' },
      { credits: '/projects/foo.js' },
    ]) {
      expect(() =>
        validateMachine({
          ...definition,
          stages: [
            { ...stage, presentation: { ...stage.presentation, animal: { ...animal, ...change } } },
          ],
        }),
      ).toThrow(/timing-cage/);
    }
  });
});
