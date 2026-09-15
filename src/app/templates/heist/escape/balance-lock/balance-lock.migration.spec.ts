import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { acceptsPistonUpgrade } from './balance-lock.migration';

describe('Piston presentation save migration', () => {
  const current = JSON.stringify(data.steps);
  const legacy = current.replaceAll('"mechanism":"piston-counterweight",', '');
  it('accepts the existing balance arrangements across every grade without ignoring changed math', () => {
    expect(acceptsPistonUpgrade(legacy, current)).toBe(true);
    const changed = structuredClone(data.steps);
    changed[0].puzzle.lock.scales![0].left[0].value.numerator = 4;
    expect(acceptsPistonUpgrade(legacy, JSON.stringify(changed))).toBe(false);
    const changedGrade = structuredClone(data.steps);
    changedGrade[0].gradePuzzles['8'].lock.scales![0].pieces[0].value.numerator += 1;
    expect(acceptsPistonUpgrade(legacy, JSON.stringify(changedGrade))).toBe(false);
  });
  it('permits revised balance hints but rejects changes to other machines and malformed saves', () => {
    const revised = structuredClone(data.steps);
    revised[0].puzzle.hint = 'Match the labeled piston mass.';
    revised[0].clues[1].value = 'One pan counterbalances the piston.';
    expect(acceptsPistonUpgrade(legacy, JSON.stringify(revised))).toBe(true);
    revised[1].puzzle.prompt = 'Changed another machine';
    expect(acceptsPistonUpgrade(legacy, JSON.stringify(revised))).toBe(false);
    expect(acceptsPistonUpgrade('{broken', current)).toBe(false);
    expect(acceptsPistonUpgrade(current, legacy)).toBe(false);
  });
});
