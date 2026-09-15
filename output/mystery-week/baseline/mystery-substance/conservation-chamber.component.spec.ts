import { TestBed } from '@angular/core/testing';

import { ConservationChamberComponent } from './conservation-chamber.component';
import type { StationCapture } from './station-workspaces';

async function createChamber(): Promise<ConservationChamberComponent> {
  await TestBed.configureTestingModule({
    imports: [ConservationChamberComponent],
  }).compileComponents();
  return TestBed.createComponent(ConservationChamberComponent).componentInstance;
}

async function runTrial(chamber: ConservationChamberComponent): Promise<void> {
  vi.useFakeTimers();
  try {
    const finished = chamber.run();
    await vi.advanceTimersByTimeAsync(9000);
    await finished;
  } finally {
    vi.useRealTimers();
  }
}

describe('ConservationChamberComponent', () => {
  it('restores a settled open-chamber result and note after comparing the sealed chamber', async () => {
    const chamber = await createChamber();
    chamber.selectTrial('open');
    await runTrial(chamber);
    chamber.observation.set('Five particles crossed the boundary.');
    chamber.selectTrial('closed');
    chamber.selectTrial('open');
    expect(chamber.insideCount()).toBe(19);
    expect(chamber.mass()).toBeCloseTo(123.5, 1);
    expect(chamber.observation()).toBe('Five particles crossed the boundary.');
    expect(chamber.canCapture()).toBe(true);
  });
  it('keeps every particle and the whole mass inside a sealed chamber', async () => {
    const chamber = await createChamber();
    chamber.selectTrial('closed');

    await runTrial(chamber);

    expect(chamber.insideCount()).toBe(24);
    expect(chamber.mass()).toBe(126.4);
    expect(chamber.massDelta()).toBe(0);
  });

  it('loses exactly five particles through the open lid, and the mass follows', async () => {
    const chamber = await createChamber();
    chamber.selectTrial('open');

    await runTrial(chamber);

    // The open chamber's data says 24 -> 19 particles and 124.8 -> 123.5 g.
    expect(chamber.insideCount()).toBe(19);
    expect(chamber.mass()).toBeCloseTo(123.5, 1);
    expect(chamber.massDelta()).toBeLessThan(0);
  });

  it('ties the falling mass to the particles that actually left', async () => {
    const chamber = await createChamber();
    chamber.selectTrial('open');
    await runTrial(chamber);

    const escaped = 24 - chamber.insideCount();
    const lost = 124.8 - chamber.mass();
    // Five particles carry the full 1.3 g difference between them.
    expect(escaped).toBe(5);
    expect(lost).toBeCloseTo(1.3, 1);
  });

  it('will not file evidence until the student describes what happened', async () => {
    const chamber = await createChamber();
    const emitted: StationCapture[] = [];
    chamber.captured.subscribe((capture) => emitted.push(capture));

    chamber.selectTrial('open');
    await runTrial(chamber);

    expect(chamber.canCapture()).toBe(false);
    chamber.capture();
    expect(emitted).toHaveLength(0);

    chamber.observation.set('Five particles escaped the boundary and the balance dropped.');
    chamber.capture();

    expect(emitted).toHaveLength(1);
    expect(emitted[0]).toMatchObject({
      activityId: 'activity-conservation-model',
      evidenceId: 'evidence-conservation-trials',
      result: { system: 'open', observedParticles: 19 },
    });
    // Resets for the next chamber.
    expect(chamber.phase()).toBe('idle');
  });

  it('lets the student hide and show the measured boundary', async () => {
    const chamber = await createChamber();
    expect(chamber.showBoundary()).toBe(true);
    chamber.toggleBoundary();
    expect(chamber.showBoundary()).toBe(false);
  });
});
