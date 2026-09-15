import data from '../../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../../domain/escape.validation';
import { acceptsTimingCageUpgrade } from './timing-cage.migration';
const mission = requireEscapeMission(data);
const latest = JSON.stringify(mission.steps);
const old = () =>
  JSON.parse(latest, (key, value) =>
    key === 'presentation' && value?.kind === 'timing-cage' ? undefined : value,
  );
describe('Timing presentation draft compatibility', () => {
  it('accepts equivalent configuration objects saved with a different property order', () => {
    const before = JSON.parse(JSON.stringify(old()), (_key, item) =>
      item && typeof item === 'object' && !Array.isArray(item)
        ? Object.fromEntries(Object.entries(item).reverse())
        : item,
    );
    expect(acceptsTimingCageUpgrade(JSON.stringify(before), latest)).toBe(true);
  });
  it('retains existing scale arrangements and timing settings across a visual upgrade', () => {
    const before = old();
    before[1].success =
      'All the holes align at the first possible moment. The lookout shutter closes!';
    before[1].puzzle.lock.stages[0].success = 'The lookout shutter closes!';
    expect(acceptsTimingCageUpgrade(JSON.stringify(before), latest)).toBe(true);
  });
  it('also recognizes a draft from before the prior piston presentation upgrade', () => {
    const before = old();
    const clean = JSON.parse(JSON.stringify(before), (key, value) =>
      key === 'mechanism' && value === 'piston-counterweight' ? undefined : value,
    );
    expect(acceptsTimingCageUpgrade(JSON.stringify(clean), latest)).toBe(true);
  });
  it('rejects mathematical changes, unrelated workshop changes and malformed fingerprints', () => {
    const before = old();
    before[1].gradePuzzles['8'].lock.stages[0].phases[0] = 2;
    expect(acceptsTimingCageUpgrade(JSON.stringify(before), latest)).toBe(false);
    const other = old();
    other[0].puzzle.lock.scales[0].pieces.pop();
    expect(acceptsTimingCageUpgrade(JSON.stringify(other), latest)).toBe(false);
    expect(acceptsTimingCageUpgrade('broken', latest)).toBe(false);
    expect(acceptsTimingCageUpgrade(latest, JSON.stringify(old()))).toBe(false);
  });
});
