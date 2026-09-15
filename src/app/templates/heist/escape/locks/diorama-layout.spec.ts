import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../domain/escape.validation';
import { gearCageLayout } from '../gear-lock/gear-cage/gear-cage.layout';
import { bridgeCageLayout } from './bridge-cage/bridge-cage.layout';
import { fractionCageLayout } from './fraction-cage/fraction-cage.layout';
import { opticsCageLayout } from './optics-cage/optics-cage.layout';
import { timingCageLayout } from './timing-cage/timing-cage.layout';

const mission = requireEscapeMission(data);
const layouts = [timingCageLayout, bridgeCageLayout];
for (const step of mission.steps) {
  const p = step.puzzle;
  if (p.type === 'gear-lock') layouts.push(gearCageLayout(p.lock));
  if (p.type === 'machine-lock') for (const s of p.lock.stages) {
    if (s.kind === 'fraction-gear') layouts.push(fractionCageLayout(s));
    if (s.kind === 'reflection') layouts.push(opticsCageLayout(s));
  }
}

describe('Direct manipulation scene controls', () => {
  it.each(layouts.map((html, i) => [i, html] as const))('keeps scene %i free of camera menus and instruction panels', (_, html) => {
    const root = document.createElement('div');
    root.innerHTML = html;
    expect(root.querySelectorAll('[data-focus], [data-options], [data-action=options], [data-action=settings], [data-clue], [data-hint]')).toHaveLength(0);
    expect(root.querySelectorAll('[data-action=expand]')).toHaveLength(1);
    expect(root.querySelectorAll('[data-action=reset]')).toHaveLength(1);
    expect(root.querySelectorAll('[data-action=pause]')).toHaveLength(1);
    expect(root.querySelector('[data-action=reset]')?.getAttribute('aria-label')).toBe('Reset mechanism');
    expect(root.querySelector('select[data-angle-control], select[data-axis], select[data-notch]')).toBeNull();
  });
});
