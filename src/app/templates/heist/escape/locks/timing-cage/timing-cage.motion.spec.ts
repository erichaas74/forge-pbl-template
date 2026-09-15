import type { TimingWheels } from '../machine.models';
import type { MachineView } from '../machine-surface';
import { ESCAPE_DURATION, TimingCageSequence, cagePose, nextCrankStep } from './timing-cage.motion';
const d: TimingWheels = {
  kind: 'timing-wheels',
  id: 'timing',
  title: 'Timing',
  instruction: 'Turn',
  hint: 'Compare',
  success: 'Open',
  periods: [4, 6],
  phases: [0, 0],
  maxSteps: 72,
  firstAlignment: true,
};
const view = (steps: number, changes: Partial<MachineView> = {}): MachineView => ({
  active: 0,
  answer: { kind: 'timing-wheels', steps },
  selected: null,
  testing: false,
  trial: 0,
  passed: false,
  completed: false,
  paused: false,
  reducedMotion: false,
  ...changes,
});
describe('Timing cage automatic release', () => {
  it('ignores zero, waits for disc settlement and engages the first positive alignment exactly once', () => {
    const sequence = new TimingCageSequence(d, view(0));
    expect(sequence.update(view(0), 1, true).engage).toBe(false);
    expect(sequence.update(view(6), 1, true).engage).toBe(false);
    expect(sequence.update(view(12), 1, false).engage).toBe(false);
    expect(sequence.update(view(12), 1, true).engage).toBe(true);
    expect(sequence.update(view(12), 1, true).engage).toBe(false);
    expect(sequence.update(view(24), 1, true).engage).toBe(false);
  });
  it('keeps a fast crank from skipping the first opening, including offset wheels', () => {
    expect(nextCrankStep(d, 10, 5)).toBe(12);
    const offset = { ...d, periods: [6, 8], phases: [1, 1] };
    expect(nextCrankStep(offset, 20, 8)).toBe(23);
    const sequence = new TimingCageSequence(offset, view(0));
    expect(sequence.update(view(23), 1, true).engage).toBe(true);
    expect(nextCrankStep(d, 0, -1)).toBe(0);
  });
  it('freezes an escape on pause or a hidden tab and completes once on resume', () => {
    const sequence = new TimingCageSequence(d, view(0));
    const running = view(12, { testing: true, passed: true, trial: 1 });
    sequence.update(running, 1, true);
    const time = sequence.time;
    sequence.update({ ...running, paused: true }, 100, true);
    sequence.update(running, 0, true);
    expect(sequence.time).toBe(time);
    expect(sequence.update(running, 10, true).finished).toBe(true);
    expect(sequence.update(running, 10, true).finished).toBe(false);
  });
  it('shows a saved solution without awarding it and replays without engaging again', () => {
    const sequence = new TimingCageSequence(d, view(12));
    expect(sequence.time).toBe(ESCAPE_DURATION);
    expect(sequence.update(view(12), 1, true).engage).toBe(false);
    expect(
      sequence.update(view(12, { testing: true, passed: true, trial: 3 }), 0.1, true).engage,
    ).toBe(false);
    expect(sequence.time).toBeCloseTo(0.1);
    sequence.update(view(12, { passed: true, trial: 3 }), 0.1, true);
    expect(sequence.time).toBe(ESCAPE_DURATION);
  });
  it('provides a reduced-motion final state and allows rewinding to relock', () => {
    const sequence = new TimingCageSequence(d, view(0));
    expect(
      sequence.update(
        view(12, { testing: true, passed: true, trial: 1, reducedMotion: true }),
        0.02,
        true,
      ).finished,
    ).toBe(true);
    expect(cagePose(sequence.time)).toEqual({ pin: 1, latch: 1, door: 1, animal: 1 });
    sequence.update(view(11), 0.1, true);
    expect(sequence.time).toBe(0);
    expect(sequence.update(view(12), 0.1, true).engage).toBe(true);
  });
  it('withdraws the latch before opening the door and clears the door before animal travel', () => {
    expect(cagePose(1.15).latch).toBe(1);
    expect(cagePose(1.15).door).toBe(0);
    expect(cagePose(2.65).door).toBe(1);
    expect(cagePose(2.65).animal).toBe(0);
  });
});
