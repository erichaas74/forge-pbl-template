import { type Band, bandState, bandWindow, fillPercent, isTight, MeasuredStep } from './precision';

// The bench's water pour: 5 mL, quarter-mL tolerance, 7 mL vessel.
const pour: Band = { target: 5, tolerance: 0.25, ceiling: 7 };
// The bench's weighing step: 2 g, 50 mg tolerance.
const weigh: Band = { target: 2, tolerance: 0.05, ceiling: 5 };

describe('precision bands', () => {
  it('reports where a value sits relative to the protocol', () => {
    expect(bandState(3, pour)).toBe('under');
    expect(bandState(4.75, pour)).toBe('inside');
    expect(bandState(5, pour)).toBe('inside');
    expect(bandState(5.25, pour)).toBe('inside');
    expect(bandState(5.26, pour)).toBe('over');
  });

  it('treats half a tolerance as tightly held', () => {
    expect(isTight(5.12, pour)).toBe(true);
    expect(isTight(5.2, pour)).toBe(false);
    expect(isTight(2.02, weigh)).toBe(true);
    expect(isTight(2.04, weigh)).toBe(false);
  });

  it('maps values and the target window onto the instrument', () => {
    expect(fillPercent(3.5, pour)).toBeCloseTo(50, 5);
    expect(fillPercent(9, pour)).toBe(100);
    expect(fillPercent(-1, pour)).toBe(0);

    const window = bandWindow(pour);
    expect(window.bottom).toBeCloseTo((4.75 / 7) * 100, 5);
    expect(window.height).toBeCloseTo((0.5 / 7) * 100, 5);
  });
});

describe('MeasuredStep', () => {
  it('drives toward a band and refuses to exceed the ceiling', () => {
    const step = new MeasuredStep(pour);
    expect(step.inside).toBe(false);

    step.add(5);
    expect(step.value).toBe(5);
    expect(step.inside).toBe(true);

    step.add(99);
    expect(step.value).toBe(pour.ceiling);
    expect(step.state).toBe('over');
  });

  it('latches what was achieved so emptying the vessel cannot erase it', () => {
    const step = new MeasuredStep(weigh);
    step.add(2.01);
    step.latch();

    // Transferring empties the pan; the record must survive it.
    step.drain();

    expect(step.value).toBe(0);
    expect(step.achieved).toBe(2.01);
    expect(step.tight).toBe(true);
  });

  it('counts a dumped vessel as a reset and marks the run untidy', () => {
    const step = new MeasuredStep(pour);
    step.add(6.5);
    expect(step.state).toBe('over');

    step.clear();
    expect(step.value).toBe(0);
    expect(step.resets).toBe(1);

    step.add(5);
    step.latch();
    // Landed on target, but it took a reset to get there.
    expect(step.tight).toBe(false);
  });

  it('does not count clearing an already-empty vessel', () => {
    const step = new MeasuredStep(pour);
    step.clear();
    step.clear();
    expect(step.resets).toBe(0);
  });

  it('rounds to instrument precision rather than accumulating float drift', () => {
    const step = new MeasuredStep(weigh);
    for (let i = 0; i < 10; i += 1) {
      step.add(0.1);
    }
    expect(step.value).toBe(1);
  });
});
